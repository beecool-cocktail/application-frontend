#!/bin/bash

set -ex

REVISION_ID="$(git log -1 --format=%H)"
SH_DIR="$(cd "$(dirname "$0")"; pwd -P)"
ROOT_DIR=$(dirname $SH_DIR)

cd $ROOT_DIR
gcloud builds submit \
  --config cloudbuild.yaml \
  --substitutions=REVISION_ID=${REVISION_ID}