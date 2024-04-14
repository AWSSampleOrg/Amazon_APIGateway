#!/usr/bin/env bash

SOURCE_DIR=$(cd $(dirname ${BASH_SOURCE:-$0}) && pwd)
cd ${SOURCE_DIR}

export $(cat ${SOURCE_DIR}/.env | grep -v ^\#)

case $1 in
up) node build/src/sign-up.js $2 ;;
con) node build/src/confirm-sign-up.js $2 ;;
in) node build/src/sign-in.js ;;
esac
