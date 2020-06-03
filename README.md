**Task Schedule API**
These are solutions to the Backend Internship: Preliminary Test for Remote Roofing's Backend Development challenge.

My approach to this challenge was to model my API to function like Trello, Pivotal Tracker and other task schedule trackers.

## Getting Started
The Live Application is deployed on heroku at https://remote-roof-be.herokuapp.com/ or can be cloned from github.com.

### Prerequisites

Begin by cloning the repository, `cd` into the cloned repository and run the following:

```
npm install
```
This command installs all the necessary dependencies


Set up PostgreSQL database locally. References this links for guidiance [official website](https://www.postgresql.org/)
[Demo walk throug](https://www.codementor.io/@engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)

You can as well use a remote database [Elephant SQL](https://www.elephantsql.com/)




### Setup

Create a `.env` using the `.env.sample` file as a guide, using your local environment variables


Now run your database migrations and run the application
```
npm run migrate
```
```
npm run dev
```

If all goes well, you should see something similar to this on the console:
```
Application started on http://localhost:<port>
```

### API Architecture
The API is built for easy use and understanding. It includes the following:

1.	User creation and Retrieval endpoint.
2.	Project creation and Retrieval endpoint
3.	Task creation and Retrieval endpoint.
4.	Authentication to prevent user access to projects they don't own.



## API END POINTS AND FUNCTIONALITY

| EndPoint | Functionality |
| --- | --- |
| POST `/api/users` | Create a *user* |
|GET `/api/users` |	Get all **users**|
|POST `/api/projects` |	Creates a **project** |
|GET `/api/projects` |	Get **projects** and users assinged to the project |
|POST `/api/projects/assign` |	Assign users to existing **projects** |
|POST  `/api/tasks` |	Create a **tasks** for an existing project |
|GET `/api/tasks`	| Get **tasks** and users assigned to the tasks|
|POST `/api/tasks/assign` |	Assign users to existing **tasks** |
|GET  `/api/users?name=<name>`|Get users with the *specified name*|
|GET  `/api/users?surname=<surname>`|Get users with the *specified surname*|
|GET `/api/projects?name=<name>` |Get projects with the *specified name*|
|GET `/api/tasks?name=<name>` |Get tasks with the *specified name*|

Now you can test the endpoints with a client e.g POSTMAN

List of commands available at the moment include:

**POST**

Adds an entry into the database

\
**/api/users/** - adds a user to the database. The user information is sent within the *Body* of the request and it returns a *token*. Input format:
```
{
    "name": "iris",
	"surname": "west",
	"email": "name@yahoo.com"
}
```
Each input field is validated and would return a *field specific* error message if empty.

\
**api/projects/** - A user can add a project to the database. The data input is sent within the *Body* of the requeset, in the input format is as follows:
```
{
	"name": "RooftopMC", //String
	"body": "This is my job", //Text
	"status": "completed" //input ranges are ['active', 'inactive', 'declined', 'completed']
}
```
This endpoint is protected. Only users can create projects and project names must be *unique*

\
**/api/projects/assign** - Users that created a project can assign existing *users* to the project. Input format:
```
{
	"projectId": 1, //Project id
	"assigneeId": 2 //Id of user being assigned
}
```

\
**api/tasks/** - A user can add a task to and existing project. The input is sent within the *Body* of the request, in the following format:
```
{
	"name": "Task1",
	"description": "This is my task now",
	"status": "completed", //input ranges are ['active', 'inactive', 'declined', 'completed']
	"score": 3,
	"projectId": 1
}
```
It returns a *409* if the user is already assigned the project.
This endpoint is protected. Users can only create tasks for projects they created

\
**/api/tasks/assign** - Users that created a task for a project can assign existing *users* to the task. Input format:
```
{
	"taskId": 1, //Project id
	"assigneeId": 2 //Id of user being assigned
}
```
It returns a *409* if the user is already assigned the task

\
**GET**

receives an entry/entries from the database

\
**/api/users/** - returns a list of all users in the following format:
```
{
    "success": true,
    "statusCode": 200,
    "message": "Users fetched successfully",
    "body": {
        "count": 2,
        "rows": [
            {
                "id": 2,
                "name": "Barry",
                "surname": "Allen",
                "email": "flash@yahoo.com",
                "createdAt": "2020-06-03T01:36:17.310Z",
                "updatedAt": "2020-06-03T01:36:17.310Z",
                "projects": []
            },
            {
                "id": 1,
                "name": "iris",
                "surname": "west",
                "email": "iris@yahoo.com",
                "createdAt": "2020-06-03T01:35:08.131Z",
                "updatedAt": "2020-06-03T01:35:08.131Z",
                "projects": []
            }
        ]
    }
}
```
The *count* is meant for *pagination* by providing the following queries *perPage* and *currentPage*. It also returns the projects the user is linked to
 You can also filter by *name* or *surname* by providing the following queries params:
```
/api/users?name=Barry&surname=Allen
```

\
**/api/tasks/** - returns a list of all tasks, the assigned users and project it belongs to in the following format:
```
{
    "success": true,
    "statusCode": 200,
    "message": "Tasks fetched successfully",
    "body": {
        "0": {
            "count": 2,
            "TaskName": "Task1",
            "TaskScore": 3,
            "status": "completed",
            "description": "This is my task now",
            "users": [
                {
                    "name": "Barry",
                    "email": "flash@yahoo.com"
                },
                {
                    "name": "iris",
                    "email": "iris@yahoo.com"
                }
            ]
        }
    }
}
```
The *count* is meant for *pagination* by providing the following queries *perPage* and *currentPage*. It also returns the projects the user is linked to
 You can also filter by *name* by providing the following queries params:
```
?name=taskName
``` 


\
**api/projects/** - returns a list of all projects and the users assigned to them in the following format:
```
{
    "success": true,
    "statusCode": 200,
    "message": "Projects fetched successfully",
    "body": {
        "0": {
            "count": 3,
            "ProjectName": "Remote Project",
            "status": "completed",
            "body": "This is my job",
            "users": [
                {
                    "name": "Barry",
                    "email": "flash@yahoo.com"
                },
                {
                    "name": "iris",
                    "email": "iris@yahoo.com"
                },
                {
                    "name": "Barry",
                    "email": "flash@yahoo.com"
                }
            ]
        },
        "1": {
            "count": 3,
            "ProjectName": "Remote Project",
            "status": "completed",
            "body": "This is my job",
            "users": [
                {
                    "name": "Barry",
                    "email": "flash@yahoo.com"
                },
                {
                    "name": "iris",
                    "email": "iris@yahoo.com"
                },
                {
                    "name": "Barry",
                    "email": "flash@yahoo.com"
                }
            ]
        }
    }
}
```

The *count* is meant for *pagination* by providing the following queries *perPage* and *currentPage*. It also returns the projects the user is linked to
 You can also filter by *name* by providing the following queries params:

```
?name="ProjectName"
```


## Integration tests

To test the endpoints, create a test database and run the following:
```
npm run test
```

## Deployment

API is deployed on [Heroku](https://remote-roof-be.herokuapp.com/)

## Work in Progress

* Add more filter options for *tasks* and *projects*.
* Improve test coverage
* Implement CI/CD with Travis-CI
* Add more features like user login, update and delete projects or tasks

## Built With

* [Node.js](https://nodejs.org/) - Javascript runtime
* [Express](https://expressjs.com/) - Web application framework
* [PostgreSQL](https://www.postgresql.org/) - Database
* [Sequelize](https://sequelize.org/) - Open-Relation Mapping for Postgres
* [Babel](https://babeljs.io/) - compiler for backward compatibility
* [Jest](https://jestjs.io/) and Supertest - testing framework
* [JWT](https://jwt.io/)

## Authors

* **Ulor Pascal** - [PascalUlor](https://github.com/PascalUlor)