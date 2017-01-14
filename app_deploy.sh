#!/usr/bin/env bash
echo "Running ng build"
ng build --prod
echo "Removing old deploy folder"
rm -r /Users/danielleone/Development/Projects/DanielLeone/RegexDesign/deploy/
echo "Creating deploy folder"
mkdir /Users/danielleone/Development/Projects/DanielLeone/RegexDesign/deploy/
echo "Copying build to deploy folder"
cp -a /Users/danielleone/Development/Projects/DanielLeone/RegexDesign/regex-design/dist/. /Users/danielleone/Development/Projects/DanielLeone/RegexDesign/deploy/dist
echo "Copying yaml file"
cp -a /Users/danielleone/Development/Projects/DanielLeone/RegexDesign/regex-design/app.yaml /Users/danielleone/Development/Projects/DanielLeone/RegexDesign/deploy/
echo "Moving to deploy folder"
cd /Users/danielleone/Development/Projects/DanielLeone/RegexDesign/deploy/
echo "Deploying app with gcloud"
gcloud app deploy --project regex-design --verbosity info --quiet --version 1
