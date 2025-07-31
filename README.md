# Node-Task

#  Node.js Chat & Task App (TypeScript + PostgreSQL)

A simple Express.js REST API with the following features:

-  User registration & login (JWT-based auth)
-  Task creation & filtering (all, pending, completed)
-  Chat import from Excel sheet
-  Built with TypeScript, Sequelize ORM, PostgreSQL

1.How to Run:

git clone 
cd your-repo

npm install

 2.Run the App :

 npm run dev

You'll see :
Serever Started


API Endpoints (Sample)
POST /api/register → Register new user

POST /api/login → Login and receive JWT

POST /api/tasks → Create a task (auth required)

GET /api/tasks?status=completed/pending/all → Filter tasks

POST /api/chats/import → Import chat via Excel (.xlsx)
