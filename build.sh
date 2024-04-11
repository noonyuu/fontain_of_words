cd frontend
npm install
npm run build
cp -r build ../backend/nginx/statics
# serve -s build