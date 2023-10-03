<!-- link dialogflow v1 -->

cd server\n
ngrok http 4000\n
copy https link to dialogflow -> fulfillment -> webhook\n

<!-- link dialogflow v2 -->

cd server\n
gcloud auth login\n
gcloud auth application-default set-quota-project PROJECT-ID // set\n

<!-- run backend -->

cd server\n
npm install\n
npm run dev\n

<!-- run frontend -->

cd client\n
npm install\n
npm start\n
