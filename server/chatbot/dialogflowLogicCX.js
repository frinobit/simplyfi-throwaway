const express = require("express");
const app = express();
const dialogflow = require("@google-cloud/dialogflow-cx");

// utils
const { updateName } = require("./chatbotUtils/updateName");
const { updateProgressBar } = require("./chatbotUtils/updateProgressBar");
const { handlePropertyAction } = require("./chatbotUtils/handlePropertyAction");
const { handleVehicleAction } = require("./chatbotUtils/handleVehicleAction");
const { handleOtherAction } = require("./chatbotUtils/handleOtherAction");
const { handleIncomeAction } = require("./chatbotUtils/handleIncomeAction");
const { handleExpensesAction } = require("./chatbotUtils/handleExpensesAction");
const { handleSavingsAction } = require("./chatbotUtils/handleSavingsAction");
const {
  handleInvestmentsAction,
} = require("./chatbotUtils/handleInvestmentsAction");
const {
  handleInsuranceAction,
} = require("./chatbotUtils/handleInsuranceAction");

// socket
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

let socketIo;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socketIo = io;
});

server.listen(process.env.WS_PORT, () => {
  console.log("WS server started on port", process.env.WS_PORT);
});

const sessionClient = new dialogflow.SessionsClient();

const propertyCounts = {};
const vehicleCounts = {};
const insuranceCounts = {};

const intentToCheck = [
  "provides.personal.name",
  "AskYesNoQuestionProperty",
  "AskYesNoQuestionVehicle",
  "AskYesNoQuestionVehicle",
  "provides.vehicle.expense",
  "AskYesNoQuestionOther",
  "provides.other.expense",
  "AskYesNoQuestionIncome",
  "AskYesNoQuestionExpenses",
  "provides.savings.shortterm",
  "AskYesNoQuestionInvestments",
  "AskYesNoQuestionInsurance",
];

const processMessage = async (queries, user_id, authorization) => {
  const projectId = "testing-simplyask-npfp";
  const location = "global";
  const agentId = "526625c3-d9c8-4201-a6f9-c9fd3e204864";
  const languageCode = "en";
  const sessionId = user_id;

  const sessionPath = sessionClient.projectLocationAgentSessionPath(
    projectId,
    location,
    agentId,
    sessionId
  );
  const responses = [];

  if (!propertyCounts[user_id]) {
    propertyCounts[user_id] = 0;
  }
  if (!vehicleCounts[user_id]) {
    vehicleCounts[user_id] = 0;
  }
  if (!insuranceCounts[user_id]) {
    insuranceCounts[user_id] = 0;
  }

  for (const userMessage of queries) {
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: userMessage,
        },
        languageCode: languageCode,
      },
    };

    try {
      const response = await sessionClient.detectIntent(request);
      try {
        const intent = response[0].queryResult.match.intent.displayName;
        const parameters = response[0].queryResult.parameters;

        parts = intent.split(".");
        action = parts[0] + "." + parts[1] + "." + parts[2];

        if (intentToCheck.includes(intent)) {
          updateProgressBar(
            intent,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action === "provides.personal.name") {
          updateName(socketIo, parameters, user_id, authorization);
        }
        if (action.startsWith("provides.property.")) {
          handlePropertyAction(
            action,
            propertyCounts,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.vehicle.")) {
          handleVehicleAction(
            action,
            vehicleCounts,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.other.")) {
          const description = parameters.fields.any.stringValue;
          handleOtherAction(
            action,
            description,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.income.")) {
          const description = parts[2];
          handleIncomeAction(
            action,
            description,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.expenses.")) {
          const description = parts[2];
          handleExpensesAction(
            action,
            description,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.savings.")) {
          const description = parts[2];
          handleSavingsAction(
            action,
            description,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.investments.")) {
          const description = parameters.fields.any.stringValue;
          handleInvestmentsAction(
            action,
            description,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
        if (action.startsWith("provides.insurance.")) {
          const update = parts[2];
          handleInsuranceAction(
            action,
            update,
            insuranceCounts,
            socketIo,
            parameters,
            user_id,
            authorization
          );
        }
      } catch (error) {
        console.log(
          "Error processing message (processMessage1):",
          error.message
        );
      }

      responses.push(response[0]);
    } catch (error) {
      console.log("Error processing message (processMessage2):", error.message);
    }
  }

  // Extract fulfillment text from responses
  const botResponses = responses.map(
    (response) => response.queryResult.responseMessages[0].text.text[0]
  );

  return botResponses;
};

// Function to initiate a conversation
const startConversation = () => {
  // return "Hello there, financial explorer! 🍓 Ready to whip up a delicious blend of your finances? Grab your favorite smoothie, and let's dive in! And remember, if you ever get stuck, just give me a shout. Let's make this berry smooth!\n\nType 'ready' to get started!\n\nOther services:\n- update name";
  return "Hello there, financial explorer! 🍓 Ready to whip up a delicious blend of your finances? Grab your favorite smoothie, and let's dive in! And remember, if you ever get stuck, just give me a shout. Let's make this berry smooth!\n\nType 'ready' to get started!";
};

module.exports = { processMessage, startConversation };
