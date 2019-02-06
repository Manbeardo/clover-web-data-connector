package connect

import (
	"net/http"
)

func HandleRequest(w http.ResponseWriter, r *http.Request) {
	var location string
	if r.URL.Query().Get("sandbox") == "true" {
		location = "https://sandbox.dev.clover.com/oauth/authorize?client_id=F3VDXTGJB8SK2"
	} else {
		location = "https://www.clover.com/oauth/authorize?client_id=Z3M82MSW8BY16"
	}

	w.Header().Add("Location", location)
	w.WriteHeader(http.StatusFound)
}
