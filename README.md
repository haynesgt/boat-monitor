# Boat Monitor Resource Server and Web App

## Testing

Send a POST request to `https://us-central1-haynes-boat-dev.cloudfunctions.net` with a body like this:

```imei=300234010753370&momsn=12345&transmit_time=12-10-10 10:41:50&iridium_latitude=52.3867&iridium_longitude=0.2938&iridium_cep=8&data=a5015e5303d302f022f00753115101595f80244edfeb362a391c757a88837b27d52d0d3717041207```

The request will be saved and the parsed value will be returned.

## Server console

The test database is visible here: `https://console.cloud.google.com/firestore/data?project=haynes-boat-dev`

Test logs are visible here: `https://console.cloud.google.com/logs/viewer?project=haynes-boat-dev`

## Web App

See https://storage.googleapis.com/haynes-boat-dev-static/index.html

(in progress)
