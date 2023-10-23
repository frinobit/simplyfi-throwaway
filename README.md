<h3>run backend</h3>

cd server<br>
npm install<br>
npm run dev<br>

<h3>link dialogflow (only if need webhook, currently no)</h3>

cd server<br>
ngrok http 4000<br>
copy https link to dialogflow -> fulfillment -> webhook<br>

<h3>run frontend</h3>

cd client<br>
npm install<br>
npm start<br>
