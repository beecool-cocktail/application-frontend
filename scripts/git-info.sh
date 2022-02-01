#!/bin/bash

set -ex

REVISION_ID="$(git log -1 --format=%H)"
BRANCH_NAME="$(git branch --show-current)"
TAG_NAME=$(git describe --tags)