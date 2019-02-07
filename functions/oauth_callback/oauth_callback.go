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

// OauthCallback is an HTTP Cloud Function with a request parameter.
func HandleRequest(w http.ResponseWriter, r *http.Request) {
	var sandbox bool
	clientID := r.URL.Query().Get("client_id")
	switch clientID {
	case "F3VDXTGJB8SK2":
		sandbox = true
	case "Z3M82MSW8BY16":
		sandbox = false
	default:
		log.Printf("unknown client ID %s", clientID)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	token, err := GetCloverToken(r, sandbox)
	if err != nil {
		log.Printf("%+v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	rdrQuery := url.Values{}
	rdrQuery.Add("sandbox", fmt.Sprint(sandbox))
	rdrQuery.Add("access_token", token.AccessToken)
	rdrQuery.Add("merchant_id", r.URL.Query().Get("merchant_id"))
	rdrUrl := fmt.Sprintf(
		"https://manbeardo.github.io/clover-web-data-connector/#%s", rdrQuery.Encode(),
	)
	w.Header().Add("Location", rdrUrl)
	w.WriteHeader(http.StatusFound)
}

type TokenResult struct {
	AccessToken string `json:"access_token"`
}

func GetCloverToken(r *http.Request, sandbox bool) (*TokenResult, error) {
	var secret string
	var apiEndpoint string
	if sandbox {
		secret = os.Getenv("CLOVER_SANDBOX_SECRET")
		apiEndpoint = "https://sandbox.dev.clover.com/oauth/token"
	} else {
		secret = os.Getenv("CLOVER_PROD_SECRET")
		apiEndpoint = "https://www.clover.com/oauth/token"
	}

	query := url.Values{}
	query.Add("client_id", r.URL.Query().Get("client_id"))
	query.Add("client_secret", secret)
	query.Add("code", r.URL.Query().Get("code"))
	authUrl := fmt.Sprintf("%s?%s", apiEndpoint, query.Encode())
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
