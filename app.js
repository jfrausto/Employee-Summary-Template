const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// import modules and references to output path
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// empty array that gradually adds new members
const teamArray = [];
// write new file with completed templates
const renderHtml = () => {
  const renderedHtml = render(teamArray);
  fs.writeFile(outputPath, renderedHtml, (err) => {
    if (err) throw err;
    console.log("'team.html' has been written! Open the 'output' folder");
  });
};

// checks for string input
const stringValidator = (input) => {
  if (!isNaN(input)) {
    return "Error: Enter a string!";
  } else {
    return true;
  }
};
// checks for integer input
const intValidator = (input) => {
  if (isNaN(input)) {
    return "Error: Enter a number!";
  } else {
    return true;
  }
};

// function that calls itself upon addition of new members
// takes in 'intern' or 'engineer' case
const recursiveAdd = (teamMember) => {
  if (teamMember === "Intern") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your intern's name?",
          name: "name",
          validate: stringValidator,
        },
        {
          type: "input",
          message: "What is your intern's id?",
          name: "id",
          validate: intValidator,
        },
        {
          type: "input",
          message: "What is your intern's email?",
          name: "email",
          validate: stringValidator,
        },
        {
          type: "input",
          message: "What is your intern's school?",
          name: "school",
          validate: stringValidator,
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
            console.log("adding a new intern...");
            recursiveAdd("Intern");
          } else {
            // "engineer"
            console.log("adding a new engineer...");
            recursiveAdd("Engineer");
          }
        } else {
          // CALL RENDER; WE ARE DONE ADDING
          console.log("rendering...");
          renderHtml();
        }
      });
  } else {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is your engineer's name?",
          name: "name",
          validate: stringValidator,
        },
        {
          type: "input",
          message: "What is your engineer's id?",
          name: "id",
          validate: intValidator,
        },
        {
          type: "input",
          message: "What is your engineer's email?",
          name: "email",
          validate: stringValidator,
        },
        {
          type: "input",
          message: "What is your engineer's github username?",
          name: "github",
          validate: stringValidator,
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
        // create from responses
        const newMember = new Engineer(inq.name, inq.id, inq.email, inq.github);
        teamArray.push(newMember);
        // add new member
        // if you want to add either an intern or engineer...
        if (!(inq.addMore === "I don't want to add any more team members.")) {
          if (inq.addMore === "Intern") {
            console.log("adding a new intern...");
            recursiveAdd("Intern");
          } else {
            console.log("adding a new engineer...");
            recursiveAdd("Engineer");
          }
        } else {
          // CALL RENDER; WE ARE DONE ADDING
          console.log("rendering...");
          renderHtml();
        }
      });
  }
};

// script begins here, starts inquirer prompts for Manager
// includes 'validate' property with callback functions
// intValidator and stringValidator
const beginPrompts = () => {
  console.log("Please build your team!");
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your manager's name?",
        name: "name",
        validate: stringValidator,
      },
      {
        type: "input",
        message: "What is your manager's id?",
        name: "id",
        validate: intValidator,
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
        validate: stringValidator,
      },
      {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNum",
        validate: intValidator,
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
      // grab responses and
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
        if (inq.addMore === "Intern") {
          // begin recursion
          recursiveAdd("Intern");
        } else {
          recursiveAdd("Engineer");
        }
      } else {
        // CALL RENDER; WE ARE DONE ADDING
        console.log("rendering...");
        renderHtml();
      }
    });
};
// start script
beginPrompts();
