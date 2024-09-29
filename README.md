# BrainFlix Project - Backend API

## Acknowledgement
- [Brainstation](https://brainstation.io/)
- [Postman](https://www.postman.com/)
- [Thunder Client](https://www.thunderclient.com/)
- [StackBlitz](https://stackblitz.com/edit/react-fu7pbk?file=src%2FApp.js)
- [Vite](https://vitejs.dev/)
- [npm](https://www.npmjs.com/)

## Author
- [Matthew Jung](https://github.com/matthewjung04)

## Documents
- [API Documentation](https://unit-3-project-api-0a5620414506.herokuapp.com/)

## Usage
- To run the project use: `$ npm run dev`

## Installed Packages
- [npm axios](https://www.npmjs.com/package/axios)    
    - Installation:
    `$ npm install axios`

- [npm body-parser](https://www.npmjs.com/package/body-parser)    
    - Installation:
    `$ npm install body-parser`

- [npm cors](https://www.npmjs.com/package/cors)    
    - Installation:
    `$ npm install cors`

- [npm dotenv](https://www.npmjs.com/package/dotenv)    
    - Installation:
    `$ npm install dotenv --save`

- [npm express](https://www.npmjs.com/package/express)    
    - Installation:
    `$ npm install express`

- [npm nodemon](https://www.npmjs.com/package/nodemon)    
    - Installation:
    `$ npm install -g nodemon`

- [npm react-router-dom](https://www.npmjs.com/package/react-router-dom)
    - Installation:
    `$ npm install react-router-dom`

- [npm uuid](https://www.npmjs.com/package/uuid)    
    - Installation:
    `$ npm install uuid`

## Methods & Routes
GET /videos
- Returns an array of video objects

GET /videos/:id
- Returns a detailed object of a single video (comments included)

POST /videos
- Request body must contain video title, description, and thumbnail image
- Creates a new video and adds to existing array of video objects

POST /videos/:id/comments
- Request body must contain name and comment
- Creates a new comment for a specific video

DELETE /videos/:videoId/comments/:commentId
- Deletes the given comment and returns it in the response body

PUT /videos/:id/likes
- Increments the number of likes for a specific video object
- Returns the video object with updated number of likes

## Sprint-3 Overview
A decision has been made to build out an actual API for the prototype and move away from using the mock API. The team at BrainFlix is confident in your ability to build out this new API, and have tasked you to develop it for this final sprint.

- Using the mock API as your guide, build out your own API service that will manage the video data, and update the client application to use your API service. 
- Create a new repository for your server-side code.

## Tech Stack
- React, vite, npm
- JavaScript (js, jsx)
- APIs (WebAPIs)
- node.js
- express.js
