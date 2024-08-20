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
        cy.visit('/');
        cy.get('input[name="BeastName"]').clear().type('NewBeast');
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
        cy.get('table tbody tr').should('contain', 'New Beast');
      });
    
      after(() => {
        // Delete the beast that was added during the test
        cy.request('DELETE', '/beasts/NewBeast').then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  
      before(() => {
        // Add a beast before the next test
        cy.request('POST', '/beasts', {
          BeastName: 'Test Beast',
          Type: 'Creature',
          CR: '3',
          Attributes: {
            CHA: '10',
            CON: '12',
            DEX: '14',
            INT: '8',
            STR: '16',
            WIS: '11'
          },
          Description: 'A test beast description.'
        }).then((response) => {
          expect(response.status).to.eq(201);
        });
      });
    
      it('should edit the type of an existing beast', () => {
        cy.visit('/');
        cy.get('table tbody tr').first().find('button').contains('Edit').click();
        cy.get('input[name="Type"]').clear().type('Updated Creature');
        cy.get('button').contains('Save').click();
        cy.get('table tbody tr').first().should('contain', 'Updated Creature');
      });
    
      after(() => {
        // Delete the beast after the test
        cy.request('DELETE', '/beasts/Test Beast').then((response) => {
          expect(response.status).to.eq(200);
        });
      });
  
    it('should delete a beast', () => {
      cy.get('table tbody tr').first().find('button').contains('Delete').click();
      cy.get('table tbody tr').should('have.length.lessThan', 2);
    });
  
    it('should handle displaying when no beasts available', () => {
      cy.intercept('GET', '/beasts', []).as('fetchBeasts');
      cy.visit('/');
      cy.wait('@fetchBeasts');
      cy.get('table tbody tr td').should('contain', 'No beasts available.');
    });
  
    it('should show error when adding a duplicate beast', () => {
      // Assuming the form is already filled with a duplicate beast's data
      cy.get('input[name="BeastName"]').clear().type('Existing Beast');
      cy.get('form').contains('Add Beast').click();
      cy.get('form').should('contain', 'Beast already exists');
    });
  });