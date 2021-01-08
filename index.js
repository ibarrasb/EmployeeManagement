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
             "Add roles",
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

            case "Remove Employees":
            removeEmployee();
            promptUser();
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

    // inquirer.prompt([
    //     {
    //         name: "dept",
    //         type: "list",
    //         message: "Which department would you like to view? ",
    //         choices: 
    //         ["IT",
    //          "Production",
    //          "Engineering",
    //          "Accounting",
    //          "Sales"
    //         ]
    //     }
    // ]).then(function(ans){

    //     switch(ans.dept){

    //         case 'IT':

    //         break;

    //         case 'Production':

    //         break;

    //         case 'Engineering':
                
    //         break;

    //         case 'Accounting':
                
    //         break;

    //         case 'Sales':
                
    //         break;
    //     }
    // })

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