<h3>run backend</h3>

cd server<br>
npm install<br>
npm run dev<br>

<h3>link dialogflow v1</h3>

(use this)<br>
cd server<br>
ngrok http 4000<br>
copy https link to dialogflow -> fulfillment -> webhook<br>

<h3>run frontend</h3>

cd client<br>
npm install<br>
npm start<br>

<h3>link dialogflow v2</h3>

(not tested yet)<br>
cd server<br>
gcloud auth login<br>
gcloud auth application-default set-quota-project PROJECT-ID<br>
