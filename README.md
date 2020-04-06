## Employee happiness 

Prerequisites
* Node 10+
* Python 2.x (needed for argon2)
* npm install -g node-gyp (needed for argon2)
* npm install in /api & /frontend (please use npm, because yarn has an issue that is probably windows related)

First install everything:
```bash
cd api
npm i
cd ..
cd frontend
npm i
```

Run the development server(s):
```bash
cd api
npm run dev
cd ..
cd frontend
npm run dev
```

Users & votes are generated at startup (if you don't want this, you can comment the logic in api/index.ts)
Users created (user:pass)
* tester1@testerke.com:test1 => developer
* tester2@testerke.com:test2 => developer
* tester3@testerke.com:test3 => manager

Developer & managers can vote for the mood of the day
Only a manager can see the statistics

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### MERN
#### Database
##### Mongo (vs SQL)

A document-oriented database programme based on NoSQL
* Performance (vertical scalable)
* Flexible (If you want tables like in SQL, you can just use Mongoose to create schemas)
* Closest to JavaScript technology stack
* Easy to connect with express (koa, hapi, ...)

#### NodeJS framework
##### Express
It’s a robust Node.js web application framework that helps in creating powerful REST APIs.
* Most popular
* Simple / easy to use

#### UI framework
##### React
A JavaScript library used to create beautiful and interactive user interfaces developed by Facebook and the community of individual developers.
* Why would anyone use jQuery nowadays?
* Write React-Native application on top of your business logic of react (if you want a native app instead of PWA ofcourse)
* Angular because bluuh
* VueJS would be great too, but not experienced enough

#### NodeJS
It’s a JavaScript runtime environment built on Google Chrome’s V8 engine, and it compiles js at the runtime.
* Same language across both frontend and backend
* Faster development 
* Scalable/performance
* Share business logic in backend and frontend
* Large open source community

# Testing
I used Jest for testing on the same mongo database I used for the demo.
I prefer to write tests for services & middlewares rather than the controller itself, maybe I'm wrong?

# TypeScript
I implemented the backend in TypeScript, to just try it.
The front-end is implemented in JavaScript, because it types faster :)


# Authentication 

Used JWT and store token in cookie (even though this is not the most ideal solution)
Only used access_token for now, and set it large enough to work


# Future Improvements 
* Error page
* Create Swagger
* Error handling
* Extend tests (api, middlewares, ...)
* Dockerize each component (ui, api, mongo)
* Remove user details when retrieving votes
* Security breaches
* module aliasing