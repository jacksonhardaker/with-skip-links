#!/usr/bin/env bash

npm run build
VERSION=$(npm version patch)
PKG=$(npm pack)
npm publish "${PKG}"
git push origin "${VERSION}"
