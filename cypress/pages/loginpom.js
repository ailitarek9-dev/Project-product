///<reference types="cypress"/>

class loginpom{
elements ={
    Button: ()=>cy.get("a.modal__form"),
    Email: ()=>cy.get("#newEmail"),
    Button2: ()=>cy.contains('input[type="submit"]', 'Inscription'),
    Firstname: ()=>cy.get("#customer_firstName"),
    Lastname: ()=>cy.get("#customer_lastName"),
    Confirmmail: ()=>cy.get("#customer_emailConfirm"),
    Password: ()=>cy.get("#customer_password"),
    Date: ()=>cy.get("#customer_birthday"),
    Box: ()=>cy.get("#legalmentions"),
    Inscrip: ()=>cy.get("#submitBtn"),
    AchatsBtn: ()=>cy.get('a.nav-link').contains("L'acheter"),
    ChoseProduct: () => cy.get('a[data-name="glplan12"]'),
};

ClickInsc(){
    this.elements.Button().click();
}
saisirEmail(e){
    this.elements.Email().type(e);
}
clickLogin(){
    this.elements.Button2().click();
}
Saisirfirstname(n){
    this.elements.Firstname().type(n);
}
Saisirlastname(a){
    this.elements.Lastname().type(a);
}
saisirEmail2(c){
    this.elements.Confirmmail().type(c);
}
Saisirpassword(p){
    this.elements.Password().type(p);
}
Saisirdate(d){
    this.elements.Date().type(d, { delay: 100 });
}
Checkbox(){
    this.elements.Box().check();
}
ClickInscrip(){
    this.elements.Inscrip().click({ force: true });
}
clickAchat(){
    this.elements.AchatsBtn().click();
}
clickChose(){
     this.elements.ChoseProduct().click();
}

goRemp(n,a,c,p,d){
    this.Saisirfirstname(n);
    this.Saisirlastname(a);
    this.saisirEmail2(c);
    this.Saisirpassword(p);
    this.Saisirdate(d);
}
}
export default new loginpom()