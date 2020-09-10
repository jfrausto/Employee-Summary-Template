const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const recursiveAdd = (teamMember) => {
  if (teamMember === "Intern") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your intern's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is your intern's id?",
          name: "id",
        },
        {
          type: "input",
          message: "What is your intern's email?",
          name: "email",
        },
        {
          type: "input",
          message: "What is your intern's school?",
          name: "school",
        },
        {
          type: "list",
          message: "Which type of team member would you like to add?",
          name: "addMore",
          choices: [
            "Intern",
            "Engineer",
            "I don't want to add any more team members.",
          ],
        },
      ])
      .then((inq) => {
        const newMember = new Intern(inq.name, inq.id, inq.email, inq.school);
        teamArray.push(newMember);
        if (!(inq.addMore === "I don't want to add any more team members.")) {
          if (inq.addMore === "Intern") {
            console.log("I'm adding a new intern...");
            recursiveAdd("Intern");
          } else {
            // "engineer"
            console.log("I'm adding a new engineer...");
            recursiveAdd("Engineer");
          }
        } else {
          // all done
          // CALL RENDER; WE ARE DONE ADDING
          console.log("We are done adding members!");
          teamArray.forEach((employee) => {
            console.log(`${employee.name}: ${employee.id}: ${employee.email}`);
          });
        }
      });
  } else {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your engineer's name?",
          name: "name",
        },
        {
          type: "input",
          message: "What is your engineer's id?",
          name: "id",
        },
        {
          type: "input",
          message: "What is your engineer's email?",
          name: "email",
        },
        {
          type: "input",
          message: "What is your engineer's github username?",
          name: "github",
        },
        {
          type: "list",
          message: "Which type of team member would you like to add?",
          name: "addMore",
          choices: [
            "Intern",
            "Engineer",
            "I don't want to add any more team members.",
          ],
        },
      ])
      .then((inq) => {
        const newMember = new Engineer(inq.name, inq.id, inq.email, inq.github);
        teamArray.push(newMember);
        if (!(inq.addMore === "I don't want to add any more team members.")) {
          if (inq.addMore === "Intern") {
            console.log("I'm adding a new intern...");
            recursiveAdd("Intern");
          } else {
            // "engineer"
            console.log("I'm adding a new engineer...");
            recursiveAdd("Engineer");
          }
        } else {
          // all done
          // CALL RENDER; WE ARE DONE ADDING
          console.log("We are done adding members!");
          teamArray.forEach((employee) => {
            console.log(`${employee.name}: ${employee.id}: ${employee.email}`);
          });
        }
      });
  }
};

const beginPrompts = () => {
  console.log("Please build your team");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "name",
      },
      {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNum",
      },
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "addMore",
        choices: [
          "Intern",
          "Engineer",
          "I don't want to add any more team members.",
        ],
      },
    ])
    .then((inq) => {
      // create a Manager object
      const newManager = new Manager(
        inq.name,
        inq.id,
        inq.email,
        inq.officeNum
      );
      // push manager into running array of employees
      teamArray.push(newManager);
      if (!(inq.addMore === "I don't want to add any more team members.")) {
        // add either an intern or an engineer
        console.log("I DO WANT TO ADD MORE");
        if (inq.addMore === "Intern") {
          console.log("I chose an intern");
          recursiveAdd("Intern");
        } else {
          console.log("I chose an engineer");
          recursiveAdd("Engineer");
        }
      } else {
        console.log("I SAID I don't want to add any more team members.");
        console.log("We are done adding members!");
        teamArray.forEach((employee) => {
          console.log(`${employee.name}: ${employee.id}: ${employee.email}`);
        });
        // CALL RENDER FUNCTION HERE WITH ONLY THE MANAGER POPULATED.
      }
    });
};

beginPrompts();
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
