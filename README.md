# test-application

### A solution to the following Problem
Using the language of your choice please build your own API which calls the API at https://bpdts-test-app.herokuapp.com/, and returns  people who are listed as either living in London, or whose current coordinates are within 50 miles of London.

When index.js is ran, it will launch an express server for the API to be enquired on.

## Dependencies
- NodeJS
- Body-Parser
- Node-Fetch
- Express
- Geopoint
- Chai
- Chai-Http
- Mocha

## Run App
```js
$ npm install
$ node index.js
```

### Query API
```bash
$ curl -X GET "http://localhost:3000/users/london/" -H "accept: application/json"
```

## Run Tests
```js
$ npm test
```
