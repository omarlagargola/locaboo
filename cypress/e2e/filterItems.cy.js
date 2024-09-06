describe('Table Filter', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should filter when filter is used', () => {
    // Wait until data is loaded
    cy.get('[data-cy="filters"]').should('be.visible');
    // Open the filter menu
    cy.get('[data-cy="filters"] button:nth-child(4)').click();
    // Unselect filters and keep only "active"
    cy.get('[data-cy="filtersMenu"] .v-list-item:nth-child(2) label').click();
    cy.get('[data-cy="filtersMenu"] .v-list-item:nth-child(3) label').click();
    cy.get('[data-cy="filtersMenu"] .v-list-item:nth-child(4) label').click();
    // There should be only "active" inputs in the table
    cy.get('[data-cy="status"]').each((el) => {
      cy.get(el.find('.v-chip__content')).invoke('text').should('contain', 'aktiv');
    })
  });
});
