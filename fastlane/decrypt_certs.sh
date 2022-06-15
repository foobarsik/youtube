#!/bin/sh
echo "Decrypting certificates..."

select typevar in distribution development
do
  read -p 'Certificate ID: ' idvar
  read -sp 'Password: ' passvar

  mkdir -p "decrypted"
  openssl aes-256-cbc -k "$passvar" -in "certs/$typevar/$idvar.cer" -out "decrypted/cert.der" -a -d -md md5
  openssl x509 -inform der -in "decrypted/cert.der" -out "decrypted/cert.pem"
  openssl aes-256-cbc -k "$passvar" -in "certs/$typevar/$idvar.p12" -out "decrypted/key.pem" -a -d -md md5
  openssl pkcs12 -export -out "decrypted/cert.p12" -inkey "decrypted/key.pem" -in "decrypted/cert.pem" -password pass:"$passvar"
  rm "decrypted/cert.der"
  rm "decrypted/cert.pem"
  rm "decrypted/key.pem"
  exit
done

