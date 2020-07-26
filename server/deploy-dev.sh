node -c ./index.js
TAG=server-dev-$(date '+%s')
git tag $TAG
git push origin $TAG
echo https://console.cloud.google.com/cloud-build/builds?project=haynes-boat-dev

# gcloud functions deploy --project haynes-boat-dev savePacket --runtime nodejs10 --trigger-http
# gcloud functions deploy --project haynes-boat-dev getPackets --runtime nodejs10 --trigger-http
