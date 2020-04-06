# Subscription Demo
Small app for listening to topic from browser using Servet-Sent-Events and Google Cloud Platform Pub/Sub.

Took about 45 minutes with whole setup and learning.

## Getting started
- `yarn install`
- [Setup your Google Service Account](https://cloud.google.com/docs/authentication/getting-started), add permissions for Pub/Sub
- Setup topic on GCP
- Edit variables in `src/index.js`: topic name and maybe `newSubName`
- `yarn start` or `yarn watch` for development
- Open `index.html` file using your browser
- Send messages to topic from GCP Console
- Things should appear :)

## Limitations
There is a hard limit of 10 000 subscriptions per topic and administrator operations (creating and deleting subscription) of 6,000 per minute (100 ops/s), but that isn't really a concern.

https://cloud.google.com/pubsub/quotas

## Side notes
I didn't use formatter, sorry.
