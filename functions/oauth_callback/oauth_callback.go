package oauthcallback

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/pkg/errors"
)

var httpClient = &http.Client{
	Timeout: 5 * time.Second,
}

type environment struct {
	name         string
	originHost   string
	originPath   string
	clientSecret string
	authHost     string
}

// OauthCallback is an HTTP Cloud Function with a request parameter.
func HandleRequest(w http.ResponseWriter, r *http.Request) {
	var env environment
	clientID := r.URL.Query().Get("client_id")
	switch clientID {
	case "F3VDXTGJB8SK2":
		env = environment{
			name:         "sandbox",
			originHost:   "http://localhost:3000",
			originPath:   "/",
			clientSecret: os.Getenv("CLOVER_SANDBOX_SECRET"),
			authHost:     "https://sandbox.dev.clover.com",
		}
	case "Z3M82MSW8BY16":
		env = environment{
			name:         "prod",
			originHost:   "https://manbeardo.github.io",
			originPath:   "/clover-web-data-connector/",
			clientSecret: os.Getenv("CLOVER_PROD_SECRET"),
			authHost:     "https://www.clover.com",
		}
	default:
		log.Printf("unknown client ID %s", clientID)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	token, err := GetCloverToken(r, env)
	if err != nil {
		log.Printf("%+v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	rdrQuery := url.Values{}
	rdrQuery.Add("environment", fmt.Sprint(env.name))
	rdrQuery.Add("access_token", token.AccessToken)
	rdrQuery.Add("merchant_id", r.URL.Query().Get("merchant_id"))

	rdrUrl := fmt.Sprintf("%s%s#/oauth_callback?%s", env.originHost, env.originPath, rdrQuery.Encode())
	w.Header().Add("Location", rdrUrl)
	w.WriteHeader(http.StatusFound)
}

type TokenResult struct {
	AccessToken string `json:"access_token"`
}

func GetCloverToken(r *http.Request, env environment) (*TokenResult, error) {
	query := url.Values{}
	query.Add("client_id", r.URL.Query().Get("client_id"))
	query.Add("client_secret", env.clientSecret)
	query.Add("code", r.URL.Query().Get("code"))
	authUrl := fmt.Sprintf("%s/oauth/token?%s", env.authHost, query.Encode())
	cloverResp, err := httpClient.Get(authUrl)
	if err != nil {
		return nil, errors.WithStack(err)
	}
	defer cloverResp.Body.Close()

	buf := &bytes.Buffer{}
	_, err = io.Copy(buf, cloverResp.Body)
	if err != nil {
		return nil, errors.WithStack(err)
	}

	if cloverResp.StatusCode != 200 {
		return nil, errors.Errorf("clover api returned status %d with body: %s", cloverResp.StatusCode, string(buf.Bytes()))
	}

	result := &TokenResult{}
	err = json.Unmarshal(buf.Bytes(), result)
	if err != nil {
		return nil, errors.WithStack(err)
	}

	return result, nil
}
