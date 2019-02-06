#!/usr/bin/env bash
set -xeuo pipefail

function deploy() {
  (
    cd functions/$1
    gcloud functions deploy $1 --runtime go111 --trigger-http --entry-point HandleRequest
  )
}

deploy connect
deploy oauth_callback