import formPage from "../pages/formPage";

describe("Use Case 2: Form with Upload Flow (Complete Automation)", () => {
  
  before(() => {
    // Step 1: Login (Custom command from support/commands.js)
    cy.login(); 
  });

  it("should create a form, add elements, and verify file upload", () => {
    // Step 2: Navigate to Automation
    cy.visit('/#/automations');
    cy.wait(5000); 

    // Step 3-4: Create Form with mandatory details
    const uniqueFormName = "Amir_Form_" + Date.now();
    formPage.createForm(uniqueFormName);
    cy.wait(4000); // Wait for editor canvas to load

    // Step 5: Drag and Drop Textbox and Select File elements
    formPage.dragAndDropElements();

    // Step 6: Verify UI Interaction in Right Panel
    // Canvas par Textbox element click karein
    cy.get('.form-editor-canvas').contains('Textbox').click({force: true});
    formPage.elements.elementLabelInput()
      .should('be.visible')
      .clear()
      .type("Amir Custom Text Input");

    // Step 7: Enter text and upload document from fixtures (Shared Folder)
    // Expectation: File selection and upload process
    formPage.uploadFile('cypress/fixtures/test.txt'); 

    // Step 8: Save and Verify Backend Response / Status
    formPage.elements.saveButton().click();
    
    // Assertions: Visibility and Success Confirmation
    formPage.elements.uploadStatus().should('be.visible');
    
    cy.log("Form submission behavior and file upload status validated.");
  });

  after(() => {
    cy.logout();
  });
});