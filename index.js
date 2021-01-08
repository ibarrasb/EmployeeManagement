require('dotenv').config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { prototype } = require("inquirer/lib/objects/choice");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Employee_Management_db"
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptUser();
  });

function promptUser(){
inquirer
    .prompt([
        {
            name: "res",
            type: "list",
            message: "EMPLOYEE MANAGEMENT SYSTEM",
            message: "What would you like to do? ",
            choices: 
            ["View All Employees",
             "View All Departments",
             "View All Roles",
             "Add Employee",
             "Add Department",
             "Add Roles",
             "Update Employee",
             "Exit"
            ]
        }
    ]).then(function(ans){
        switch(ans.res){
            case "View All Employees":
            showEmployees();
            promptUser();
            break;

            case "View All Departments":
            byDept();
            promptUser();
            break;

            case "View All Roles":
            byRole();
            promptUser();
            break;

            case "Add Employees":
            addEmployee();
            promptUser();
            break;

            case "Add Roles":
            addRole();
            promptUser();
            break;

            case "Add Department":
            addDept();
            promptUser();
            break;

            case "Update Employee":
            upEmployee();
            promptUser();
            break;

            case "Exit":
            connection.end();
            break;
        }
    })

}

function showEmployees(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title FROM role INNER JOIN employee ON employee.role_id = role.id", function(err, res) {
        if (err) throw err;
        console.log("=========================")
        console.table(res)
    })


}

function byDept(){
    connection.query(
        "SELECT department.name, employee.first_name, employee.last_name, employee.role_id FROM employee INNER JOIN department ON department.id = employee.id INNER JOIN role ON role.id = employee.id",
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
}

function byRole(){
    connection.query(
        " ",
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
}

function addEmployee(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "fName",
        message: "Enter employee first name: ",
      },
      {
        type: "input",
        name: "lName",
        message: "Enter last name: ",
      },
      {
        type: "input",
        name: "rid",
        message: "Enter role ID: ",
      },
      {
        type: "input",
        name: "mid",
        message: "Enter manager ID: ",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.fName,
          last_name: answer.lName,
          role_id: answer.rid,
          manager_id: answer.mid,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
    
        }
      );
    });
}

function addRole(){
    inquirer
    .prompt(
        {
      name: "title",
      type: "input",
      message: "What is the title name?",
    },
    {
        name: "salary",
        type: "input",
        message: "What will be the salary?"
    },
    {
        name: "id",
        type: "input",
        message: "What will be the department ID?"
    }
    ).then(function(ans){
        connection.query(
            "INSERT INTO roles SET ?",
            {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.deptID,
            },
    
            function (err, res) {
              if (err) throw err;
              console.table(res);
            }
        );
    });
}

function addDept(){
    inquirer
    .prompt([
      {
        type: "input",
        name: "dept",
        message: "What is the name of the department?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.dept,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
    });

}