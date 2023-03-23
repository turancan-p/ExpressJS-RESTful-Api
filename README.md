# ExpressJS-RESTful-Api

## Usage
1- run "npm i" from your terminal
2- npm start

## Example env file
Create a new file and name it nodemon.json

The content should be like this
```json
{
  "env": 
  {
    "MONGO_ATLAS_PW": "link", // your mongo db connect link
    "AUTH_KEY": "authsecretkey", // your secret key for auth token
    "REFRESH_KEY": "refreshsecretkey", // your secret key for refresh token
    "PORT": 3001, // custom port
    // url's for response navigation url
    "URL_CUSTOMERS": "http://localhost:3001/customers/",
    "URL_ORDERS": "http://localhost:3001/orders/",
    "URL_PRODUCTS": "http://localhost:3001/products/",
    "URL_USERS": "http://localhost:3001/users/"
  }
}
```
