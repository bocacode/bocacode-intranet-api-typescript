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
NODE_ENV='development'
```

5. Run Docker client in your machine to build the local MongoDB
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
## Unit Tests
----
 
```bash
# to run all unit tests
npm run test 

# to run only unit test for one file
npm run test:watch name_of_file_here
```


# Sample Routes

> Use these samples to test your endpoints and or requests:

## Get all:

```javascript
GET / api / restaurants / HTTP / 1.1
Host: localhost: 4040

// sample response
[
  {
    "active": false,
    "_id": "640a1e8fd56d69fff7b9e3ca",
    "uid": "2335943",
    "address": "7032 W Palmetto Park Rd, Boca Raton, FL 33433",
    "menu_url": "starbucks.com/menu",
    "name": "Starbucks ",
    "photo_url": "https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fstarbucks%20.jpeg?alt=media&token=404140bf-3139-4ad4-bd24-24de58e34ddf",
    "rating": ["4"],
    "created_by": "data seed",
    "__v": 0,
    "createdAt": "2023-03-09T17:59:43.845Z",
    "updatedAt": "2023-03-09T17:59:43.845Z"
  },
  {
    "active": false,
    "_id": "640a1e8fd56d69fff7b9e3cb",
    "uid": "2335943",
    "address": "7028 W Palmetto Park Rd Ste 106, Boca Raton, FL 33433",
    "menu_url": "https://www.chipotle.com/order/#menu",
    "name": "Chipotle ",
    "photo_url": "https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fchipotle.jpeg?alt=media&token=6e0caaf6-82fd-45c4-9ea2-60441d8ff001",
    "rating": ["3"],
    "created_by": "data seed",
    "__v": 0,
    "createdAt": "2023-03-09T17:59:43.845Z",
    "updatedAt": "2023-03-09T17:59:43.845Z"
  }
]
```

## Add One:

```javascript
POST /api/restaurants/ HTTP/1.1
Host: localhost:4040
Content-Type: application/json
Content-Length: 388

{
    "address": "8979 W Palmetto Park Rd, Boca Raton, FL 33433",
    "menu_url": "https://www.chipotle.com/order/#menu",
    "name": "Chipotle 4",
    "photo_url": "https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fchipotle.jpeg?alt=media&token=6e0caaf6-82fd-45c4-9ea2-60441d8ff001",
    "rating": [
        "3"
    ],
    "user_id": "local admin"
}

// sample response
{
    "uid": "236954",
    "address": "8979 W Palmetto Park Rd, Boca Raton, FL 33433",
    "menu_url": "https://www.chipotle.com/order/#menu",
    "name": "Chipotle 4",
    "photo_url": "https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fchipotle.jpeg?alt=media&token=6e0caaf6-82fd-45c4-9ea2-60441d8ff001",
    "rating": [
        "3"
    ],
    "created_by": "admin@gmail.com",
    "active": false,
    "_id": "649715527c16307d70b48737",
    "createdAt": "2023-06-24T16:09:54.535Z",
    "updatedAt": "2023-06-24T16:09:54.535Z",
    "__v": 0
}
```

## Edit One:

```javascript
PATCH /api/restaurants/2335943 HTTP/1.1
Host: localhost:4040
Content-Type: application/json
Content-Length: 95

{
    "address": "8979 W New Address here Boca Raton, FL 33433",
    "user_id": "local admin"
}

// sample response

{
  "active": false,
  "_id": "640a1e8fd56d69fff7b9e3ca",
  "uid": "2335943",
  "address": "8979 W New Address here Boca Raton, FL 33433",
  "menu_url": "starbucks.com/menu",
  "name": "Starbucks ",
  "photo_url": "https://firebasestorage.googleapis.com/v0/b/bocacode-portal.appspot.com/o/restaurants%2Fstarbucks%20.jpeg?alt=media&token=404140bf-3139-4ad4-bd24-24de58e34ddf",
  "rating": ["4"],
  "created_by": "data seed",
  "__v": 0,
  "createdAt": "2023-03-09T17:59:43.845Z",
  "updatedAt": "2023-06-24T15:52:34.555Z"
}
```

## Disable One:

```javascript
PATCH /api/restaurants/disable/236954 HTTP/1.1
Host: localhost:4040
Content-Type: application/json
Content-Length: 36

{
    "user_id": "admin@gmail.com"
}

// sample response

{
    "success": "Restaurant id 236954 has been disabled "
}
```

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
