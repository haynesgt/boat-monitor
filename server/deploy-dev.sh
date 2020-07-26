node -c ./index.js
gcloud functions deploy --project haynes-boat-dev savePacket --runtime nodejs10 --trigger-http
gcloud functions deploy --project haynes-boat-dev getPackets --runtime nodejs10 --trigger-http
