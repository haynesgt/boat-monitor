MSG='imei=300234010753370&momsn=38302&transmit_time=20-07-16 14:06:01&iridium_latitude=49.3424&iridium_longitude=-122.8341&iridium_cep=6&data=A5015F105EC502F0243EF8ACEFFC0D7A5F80254EE0EB362A391C757A88837B27D52D0D3717041207'

HOST=https://us-central1-haynes-boat-dev.cloudfunctions.net
# HOST=http://localhost:8080

curl -v -X POST "$HOST/savePacket" -d "$MSG"

echo
