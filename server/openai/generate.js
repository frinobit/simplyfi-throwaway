const openaiClient = require("./openai");

const generate = async (queryDescription) => {
  const response = await openaiClient.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: queryDescription }],
    max_tokens: 100,
    temperature: 0,
  });
  return response.choices[0].message.content;
};

module.exports = generate;
