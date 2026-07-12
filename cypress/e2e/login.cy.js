///<reference types="cypress" />
import loginpom from "../pages/loginpom"
import achatpom from "../pages/achatpom"

describe('le site glowria', ()=>{

    /*beforeEach('setup', ()=>{
        cy.visit("https://glowria.com/");

        cy.get('body').then(($body) => {
            if ($body.text().includes('OK pour moi')) {
                cy.contains('OK pour moi', { timeout: 15000 })
                  .should('be.visible')
                  .click({ force: true });
            }
        });
    });*/

    it('Sign up et commande complète sur le site',()=>{
        const uniqueEmail = `test${Date.now()}@gmail.com`;
        cy.visit("https://glowria.com/");
        //cy.intercept('GET', '**/check-email-exists*').as('checkEmail');

        loginpom.ClickInsc();
        loginpom.saisirEmail(uniqueEmail);
        loginpom.clickLogin();
        //cy.wait('@checkEmail');
        cy.url().should('include','/signup?', { timeout: 10000 });

        loginpom.goRemp("firstname","lastname",uniqueEmail,"Andunlm2!","15061990");
        loginpom.Checkbox();
        loginpom.ClickInscrip();
        cy.url({ timeout: 60000 }).should('include','/signup?');

        loginpom.clickAchat();
        cy.url().should('include','/personal/presentation/glowria?_gl', { timeout: 10000 });

        loginpom.clickChose();
        cy.url().should('include','order/personal/creation/50/glplan12?_gl', { timeout: 10000 });

        achatpom.remplirCommande(
            "Jean",
            "Dupont",
            "10 rue de Rivoli",
            "Rivoli",
            "Bâtiment A",
            "0612345678"
        );
        achatpom.Govalid();
        cy.url().should('include', 'secure.payzen.eu/vads-payment');
        achatpom.Payment('16.50 EUR', '11', '2033', '123', 'Tarek aili', '5000100000000014');
    });
});