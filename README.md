# EDUCATION REPORT README
[Deployed Heroku Education App](https://dry-wave-18780.herokuapp.com/)

#### To test this:
1. Register a teacher
2. Register a student, using their teacher's email
3. Register a parent, using their student's email

Once logged in, you will be directed to either the teacher view, student view or parent view. 

#### Teachers will be able to:
- create assignments and assign them to their students
- view their students and all of their assignments
- grade assignments
- delete assignments
- search assignments via title or content

#### Students will be able to:
- view all of their assignments
- view their overall grade
- view the grades for all of their assignments
- submit assignments and check assignment status

#### Parents will be able to:
- view their student's overall grade
- view all of their student's assignments
- view the grades for their student's assignments

***
#### Assignment Routes:
| **`HTTP` request** | **route** |
| :---: | ---:|
| `POST` | `assignments/student/grades` |
| `POST` | `assignments/submit` |
| `POST` | `assignments/updateAndSubmit` |
| `POST` | `/assignments/grade` |
| `POST` | `assignments/delete` |
| `POST` | `assignments` |
| `GET` | `assignments/search` |
| `GET` | `assignments` |
| `GET` | `assignments/assignmentsForStudent` |
| `GET` | `assignments/assignmentsForParent` |
| `GET` | `assignments/student/grades/:id` |
| `GET` | `assignments/:id` |

#### Assignment DAOs:
| DAO |
| ---: |
| `createAssignment` |
| `updateAssignment` |
| `deleteAssignment` |
| `getAllAssignments` |
| `getAssignment` |
| `getAssignmentByStudentId` |
| `getAvgGradeByStudentId` |
| `gradeAssignment` |
| `submitAssignment` |
| `createAssignment` |
| `search` |
| `partialSearch` |


#### User Routes:
| **`HTTP` request** | **route** |
| :---: | ---:|
| `GET` | `/users` |
| `POST` | `/users/signup` |
| `POST` | `/users/login` |
| `POST` | `/users/logout` |
| `GET` | `/users/student/:id` |
| `GET` | `/users/getAllStudents` |

#### User DAOs:
| DAO |
| ---: |
| `getUser` |
| `updateUserPassword` |
| `createUser` |
| `getUserById` |
| `getStudentById` |
| `getStudentByEmail` |
| `getAllStudents` |

***
#### Introduction
Students, Teachers, and Parents need to be in communication about grades. Using JavaScript, it is possible to create a portal for up-to-date assignment reports. By creating this as a web application, these three groups can have a better time engaging in the learning process.

Teachers should be able to monitor their various classes and assignments. Students should be able to see their grades as well as upcoming/ungraded assignments. Parents should be able to see their students’ grades and assignments.

To solve this, we have created an MVC style JavaScript application, using MongoDB, Express, Node.js, Mustache and Bootstrap.

***
#### Credits
Copyright :copyright: 2021 Patrick Gronstal, Tamara Trefilova, Surry Mowery, Kateryna Masiuk

***
#### License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
