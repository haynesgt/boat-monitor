MSG='imei=300234010753370&momsn=12345&transmit_time=12-10-10 10:41:50&iridium_latitude=52.3867&iridium_longitude=0.2938&iridium_cep=8&data=a5015e5303d302f022f00753115101595f80244edfeb362a391c757a88837b27d52d0d3717041207'

curl -X POST 'https://us-central1-haynes-boat-dev.cloudfunctions.net/savePacket' -d "$MSG"

echo
