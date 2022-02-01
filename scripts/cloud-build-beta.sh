#!/bin/bash

set -ex

SH_DIR="$(cd "$(dirname "$0")"; pwd -P)"
ROOT_DIR=$(dirname $SH_DIR)

source ${SH_DIR}/git-info.sh

TAG_NAME=${BRANCH_NAME//\//\-}

cd $ROOT_DIR
gcloud builds submit \
  --config cloud-build-beta.yml \
  --substitutions=REVISION_ID=${REVISION_ID},TAG_NAME=${TAG_NAME}