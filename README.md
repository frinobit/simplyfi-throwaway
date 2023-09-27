<!-- link dialogflow v1 -->

cd server
ngrok http 4000
copy https link to dialogflow -> fulfillment -> webhook

<!-- link dialogflow v2 -->

cd server
gcloud auth login
gcloud auth application-default set-quota-project PROJECT-ID // set

<!-- run backend -->

cd server
npm install
npm run dev

<!-- run frontend -->

cd client
npm install
npm start
