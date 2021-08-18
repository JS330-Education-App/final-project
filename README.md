># EDUCATION REPORT README

Students, Teachers, and Parents need to be in communication about grades. Using JavaScript, it is possible to create a portal for up-to-date assignment reports. By creating this as a web application, these three groups can have a better time engaging in the learning process.

Teachers should be able to monitor their various classes and assignments. Students should be able to see their grades as well as upcoming/ungraded assignments. Parents should be able to see their students’ grades and assignments.

To solve this, we will create an MVC style JavaScript Application, using **[React](https://reactjs.org/)**, **[MongoDB](https://www.mongodb.com/)**, **[Express](https://expressjs.com/)**, and **[Node.js](https://nodejs.org/en/)**. There will be four views: **_login/registration, parent, teacher, and student._  [Mongoose](https://mongoosejs.com/docs/index.html)** will be used to create models for our data collections in _MongoDB_. _Express_ will control the state of the application’s data through routing and connect the **Views** to the **Models**. By using each of the listed technologies, we utilize JavaScript as the only language and convention needed to create this application. Each technology is complimentary, empowering the application to quickly render changes in data state.

---
**_MongoDB_** is both scalable and fast. It stores data as a binary value. Through **_Node.js_**, `JSON` objects are quickly translated to binary data and search for schema-less collections. **Mongoose** is an Object Relational Mapping layer that helps provide schemas for **_MongoDB_**. Here, we will utilize these technologies to create three separate schema objects to be stored in **_MongoDB_** collections. _User.js_, _Assignment.js_, and _AssignmentGrades.js_ will be the three **Mongoose** schemas to be used as our models.
***
**_Express.js_** is a framework that makes it easier to write a web server on **_Node.js_**. This is accomplished by defining routes. **_Express_** parses the URL, headers, and parameters. The route determines what to do with the received `HTTP` request matching a specific pattern. For this project we will have three routes: _Login.js_, _Assignment.js_, _AssignmentGrades.js_.
For _Login.js_ there will be three routes: [Signup](./README.md#Signup), [Login](./README.md#Login), and [Change Password](./README.md#Change-Password).
***
#### Signup
```JavaScript
POST /login/signup
```
#### Login
```JavaScript
POST /login
```
#### Change Password
```JavaScript
POST/login/password
```
The sign-up page will offer a field for First/Last name, a dropdown for role of teacher, student, or parent, and a specification for what grade level the student. When signing up, all fields will be verified determined by selected role. When logging in, email/password will be verified as well.
***
_Assignment.js_ will require **_authentication_** and **_authorization_**. To create a new assignment, a route will be made, restricted to the teacher role. The assignment is placed into the `JSON` body.
```JavaScript
POST /assignment
```
***
To assign an assignment to a student, the route of:
```JavaScript
POST/assignment/:id
```
will be made and restricted to the `“teacher”` role. The `“id” = student email`.
***
To update the assignment, the route of
```JavaScript
PUT/assignment/:id
```
 is used. Only the **teacher** and **student** can update these assignments.
***
All assignments must also be displayed for the teacher/student.
```JavaScript
GET/assignment/:id
```
 will resolve this, with `“id” = teacher’s` last name.
***
To get a particular assignment, the route:
```JavaScript
GET/assignment/:id
```
 will be used. **Teacher** and **student** roles can only access this route if and only if the `student id` matches the `student’s id` found in the _specific_ **homework** object.
***
To get grades, _AssignmentGrades.js_ routes will be used.
```JavaScript
GET/studentAssignments/:id
```
 will be displayed both to the Student and Parent, and show the student’s grades, where `“id”= student`.
 ```JavaScript
GET/studentAssignments
 ```
 will display grades for all students for only the Teacher role.
***
With **_Express_** allowing to define routes, **_Express_** can also be written as middleware. Middleware gives web servers the ability to insert custom code into any request/response processing path. In addition to routing, we have written **_Express_** middleware to handle **_authentication_** and **_authorization_**.
***
With **_MongoDB_**, we will be utilizing indexes for performance using the `userId`, and `Assignment title`. We will also be making two text searches, searching **Assignment** by `title`, and the other searching **Students** by `name/grade level`. We will have three aggregations: `assignment by title`, `assignment by grade level`, and `assignment by teacher`. There will be one **lookup** for a specific **assignment** for a **student**.
***
[React-Router](https://reactrouter.com/), [React-Bootstrap](https://react-bootstrap.github.io/), and [MaterialUI](https://material-ui.com/) will be used to help render data and provide a simple front-end to demonstrate the API.
[Axios](https://www.npmjs.com/package/axios) will potentially be used to help handle headers.
[Jest](https://jestjs.io/) is a testing framework that will be used to test login routes and assignment routes.  
[bcrypt](https://www.npmjs.com/package/bcrypt) will be used to help with the authentication and authorization.
***
We built this application based off the idea from Tamara Trefilova. She suggested this idea to showcase our abilities in MongoDB, Mongoose, Express and Node.js from what we have learned in JS330. Kateryna helped provide UI design and an overall framework for us to develop around. Surry provided user stories and outlined the site’s architecture.
***
Copyright :copyright: 2021 Patrick Gronstal, Tamara Trefilova, Surry Mowery, Kateryna Masiuk
***
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
***
