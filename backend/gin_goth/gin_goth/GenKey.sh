mkdir ./auth_grpc/keys
openssl genrsa 4096 > ./auth_grpc/keys/server.key
openssl req -new -x509 -days 3650 -key ./auth_grpc/keys/server.key -sha512 -out ./auth_grpc/keys/server.crt
openssl x509 -in ./auth_grpc/keys/server.crt -noout -text

mkdir ./keys
openssl genrsa 4096 > ./keys/server.key
openssl req -new -x509 -days 3650 -key ./keys/server.key -sha512 -out ./keys/server.crt
openssl x509 -in ./keys/server.crt -noout -text