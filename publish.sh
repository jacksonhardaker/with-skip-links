#!/usr/bin/env bash

npm run build
npm version patch
PKG=$(npm pack)
npm publish "${PKG}"
