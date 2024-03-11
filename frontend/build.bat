npm run build
pause
rm -r ./../backend/nginx/statics/build
copy -R ./build ./../backend/nginx/statics/