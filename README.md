# Busi 

***Busi*** is a *simple, fast,* and *user-friendly* sales management solution developed for startups and small-scale businesses. Supported functions allow a user to *create, search,* and *update* customers, sales orders, invoices, and payments.

Check out the deployed app on Heroku:

https://ryan-busi.herokuapp.com/index.html


### Concept:
---
We wanted to create a platform that is intuitive and applicable in the real world. We decided to design something for small businesses to help manage sales and keep important data organized in one place. Additionally, we wanted to give it a simple, user friendly design that provides a smooth experience.

### Using the app:
---
Upon navigating to the app, the user will arrive on the home page.  From here they can use the navbar on the side to get to any other page of the app.
![screenshot 1](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot1.JPG)

Clicking on the "Create Customer Account" link in the navbar will direct the user to the customer creation page.  Here a new customer can be added to the database by entering the customer's name, address, and phone number and clicking the "Create" button.
![screenshot 2](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot2.JPG)
![screenshot 3](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot3.JPG)

On the "Search Customer" page, the user can search for a customer by either name, account number, or phone number.
![screenshot 5](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot5.JPG)

Clicking on the "Create Sales Order" link takes the user to the sales order creation screen.  Here the user enters a customer account number, a description for the sales order, and a dollar amount, then clicks the "Create" button to create the sales order.
![screenshot 6](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot6.JPG)

After creating a sales order, it can be found from the Search Sales Order screen by searching for either the sales order number or the customer account number with which it is associated.
![screenshot 8](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot8.JPG)

To generate an invoice for a given sales order, the user clicks the "Generate Invoice" link to navigate to the invoice creation screen.  Here the user first enters the sales order number and clicks "Search," then on the following screen enters any payments or discounts to apply toward the invoice if applicable.  Then the "Generate Invoice" button is clicked.
![screenshot 9](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot9.JPG)
![screenshot 10](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot10.JPG)
![screenshot 11](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot11.JPG)

On the "Search Invoice" screen, an invoice can be found by either searching for the invoice number or the sales order number with which it is associated and clicking "Search."  Once the invoice is found, clicking on it will take the user to the "Update Invoice" screen where a new payment can be applied.  After typing the payment amount and clicking the "Update" button, the screen is updated to display the payment history and the remaining balance due on the invoice.
![screenshot 12](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot12.JPG)
![screenshot 13](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot13.JPG)
![screenshot 14](https://github.com/RyanEllingson/Busi/blob/master/assets/images/screenshot14.JPG)

### Technology:
---
This application was developed with:
- HTML5/CSS/Javascript
- NodeJs
- Express Web Framework
- Sequelize ORM

### Status:
---
[![Build Status](https://travis-ci.com/RyanEllingson/Busi.png?branch=master)](https://travis-ci.com/RyanEllingson/Busi)


### Contributions:
---
This application was developed as a project by:
-[Paul Chheang](https://github.com/paul-kh) 
-[Ryan Ellingson](https://github.com/RyanEllingson) 
-[Michael Iverson](https://github.com/ivers523)
-[William Molhoek](https://github.com/wmolhoek)
                                             

