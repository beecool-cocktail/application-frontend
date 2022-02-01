#!/bin/bash

set -ex

REVISION_ID="$(git log -1 --format=%H)"
BRANCH_NAME="$(git rev-parse --abbrev-ref HEAD)"
TAG_NAME=$(git describe --tags)
SH_DIR="$(cd "$(dirname "$0")"; pwd -P)"
ROOT_DIR=$(dirname $SH_DIR)
BUILD_DIR=${ROOT_DIR}/build

cd $ROOT_DIR
gcloud builds submit \
  --config cloud-build-beta.yml \
  --substitutions=REVISION_ID=${REVISION_ID},TAG_NAME=${BRANCH_NAME//\//\-}