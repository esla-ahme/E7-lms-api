# E7_NodeJS
a simple CRUD using NodeJS, Express and MongoDB for experiment E7

## Heroku URL
https://node-lms-api.herokuapp.com/

## Endpoints
### Forms
- /web/courses/create 
- /web/students/create

### APIs

#### Courses
- /api/courses   --- method: POST --- description: creates a new course
- /api/courses   --- method: GET --- description: Fetches all courses
- /api/courses/:Id   --- method: GET --- description: fetches the course with the given id
- /api/courses/:Id   --- method: PATCH --- description: update the course with the given id
- /api/courses/:Id   --- method: DELETE --- description: delete the course with the given id


#### Students

- /api/students   --- method: POST --- description: creates a new student
- /api/students   --- method: GET --- description: Fetches all students
- /api/students/:Id   --- method: GET --- description: fetches the student with the given id
- /api/students/:Id   --- method: PATCH --- description: update the student with the given id
- /api/students/:Id   --- method: DELETE --- description: delete the student with the given id

