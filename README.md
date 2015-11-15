# ipa-distribution [![wercker status](https://app.wercker.com/status/6f5a01038313ff8de7506599ecf900c1/s/master "wercker status")](https://app.wercker.com/project/bykey/6f5a01038313ff8de7506599ecf900c1)

Simple service which track application metadata and download link. Allow to generate manifest.plist for given application,
to simplify ad-hoc installation.

## Installation

1. Clone this repository
2. Start application using `npm start`

Set environment variable `BASE_URL` to address of service, like `BASE_URL=http://localhost:3000`.
You can do this by creating `.env` file or using env prefix of command `BASE_URL=http://localhost:3000 npm start`.

## Usage

API Methods

#### Get list of bundles
`GET /v1/bundles?page=<n>`

#### Create new bundle
`POST /v1/bundles`

payload:
```
{
  "app_id": "",
  "name": ""
  "version": ""
  "url": "<download_url>"
}
```

#### Get info about single bundle
`GET /v1/bundles/<id>`

#### Get manifest for single bundle
`GET /v1/bundles/<id>/manifest.plist`
