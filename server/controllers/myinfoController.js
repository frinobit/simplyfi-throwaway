import fs from "fs";
import crypto from "crypto";
import MyInfoConnector from "myinfo-connector-v4-nodejs";
import {
  APP_CONFIG,
  MYINFO_CONNECTOR_CONFIG,
} from "../myinfo/config/config.js";
const connector = new MyInfoConnector(MYINFO_CONNECTOR_CONFIG);
var sessionIdCache = {};

// get the environment variables (app info) from the config
export const getEnv = async (req, res) => {
  try {
    if (
      APP_CONFIG.DEMO_APP_CLIENT_ID == undefined ||
      APP_CONFIG.DEMO_APP_CLIENT_ID == null
    ) {
      res.status(500).json({
        error: "Missing Client ID",
      });
    } else {
      res.status(200).json({
        clientId: APP_CONFIG.DEMO_APP_CLIENT_ID,
        redirectUrl: APP_CONFIG.DEMO_APP_CALLBACK_URL,
        scope: APP_CONFIG.DEMO_APP_SCOPES,
        purpose_id: APP_CONFIG.DEMO_APP_PURPOSE_ID,
        authApiUrl: APP_CONFIG.MYINFO_API_AUTHORIZE,
        subentity: APP_CONFIG.DEMO_APP_SUBENTITY_ID,
      });
    }
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).json({
      error: error,
    });
  }
};

// Generate the code verifier and code challenge for PKCE flow
export const generateCodeChallenge = async (req, res, next) => {
  try {
    // call connector to generate code_challenge and code_verifier
    let pkceCodePair = connector.generatePKCECodePair();
    // create a session and store code_challenge and code_verifier pair
    let sessionId = crypto.randomBytes(16).toString("hex");
    sessionIdCache[sessionId] = pkceCodePair.codeVerifier;

    //establish a frontend session with browser to retrieve back code_verifier
    res.cookie("sid", sessionId);
    //send code code_challenge to frontend to make /authorize call
    res.status(200).json(pkceCodePair.codeChallenge);
  } catch (error) {
    console.log("Error".red, error);
    res.status(500).json({
      error: error,
    });
  }
};

//function to read multiple files from a directory
function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename) {
      fs.readFile(dirname + filename, "utf8", function (err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

// getPersonData function - call MyInfo Token + Person API
export const getPersonData = async (req, res, next) => {
  try {
    // get variables from frontend
    var authCode = req.body.authCode;
    //retrieve code verifier from session cache
    var codeVerifier = sessionIdCache[req.cookies.sid];
    console.log("Calling MyInfo NodeJs Library...");

    // retrieve private siging key and decode to utf8 from FS
    let privateSigningKey = fs.readFileSync(
      APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_SIGNING_KEY,
      "utf8"
    );

    let privateEncryptionKeys = [];
    // retrieve private encryption keys and decode to utf8 from FS, insert all keys to array
    readFiles(
      APP_CONFIG.DEMO_APP_CLIENT_PRIVATE_ENCRYPTION_KEYS,
      (filename, content) => {
        privateEncryptionKeys.push(content);
      },
      (err) => {
        throw err;
      }
    );

    //call myinfo connector to retrieve data
    let personData = await connector.getMyInfoPersonData(
      authCode,
      codeVerifier,
      privateSigningKey,
      privateEncryptionKeys
    );

    /* 
      P/s: Your logic to handle the person data ...
    */
    console.log(
      "--- Sending Person Data From Your-Server (Backend) to Your-Client (Frontend)---:"
    );
    console.log(JSON.stringify(personData)); // log the data for demonstration purpose only
    res.status(200).send(personData); //return personData
  } catch (error) {
    console.log("---MyInfo NodeJs Library Error---".red);
    console.log(error);
    res.status(500).send({
      error: error,
    });
  }
};
