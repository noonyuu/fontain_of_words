mkdir ./keys
openssl genrsa 4096 > ./keys/server.key
openssl req -new -x509 -days 3650 -key ./keys/server.key -sha512 -out ./keys/server.crt
openssl x509 -in ./keys/server.crt -noout -text