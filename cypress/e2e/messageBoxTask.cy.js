/**
 * Author: Amir choudhary
 * Project: Automation Anywhere SDET Assignment - Use Case 1
 */

import LoginPage from "../pages/loginPage";
import BotPage from "../pages/botPage";
import MessageBoxPage from "../pages/messageBoxPage";

const loginPage = new LoginPage();
const botPage = new BotPage();
const messageBoxPage = new MessageBoxPage();

describe("Use Case 1: Message Box Task (UI Automation)", () => {
  let data;

  before(() => {
    // Fixture se data load karna
    cy.fixture("testData").then((fData) => {
      data = fData;
    });
    
    // Step 1: Log in to the application
    cy.login(); 
  });

  it("should complete the full flow for creating a message box task", () => {
    // Step 2: Navigate to Automation from the left-hand menu
    // Step 3: Click on the Create dropdown and select Task Bot
    botPage.clickCreateBot();

    // Step 4: Fill in mandatory details and click Create (with Assertions)
    botPage
      .assertCreateDialogVisible() // Expectation: UI element visibility
      .typeBotName(data.botName + Date.now()) // Unique name for every run
      .submitBotCreation(); // Assertions: Proper data entry & Successful creation

    // Step 5: Search for Message Box and double-click to add it
    // Step 6: Verify every UI element interaction (done inside page methods)
    messageBoxPage.searchAndInsertMessageBox();

    // Step 7: Save the configuration and validate
    messageBoxPage
      .typeMessage(data.bot_message)
      .saveBot() // Expectation: Successful creation and confirmation
      .verifyMessageSaved(data.bot_message) // Expectation: Full functional flow validation
      .closeEditor();
  });

  after(() => {
    cy.logout();
  });
});