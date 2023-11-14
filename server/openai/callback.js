import { ConsoleCallbackHandler } from "langchain/callbacks";

export class CustomHandler extends ConsoleCallbackHandler {
  handleLLMNewToken(token) {
    console.log("token", { token });
  }

  handleLLMEnd(endInfo) {
    const tokenUsage = endInfo.llmOutput.estimatedTokenUsage;
    console.log("Prompt Tokens:", tokenUsage.promptTokens);
    console.log("Completion Tokens:", tokenUsage.completionTokens);
    console.log("Total Tokens:", tokenUsage.totalTokens);

    const inputCost = 0.001 / 1000;
    const outputCost = 0.002 / 1000;
    console.log("Prompt Costs: $", tokenUsage.promptTokens * inputCost);
    console.log(
      "Completion Costs: $",
      tokenUsage.completionTokens * outputCost
    );
    console.log(
      "Total Costs: $",
      tokenUsage.promptTokens * inputCost +
        tokenUsage.completionTokens * outputCost
    );
  }
}
