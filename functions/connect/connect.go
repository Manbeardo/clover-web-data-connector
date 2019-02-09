package connect

import (
	"fmt"
	"net/http"
	"net/url"
)

func HandleRequest(w http.ResponseWriter, r *http.Request) {
	var apiHost, clientID string
	if r.URL.Query().Get("environment") == "sandbox" {
		apiHost = "https://sandbox.dev.clover.com"
		clientID = "F3VDXTGJB8SK2"
	} else {
		apiHost = "https://www.clover.com"
		clientID = "Z3M82MSW8BY16"
	}

	locationQuery := url.Values{}
	locationQuery.Add("client_id", clientID)

	location := fmt.Sprintf(
		"%s/oauth/authorize?%s",
		apiHost, locationQuery.Encode(),
	)

	w.Header().Add("Location", location)
	w.WriteHeader(http.StatusFound)
}
