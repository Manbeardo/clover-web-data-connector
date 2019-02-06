package oauthcallback

import (
	"bytes"
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
func OauthCallback(w http.ResponseWriter, r *http.Request) {
	log.Print(r.URL.Query())

	token, err := GetCloverToken(r)
	if err != nil {
		log.Printf("%+v", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	log.Print(string(token))
	w.Write(token)
}

func GetCloverToken(r *http.Request) ([]byte, error) {
	query := url.Values{}
	query.Add("client_id", r.URL.Query().Get("client_id"))
	query.Add("client_secret", os.Getenv("CLOVER_APP_SECRET"))
	query.Add("code", r.URL.Query().Get("code"))
	authUrl := fmt.Sprintf("https://sandbox.dev.clover.com/oauth/token?%s", query.Encode())
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

	if cloverResp.StatusCode == 200 {
		return buf.Bytes(), nil
	} else {
		return nil, errors.Errorf("clover api returned status %d with body: %s", cloverResp.StatusCode, string(buf.Bytes()))
	}
}

