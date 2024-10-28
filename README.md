# Stride - A Personal Task Manager

### TECHNOLOGIES USED


### ATTRACTIONS & ADVANCEMENTS

- Precise documentation.
- Colocated libraries with reusable utility functions and interfaces.
- Usage of commit-conventions for meaningful commit messages
  - doc: Documentation
  - chore: File/folder setup
  - feat: Feature
  - refactor: Changes that are not features.
  - fix: Fixation of issues/errors
  - etc.

### CODEBASE ARCHITECTURE BREAKDOWN

- `README.md/:` Project documentation and setup instructions.
- `prisma:` Contains database resources.
- `prisma/migrations:` Contains database migrations.
- `prisma/seeds:` Contains database seed setup.
- `src/_libs:` Contains reusable libraries used throughout the application.
- `src/shared:` Contains module for shared resources. E.g. Prisma.
- `src/categories:` Contains code for the app module categories.
- `src/tags:` Contains code for the app module tags.
- `src/tasks:` Contains code for the app module tasks.
- `src/app.module.ts:` Root application module.
- `src/main.ts:` Entry point to the application.

# HOW TO SETUP THIS PROJECT IN YOUR LOCAL DEVICE

### GETTING THE CODEBASE

Clone this GitHub Repository to your desired location:

 - Windows: `https://github.com/farhanhasindipro25/stride-server.git`

 - Linux/MacOS: `git@github.com:farhanhasindipro25/stride-server.git`


### SERVER-SIDE SETUP

Now install all dependencies:

`npm install`

and then to run the application:

`npm run start:dev`

### DOCKER SETUP

Open Docker Desktop and then run:

`docker compose up dev-db -d`

### DATABASE SETUP

First run the migrations:

`npx prisma migrate dev`

Then run the seed script to backup data.

`npx prisma db seed`

### TEST THE APIS IN POSTMAN

Open the following file in Postman and find the well documented API endpoints to test.

`Stride.postman_collection.json`


**YOU ARE ALL SETUP TO VIEW AND INTERACT WITH THE PROJECT**
