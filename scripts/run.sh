#!/bin/bash

set -ex

SH_DIR="$(cd "$(dirname "$0")"; pwd -P)"
ROOT_DIR=$(dirname $SH_DIR)
BUILD_DIR=${ROOT_DIR}/build

cd $BUILD_DIR

set -o allexport;
export PROJECT_ID="$(gcloud config get-value project)"
source ./docker-compose.properties;
set +o allexport

case "$1" in
  up)
    docker-compose pull
    docker-compose up -d
    ;;
  down)
    docker-compose down -v
    ;;
  *)
    echo "unknow action."
    exit 1
esac