///<reference types="cypress"/>

class achatpom{
elements = {
    Firstname: ()=>cy.get('#subscription_deliveryContact_firstName'),
    Lastname: ()=>cy.get('#subscription_deliveryContact_lastName'),
    AddressInput: ()=>cy.get('#user_input_autocomplete_address'),
    AddressSuggestions: ()=>cy.get('.pac-container, .autocomplete-suggestions, ul[role="listbox"]'),
    Complement: ()=>cy.get("#subscription_deliveryContact_addressSecondLine"),
    Phone: ()=>cy.get("#subscription_deliveryContact_phoneNumber"),
    Colissimo: ()=>cy.contains('Colissimo'),
    Champ:()=>cy.get("#terms").check({force:true}),
    ValiderBtn :()=>cy.get("#submit-creation-form"),
    Check : ()=>cy.get("#terms"),
    Validation : ()=>cy.get("#submit-validation-form")

};

saisirFirstname(n){
    this.elements.Firstname().type(n);
}
saisirLastname(a){
    this.elements.Lastname().type(a);
}
saisirAdresse(adresse, texteS){
    this.elements.AddressInput().type(adressePartielle, { delay: 150 });
    this.elements.AddressSuggestions({ timeout: 8000 }).should('be.visible');
    cy.contains(texte).click();
}
saisirComplement(c){
    this.elements.Complement().type(c);
}
saisirPhone(t){
    this.elements.Phone().type(t);
}

choisirColissimo(){
    this.elements.Colissimo().click();
}
valider(){
    this.elements.ValiderBtn().click();
}
Clickcheck(){
    this.elements.Check().check();
}
ClickValidation(){
    this.elements.Validation().click();
}

Govalid(){
    this.Clickcheck();
    this.ClickValidation();
}

remplirCommande(n, a, adresse, texte, complement, tel){
    this.saisirFirstname(n);
    this.saisirLastname(a);
    this.saisirAdresse(adresse, texte);
    if(complement) this.saisirComplement(complement);
    this.saisirPhone(tel);
    this.choisirColissimo();
    this.valider();
}
Payment(expectedAmount, Expiremois, Expireannee, cvv, nomcard, Numérocarte) {
    cy.origin(
      'https://secure.payzen.eu',
      { args: { expectedAmount, Numérocarte, Expiremois, Expireannee, cvv, nomcard } },
      ({ expectedAmount, Numérocarte, Expiremois, Expireannee, cvv, nomcard }) => {
        cy.get('#transaction_amount_label').should('contain', expectedAmount);
        cy.get('[aria-labelledby="paymentMeanLabel-CB"]').click();
        cy.get('#fCardNumber').clear().type(Numérocarte, { delay: 50 });
        cy.get('#vads-expiry-month-input').select(Expiremois);
        cy.get('#vads-expiry-year-input').select(Expireannee);
        cy.get('#cvvid').clear().type(cvv, { delay: 100 });
        cy.get('#cardHolder').clear().type(nomcard);
        cy.get('#validationButtonCard').click();
      }
    );
    return this;

}
}
export default new achatpom();