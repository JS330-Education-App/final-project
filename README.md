# EDUCATION REPORT README
[Deployed Heroku Education App](https://dry-wave-18780.herokuapp.com/)

#### Introduction
Students, Teachers, and Parents need to be in communication about grades. Using JavaScript, it is possible to create a portal for up-to-date assignment reports. By creating this as a web application, these three groups can have a better time engaging in the learning process.

Teachers should be able to monitor their various classes and assignments. Students should be able to see their grades as well as upcoming/ungraded assignments. Parents should be able to see their students’ grades and assignments.

To solve this, we have created an MVC style JavaScript application, using MongoDB, Express, Node.js, Mustache and Bootstrap.

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

#### Team’s approach and results
Surry
We started by calling out the items that we wanted to work on -- examples: initial repo setup, starting models/DAOs/routes, UI mockups and Jest tests. Organically we ended up "specializing" in certain areas and continued down these paths -- one person worked on the back-end, one person did the UI, one person connected the back-end with the front-end and the other did the operations tasks (deploying, setting up deployed DB, etc.). We also had group calls several days a week to discuss open items and connected regularly via Slack. This setup worked well and we were very productive.

Tamara
We tried to define all requirements and discussed them thoroughly before starting implementation. We met on a regular basis and kept discussing our implementation process. I think regular meetings helped a lot. As a result, we have a workable application. The app is not ideal of course, but we learned a lot: how to collaborate, how to share responsibility. We decided to split work and tasks among team members, like backend work, UI work, integration work (connecting UI and backend), and project setup and infrastructure, deployment. Every team member was responsible for his/her own piece of work. It helped to reduce the number of conflicts during merges. Of course, almost everyone worked on different pieces of the project but was able to jump in and help with any incoming issues.

Kate
Our team showed a great result as a team of developers. We have been following Agile methodology to break our tasks. As the result, we have implemented planned tasks and made a presentation of the working app.

#### What worked well
Surry
Our team! We naturally got along and wanted to contribute.
Communication: We had regular group calls and chatted via Slack.
Members specializing in certain areas: This helped instill ownership and compartmentalize our work within the group.

Tamara
I liked how we split tasks, how we did meetings, how we discussed everything and made decisions. That is very exciting to see from where the result is coming and realize that you did that together.

Kate
Nothing to change, all was good.

#### Learnings
Surry
- Keep the UI light and flexible, making adjustments as you go. The UI was a little complicated at first, but we adjusted and scaled back appropriately.
- Establish a routine of checking all pages, functionality, tests and restarting the server before every commit, to ensure something else doesn't break.
- Let the team know before you push a commit to the repo, just so they're aware. Also, let the team know what you pushed out. Merge conflicts can be tricky to resolve.
- Keep commits small. Large commits increase the risk of merge conflicts.
- Start with a small, fully-functional prototype that also works via the UI (if needed), and expand from there.
- Spend a lot of time planning out the models/DAOs/routes before starting on them.
- Make sure everyone is regularly testing out the whole site, so they know how it works and we're all in sync.

Tamara
- How to work as a team when every team member has different experience and background. How to listen to, how to accept different ideas. Planning process, implementation, time, and project management, collaboration.
- Ask for feedback more often. Pull requests and code reviews.
- I think we could implement more complicated functionality. For example - every parent could have more kids as students; assignments functionality could be more usable. Because of lack of time and a full-time job it was a bit challenging.

Kate
I have learned to work as a team with my course co-students. I liked this idea because we learn from each other and from every result we get. In Ukraine, I was taking master's in Civil Engineering, and a lot of course projects were done in small teams or pairs. So, I liked this idea a lot.


***
#### Credits
Copyright :copyright: 2021 Patrick Gronstal, Tamara Trefilova, Surry Mowery, Kateryna Masiuk

***
#### License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
