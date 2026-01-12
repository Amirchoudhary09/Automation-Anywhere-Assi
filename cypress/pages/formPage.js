class FormPage {
  elements = {
    // Smart selector jo back button ko ignore karega
    createDropdown: () => 
      cy.get('button', { timeout: 20000 })
        .filter(':not(.rio-back-button)')
        .contains(/Create|Create new/i),

    formOption: () => cy.contains('span', 'Form', { timeout: 10000 }),
    formNameInput: () => cy.get('input[name="name"]', { timeout: 10000 }),
    createBtn: () => cy.get('button[name="submit"]'),
    
    // Canvas & Drag Elements
    textboxSource: () => cy.contains('div', 'Textbox'),
    fileUploadSource: () => cy.contains('div', 'Select File'),
    canvasTarget: () => cy.get('.form-editor-canvas', { timeout: 15000 }),

    // Properties Panel
    elementLabelInput: () => cy.get('input[name="label"]'),
    fileUploadInput: () => cy.get('input[type="file"]'),
    saveButton: () => cy.get('button[name="save"]'),
    uploadStatus: () => cy.contains(/successfully|uploaded/i, { timeout: 15000 })
  };

  createForm(name) {
    this.elements.createDropdown().should('be.visible').click({ force: true });
    this.elements.formOption().should('be.visible').click();
    this.elements.formNameInput().should('be.visible').clear().type(name);
    this.elements.createBtn().click();
    return this;
  }

  // Native Drag and Drop Logic (Trigger based)
  dragAndDropElements() {
    // Textbox drag
    this.elements.textboxSource().trigger('mousedown', { which: 1 });
    this.elements.canvasTarget().trigger('mousemove').trigger('mouseup', { force: true });
    
    cy.wait(1000);

    // Select File drag
    this.elements.fileUploadSource().trigger('mousedown', { which: 1 });
    this.elements.canvasTarget().trigger('mousemove').trigger('mouseup', { force: true });
    
    return this;
  }

  uploadFile(filePath) {
    this.elements.fileUploadInput().selectFile(filePath, { force: true });
    return this;
  }
}

// Yahan instance export karna zaroori hai error fix karne ke liye
export default new FormPage();