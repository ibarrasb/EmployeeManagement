
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { prototype } = require("inquirer/lib/objects/choice");

//Creates connection to mySQL DB using local host
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Employee_Management_db"
  });

  //once there is a connection, starts program
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    promptUser();
  });

//asks user what they would like to do
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

        //takes reponse, and executes what they want to do
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

            case "Add Employee":
            addEmployee();
            break;

            case "Add Roles":
            addRole();
            break;

            case "Add Department":
            addDept();
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

//shows all employees in the db
function showEmployees(){
    connection.query("SELECT employee.first_name, employee.last_name, role.title FROM role INNER JOIN employee ON employee.role_id = role.id", function(err, res) {
        if (err) throw err;
        console.log("=========================")
        console.table(res)
    })


}
//shows name of all departments
function byDept(){
    connection.query(
        "SELECT department.name, employee.first_name, employee.last_name, employee.role_id FROM employee INNER JOIN department ON department.id = employee.id INNER JOIN role ON role.id = employee.id",
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
}
//shows employees by role
function byRole(){
    connection.query(
        " ",
        function (err, res) {
          if (err) throw err;
          console.table(res);
        }
      );
}

//function to add employee to db
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
          promptUser();
    
        }
      );
    });
}
//function to add roles into db
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
              promptUser();
            }
        );
    });
}
//adds a new department to db
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
          promptUser();
        }
      );
    });

}