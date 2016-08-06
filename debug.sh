#!/bin/bash
export PATH=node_modules/.bin:$PATH
export PORT=3001
concurrently --kill-others "nodemon index.js" "webpack-dev-server --inline --port 3000 --hot --progress --content-base build --silent"