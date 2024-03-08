mkdir ./nginx/keys
cd ./nginx/keys
openssl genrsa 4096 > ./server.key
openssl req -new -x509 -days 3650 -key ./server.key -sha512 -out ./server.crt
openssl x509 -in ./server.crt -noout -text