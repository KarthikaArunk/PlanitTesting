describe('Jupiter Toys tests',()=>{
    beforeEach(()=>{
        cy.visit("https://jupiter.cloud.planittesting.com/");
    })
    it('Start Shopping Toys should show list of toys',()=>{

        //Click on Start Shopping Button        
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-1").should('be.visible');
     })

    it('Clicking Buy should add a product to cart',()=>{
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-1").contains('Buy').click();  
        cy.get("#product-3").contains('Buy').click();  
        cy.get('.cart-count').should('have.text','2');
    })

    it('Clicking on cart should show cart page with selected toys',()=>{
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-1").contains('Buy').click();  
        cy.get("#product-3").contains('Buy').click();  

        //Click on Cart
        cy.get("#nav-cart").click();
        cy.get('.ng-binding').contains('Teddy Bear').should('be.visible');
        cy.get('.ng-binding').contains('Handmade Doll').should('be.visible');

        //Click on Check Out button
        cy.get('.btn-checkout.btn.btn-success').contains('Check Out').click();
        
        //Delivery Details Form
        cy.contains('Delivery Details');
        cy.get('#forename').type('Neo');
        cy.get('#surname').type('Mick');
        cy.get('#email').type('abcde@gmail.com');
        cy.get('#telephone').type('123456788');
        cy.get('#address').type('1, London Street');
        cy.get('#cardType').select('Mastercard');
        cy.get('#card').type('1122334455667788');

        //Click on Submit Button
        cy.get('#checkout-submit-btn').contains('Submit').click();
        cy.get('#nav-cart').should('have.value',0);   
    })

     //Empty Cart Items

     it('Empty shopping cart items',()=>{
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-4").contains('Buy').click();  
        cy.get("#product-7").contains('Buy').click();

        //Click on Cart
        cy.get("#nav-cart").click();
        cy.get('.ng-binding').contains('Fluffy Bunny');
        cy.get('.ng-binding').contains('Valentine Bear');

        //Click on Empty Cart button
        cy.get('.btn.btn-danger').contains('Empty Cart').click();
        cy.get('.btn.btn-success').contains('Yes').click();
        cy.get('.alert').contains("Your cart is empty - there's nothing to see here.");

     })   

     //Click on Empty Cart and  click on "No" button

     it('Click on Empty Cart and select "No" ',()=>{
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-3").contains('Buy').click();  
        cy.get("#product-8").contains('Buy').click();

         //Click on Cart
         cy.get("#nav-cart").click();
         cy.get('.ng-binding').contains('Handmade Doll').should('be.visible');
         cy.get('.ng-binding').contains('Smiley Face').should('be.visible');

         //Click on Empty Cart button
        cy.get('.btn.btn-danger').contains('Empty Cart').click();
        cy.get('.btn.btn-cancel.btn-danger').contains('No').click();

        //Click on Check Out button
        cy.get('.btn-checkout.btn.btn-success').contains('Check Out').click();

        //Delivery Details Form
        cy.contains('Delivery Details');
        cy.get('#forename').type('Nick');
        cy.get('#surname').type('Mie');
        cy.get('#email').type('nickmie@gmail.com');
        cy.get('#telephone').type('223556788');
        cy.get('#address').type('16, Finny Street');
        cy.get('#cardType').select('Mastercard');
        cy.get('#card').type('1022334454667783');

        //Click on Submit Button
        cy.get('#checkout-submit-btn').contains('Submit').click();
        cy.get('#nav-cart').should('have.value',0); 

      })
    
     //Click on cart and Carry on shopping
     it('Click on cart and carry on shopping',()=>{
        
        //Click on cart and carry on shopping
       cy.get('.btn.btn-success.btn-large').click();
       cy.get("#product-5").contains('Buy').click();
       cy.get("#product-7").contains('Buy').click();

       cy.get("#nav-cart").click();
       cy.get('.ng-binding').contains('Smiley Bear').should('be.visible');
       cy.get('.ng-binding').contains('Valentine Bear').should('be.visible');
       cy.get('.cart-msg').contains('Shopping').click();
       cy.get("#product-1").contains('Buy').click();

       cy.get("#nav-cart").click();
       cy.get('.ng-binding').contains('Teddy Bear').should('be.visible');
       
       //Click on Check Out button
       cy.get('.btn-checkout.btn.btn-success').contains('Check Out').click();
    })

    //Remove item from the Cart
     it('Actions-Remove items from the shopping cart',()=>{
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-3").contains('Buy').click();
        cy.get("#product-5").contains('Buy').click();  
        cy.get("#product-7").contains('Buy').click();
        cy.get("#product-8").contains('Buy').click();

        cy.get("#nav-cart").click();
        cy.get('.ng-binding').contains('Handmade Doll');
        cy.get('.ng-binding').contains('Smiley Bear');
        cy.get('.ng-binding').contains('Valentine Bear');
        cy.get('.ng-binding').contains('Smiley Face');

        //Click on Action button to remove item from cart
        cy.contains('td','Valentine Bear').parent().within($tr=>{
        cy.get('.remove-item.btn.btn-mini.btn-danger').click();
        })

        cy.get('.modal-footer').contains('Yes').click();                 
        cy.get('.ng-binding').contains('Handmade Doll').should('be.visible');  
        cy.get('.ng-binding').contains('Smiley Bear').should('be.visible'); 
        cy.get('.ng-binding').contains('Smiley Face').should('be.visible');   

        //Click on Check Out button
        cy.get('.btn-checkout.btn.btn-success').contains('Check Out').click(); 
        
        //Delivery Details Form
        cy.contains('Delivery Details');
        cy.get('#forename').type('Sam');
        cy.get('#surname').type('Phil');
        cy.get('#email').type('zxcv@gmail.com');
        cy.get('#telephone').type('5645343289');
        cy.get('#address').type('20, Stanley Street');
        cy.get('#cardType').select('Visa');
        cy.get('#card').type('3421789056741236');

        //Click on Submit Button
        cy.get('#checkout-submit-btn').contains('Submit').click();
             
    })    

    //Negative testing
    it('Error message should be dispalyed when clicking on submit button without filling mandatory fields',()=>{
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-6").contains('Buy').click();
        cy.get("#product-8").contains('Buy').click();  

        cy.get("#nav-cart").click();
        cy.get('.ng-binding').contains('Funny Cow').should('be.visible');
        cy.get('.ng-binding').contains('Smiley Face').should('be.visible');

        //Click on Check Out button
        cy.get('.btn-checkout.btn.btn-success').contains('Check Out').click(); 
        //Delivery Details Form
        cy.contains('Delivery Details');
        cy.get('#surname').type('Lik');
       
        //Click on Submit Button
        cy.get('#checkout-submit-btn').contains('Submit').click();      
        cy.get('#forename-err').contains('Forename is required').should('be.visible');
         
    })

    //Adding more toys in the cart by changing quantity

    it('Adding more toys in the cart by changing quantity',()=>{
        cy.get('.btn.btn-success.btn-large').click();
        cy.get("#product-1").contains('Buy').click();
        cy.get("#product-4").contains('Buy').click();  
        cy.get("#product-6").contains('Buy').click();  

        cy.get("#nav-cart").click();
        
        //Change quantity for the Fluffy Bunny Toy
        cy.contains('td','Fluffy Bunny').parent().within($tr=>{
            cy.get('[value="1"]').clear();
            cy.get('[value="1"]').type('3');           
            })

         //Click on Check Out button
        cy.get('.btn-checkout.btn.btn-success').contains('Check Out').click(); 
        
        //Delivery Details Form
        cy.contains('Delivery Details');
        cy.get('#forename').type('Leon');
        cy.get('#surname').type('Yu');
        cy.get('#email').type('leonyu@gmail.com');
        cy.get('#telephone').type('21453437889');
        cy.get('#address').type('15, Vin Street');
        cy.get('#cardType').select('Visa');
        cy.get('#card').type('5421769056741234');

        //Click on Submit Button
        cy.get('#checkout-submit-btn').contains('Submit').click();        
    })

    //Contact Form

    it('Clicking on Contact should display contact form',()=>{

        cy.get('.nav').contains('Contact').click();
        cy.get('#forename').type('Sam');        
        cy.get('#surname').type('Phil');
        cy.get('#email').type('zxcv@gmail.com');
        cy.get('#telephone').type('5645343289');
        cy.get('#message').type('Good collection of toys');

        //Click on Submit Button
        cy.get('.btn-contact.btn.btn-primary').contains('Submit').click();
             
        })
})