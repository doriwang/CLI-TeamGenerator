const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = []

inquirer.prompt([{
        type: "input",
        name: "build",
        message: "Please build your team via CLI"
    },
    {
        type: "input",
        name: "name",
        message: "What's your manager's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What's your manager's id number?"
    },
    {
        type: "input",
        name: "email",
        message: "What's your manager's Email?"
    },
    {
        type: "input",
        name: "manager",
        message: "What's your manager's office number?"
    },
    {
        type: "checkbox",
        name: "role",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "No more team members to add"
        ]
    }
]).then(data => {
    createManager(data)
    evaluateRole(data)
})

function createManager(data) {
    const manager = new Manager(data.name, data.id, data.email, data.manager)
    employees.push(manager)
    console.log(employees)
}

function cerateEngineer() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What's your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What's your engineer's id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What's your engineer's Email?"
        },
        {
            type: "input",
            name: "github",
            message: "What's your engineer's GitHub username?"
        },
        {
            type: "checkbox",
            name: "role",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "No more team members to add"
            ]
        }
    ]).then(data => {
        const engineer = new Engineer(data.name, data.id, data.email, data.github)
        employees.push(engineer)
        console.log(employees)
        evaluateRole(data)
    })
}

function createIntern() {
    inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What's your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What's your intern's id number?"
        },
        {
            type: "input",
            name: "email",
            message: "What's your intern's Email?"
        },
        {
            type: "input",
            name: "school",
            message: "What's your intern's school?"
        },
        {
            type: "checkbox",
            name: "role",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "No more team members to add"
            ]
        }
    ]).then(data => {
        const intern = new Intern(data.name, data.id, data.email, data.school)
        employees.push(intern)
        console.log(employees)
        evaluateRole(data)
    })
}

function evaluateRole(data) {
    if (data.role == "Engineer") {
        cerateEngineer()
    } else if (data.role == "Intern") {
        createIntern()
    } else {
        fs.writeFileSync(outputPath, render(employees), "utf-8")
    }
}