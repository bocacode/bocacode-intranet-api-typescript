# 🦸🏻‍♀️ Boca Code Intranet API Project 🦸🏽‍♂️

A place for new students to get to know the area, engage in technology and practice the coding skills that will get you one step closer to becoming a Software Engineer 👩🏼‍💻 🧑🏽‍💻 👩🏾‍💻 🧑🏻‍💻

### From Alumni to Coming Students

This project is built with React, primarily in TypeScript. However, JavaScript contributions are also welcomed.

## Getting Started

1. Copy and paste this command in the command line to download the repo

```bash
$ git clone https://github.com/bocacode/bocacode-intranet-api-typescript.git
```

2. Go to bocacode-intranet-typescript directory

```bash
$ cd bocacode-intranet-api-typescript
```

3. Install third-party packages and libraries

```bash
$ npm install
```

4. Create a .env file and define variables

```bash
MONGO_URI='mongodb://localhost:27020/intranet-data'
PORT=4040
```

5. Run Docker client in your machine to build the local MongoDB
   `<br><br>`
6. Build the docker container

```bash
$ docker compose up
```

![docker](https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=Docker&logoColor=white)

7. Seed data into local MongoDb

```bash
$ npm run seed
```

8. Run project locally

```bash
$ npm run start
```

---

# Postman

### Test your endpoints and or request access to this Postman Collection:

https://www.postman.com/veerii/workspace/bocacodeintranet/collection/3147299-f0ac715e-f4da-4c25-ba36-57d18b2f8672?action=share&creator=3147299&ctx=documentation

## Steps:

1. Sign up your user account, by sending a POST request with `RAW` JSON like this

```JSON
// POST to - http://localhost:4040/api/users/signup 
{
    "email": "jso1919@gmail.com",
    "password": "mypassword-here",
    "first_name": "Jon",
    "last_name": "Sanchez",
    "access_level": 10
}
```

2. Then user will be added to the Database, with your password hashed, and response should look like this

```JSON
{
    "email": "jso1919@gmail.com",
    "access_level": 10,
    "first_name": "Jon",
    "last_name": "Sanchez",
    "password": "$2b$10$wx2HeoZPXWk7m1JnERlZ/u5PgpRuNANCse5Mzf3MjN5y7DVfrMKCO",
    "status": "Pending",
    "_id": "640a5a268c31ba12e4eab8ef",
    "createdAt": "2023-03-09T22:13:58.848Z",
    "updatedAt": "2023-03-09T22:13:58.848Z",
    "__v": 0,
    "iat": 1678400038,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpzbzE5MTlAZ21haWwuY29tIiwiYWNjZXNzX2xldmVsIjoxMCwiZmlyc3RfbmFtZSI6IkpvbmF0aGFuIiwibGFzdF9uYW1lIjoiU2FuY2hleiIsInBhc3N3b3.......................0dNjX6X_yCjdt1PB4Hf4NE1wuvBWCXD5aD9GD72QuDk"
}
```

3. Then you will need to add the `accessToken` to every other POSTMAN request under Authorization

- Type: Bearer Token
- Token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpzbzE5MTlAZ21haWwuY29tIiwiYWNjZXNzX.................0dNjX6X_yCjdt1PB4Hf4NE1wuvBWCXD5aD9GD72QuDk`

## Then you should be able to use the rest of the endpoints,

> Remember if you don't go through this process you will not be able to run any of the other endpoints

---

## IMPORTANT

You don't need the Production MONGO_URI to run the project, you should be able to run the API with the seeded data

## Tech Stack

![Mongoose](https://img.shields.io/badge/Mongoose-61DAFB?logo=Mongoose&logoColor=black)
![Node](https://img.shields.io/badge/Node-61DAFB?logo=Node&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white)
