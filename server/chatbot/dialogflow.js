const dialogflow = require("@google-cloud/dialogflow");

const projectId = "simplyask-slav";
const sessionId = "123456";
const languageCode = "en";

const sessionClient = new dialogflow.SessionsClient();

// Keeping the context across queries to simulate an ongoing conversation
let context;

async function processMessage(queries) {
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );
  const responses = [];

  for (const userMessage of queries) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userMessage,
          languageCode: languageCode,
        },
      },
      queryParams: {
        contexts: context || [], // Use the existing context from previous queries
      },
    };

    try {
      const response = await sessionClient.detectIntent(request);
      responses.push(response[0]);
      context = response[0].queryResult.outputContexts;
    } catch (error) {
      console.error("Error processing message:", error);
    }
  }

  // Extract fulfillment text from responses
  const botResponses = responses.map(
    (response) => response.queryResult.fulfillmentText
  );

  return botResponses;
}

module.exports = {
  processMessage,
};
