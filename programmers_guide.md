# Programmers Guide

### In order to build our textbook buy and sell web app, we chose to use the following technologies. More information regarding each feature can be found by clicking the linked names.

- Next.js - a framework built on React and Javascript. https://nextjs.org/
- React Bootstrap - a front end framework built for React used for our UI elements https://react-bootstrap.github.io/
- Cypress - a testing framework built for javascript used for testing our user functionalities. https://www.cypress.io/
- MongoDB Atlas - a cloud-based database provider that we used to store all our data about Seller’s books https://www.mongodb.com/cloud/atlas
    - Our DB features one collection named Posts. This collection allows us to store the information when a seller wants to post a book for sale. Example below:
    - ![DBimage (1)](https://user-images.githubusercontent.com/43662406/84309585-2a443f00-ab15-11ea-973f-42876fa6b011.png)
    - Record: a textbook for sale
    - Fields: ISBN number, name, price, contact email, class used for, professor, image link, and id. All are self-explanatory except id. 
    - Id: Every individual user is assigned an ID by Google OAuth. This id is unique and used when retrieving a Seller’s textbooks that they have put for sale. 
- Auth0 - an authentication and authorization service used for allowing users to buy or sell textbooks. https://auth0.com/
    - Buyers: By signing in, buyers’ contact info can automatically be sent to a seller.
    - Sellers: By signing in, sellers can make post books for sale and view and delete their live posts. 
- Nodemailer - a module for Node.js applications used for conveniently and automatically sending a seller an email with the contact info of an interested buyer. https://nodemailer.com/about/
