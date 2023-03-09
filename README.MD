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
$MONGO_URI='mongodb://localhost:27017/intranet-data'
PORT=4010
```

5. Run Docker client in your machine to build the local MongoDB
<br><br>

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

## IMPORTANT

You don't need the Production MONGO_URI to run the project, you should be able to run the API with the seeded data

## Tech Stack

![Mongoose](https://img.shields.io/badge/Mongoose-61DAFB?logo=Mongoose&logoColor=black)
![Node](https://img.shields.io/badge/Node-61DAFB?logo=Node&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=white)
