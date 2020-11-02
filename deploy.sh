#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy(): deploying versioin'

git push -f git@github.com:dschoeni/is-covid-exponential-yet.git master:gh-pages
cd -