// cypress/e2e/beasts.cy.js
describe('Beasts Management', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the list of beasts', () => {
    cy.get('table').should('exist');
    cy.get('table tbody tr').then((rows) => {
      if (rows.length > 0) {
        cy.get('table tbody tr').should('have.length.greaterThan', 0);
      } else {
        cy.get('table tbody tr td').should('contain', 'No beasts available.');
      }
    });
  });

  it('should add a new beast', () => {
    const uniqueBeastName = `Beast-${Date.now()}`;

    cy.get('input[name="BeastName"]').clear().type(uniqueBeastName);
    cy.get('input[name="Type"]').clear().type('Creature');
    cy.get('input[name="CR"]').clear().type('1');
    cy.get('input[name="CHA"]').clear().type('10');
    cy.get('input[name="CON"]').clear().type('12');
    cy.get('input[name="DEX"]').clear().type('14');
    cy.get('input[name="INT"]').clear().type('8');
    cy.get('input[name="STR"]').clear().type('16');
    cy.get('input[name="WIS"]').clear().type('11');
    cy.get('textarea[name="Description"]').clear().type('A new beast description.');
    cy.get('form').contains('Add Beast').click();
    cy.get('table tbody tr').should('contain', uniqueBeastName);

    // Remove the added beast via UI
    cy.get('table tbody tr').contains(uniqueBeastName).parent('tr').within(() => {
      cy.get('button').contains('Delete').click();
    });

    // Verify the beast is removed from the list
    cy.get('table tbody tr').should('not.contain', uniqueBeastName);
  });

  it('should add and then delete a beast', () => {
    const uniqueBeastName = `Beast-${Date.now()}`;

    cy.get('input[name="BeastName"]').clear().type(uniqueBeastName);
    cy.get('input[name="Type"]').clear().type('Creature');
    cy.get('input[name="CR"]').clear().type('1');
    cy.get('input[name="CHA"]').clear().type('10');
    cy.get('input[name="CON"]').clear().type('12');
    cy.get('input[name="DEX"]').clear().type('14');
    cy.get('input[name="INT"]').clear().type('8');
    cy.get('input[name="STR"]').clear().type('16');
    cy.get('input[name="WIS"]').clear().type('11');
    cy.get('textarea[name="Description"]').clear().type('A new beast description.');
    cy.get('form').contains('Add Beast').click();

    cy.get('table tbody tr').should('contain', uniqueBeastName);

    // Delete the newly added beast via UI
    cy.get('table tbody tr').contains(uniqueBeastName).parent('tr').within(() => {
      cy.get('button').contains('Delete').click();
    });

    cy.get('table tbody tr').should('not.contain', uniqueBeastName);
  });

  it('should add, edit, and remove a beast', () => {
    const uniqueBeastName = `Beast-${Date.now()}`;

    cy.get('input[name="BeastName"]').clear().type(uniqueBeastName);
    cy.get('input[name="Type"]').clear().type('Creature');
    cy.get('input[name="CR"]').clear().type('1');
    cy.get('input[name="CHA"]').clear().type('10');
    cy.get('input[name="CON"]').clear().type('12');
    cy.get('input[name="DEX"]').clear().type('14');
    cy.get('input[name="INT"]').clear().type('8');
    cy.get('input[name="STR"]').clear().type('16');
    cy.get('input[name="WIS"]').clear().type('11');
    cy.get('textarea[name="Description"]').clear().type('A new beast description.');
    cy.get('form').contains('Add Beast').click();
    cy.get('table tbody tr').should('contain', uniqueBeastName);

    // Edit the type of the newly added beast
    cy.get('table tbody tr').contains(uniqueBeastName).parent('tr').within(() => {
      cy.get('button').contains('Edit').click();
      cy.get('input[name="Type"]').clear().type('Updated Creature');
      cy.get('button').contains('Save').click();
    });

    cy.get('table tbody tr').contains(uniqueBeastName).parent('tr').should('contain', 'Updated Creature');

    // Remove the edited beast via UI
    cy.get('table tbody tr').contains(uniqueBeastName).parent('tr').within(() => {
      cy.get('button').contains('Delete').click();
    });

    cy.get('table tbody tr').should('not.contain', uniqueBeastName);
  });

  it('should handle displaying when no beasts available', () => {
    cy.intercept('GET', '/beasts', []).as('fetchBeasts');
    cy.visit('/');
    cy.wait('@fetchBeasts');
    cy.get('table tbody tr td').should('contain', 'No beasts available.');
  });

  it('should show error when adding a duplicate beast', () => {
    const uniqueBeastName = `Beast-${Date.now()}`;

    cy.get('input[name="BeastName"]').clear().type(uniqueBeastName);
    cy.get('input[name="Type"]').clear().type('Creature');
    cy.get('input[name="CR"]').clear().type('1');
    cy.get('input[name="CHA"]').clear().type('10');
    cy.get('input[name="CON"]').clear().type('12');
    cy.get('input[name="DEX"]').clear().type('14');
    cy.get('input[name="INT"]').clear().type('8');
    cy.get('input[name="STR"]').clear().type('16');
    cy.get('input[name="WIS"]').clear().type('11');
    cy.get('textarea[name="Description"]').clear().type('A new beast description.');
    cy.get('form').contains('Add Beast').click();
    cy.get('table tbody tr').should('contain', uniqueBeastName);

    // Attempt to add the same beast again
    cy.get('input[name="BeastName"]').clear().type(uniqueBeastName);
    cy.get('input[name="Type"]').clear().type('Creature2');
    cy.get('input[name="CR"]').clear().type('2');
    cy.get('input[name="CHA"]').clear().type('11');
    cy.get('input[name="CON"]').clear().type('13');
    cy.get('input[name="DEX"]').clear().type('15');
    cy.get('input[name="INT"]').clear().type('8');
    cy.get('input[name="STR"]').clear().type('14');
    cy.get('input[name="WIS"]').clear().type('12');
    cy.get('textarea[name="Description"]').clear().type('A newer beast description.');
    cy.get('form').contains('Add Beast').click();
    cy.get('form').should('contain', 'Beast already exists');

    // Remove the beast via UI
    cy.get('table tbody tr').contains(uniqueBeastName).parent('tr').within(() => {
      cy.get('button').contains('Delete').click();
    });

    cy.get('table tbody tr').should('not.contain', uniqueBeastName);
  });
});
