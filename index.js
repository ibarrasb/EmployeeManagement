const sql = require("mysql");
const inquirer = require("inquirer");

inquirer
    .prompt([
        {
            name: "res",
            type: "list",
            message: "EMPLOYEE MANAGEMENT SYSTEM",
            message: "What would you like to do? ",
            choices: 
            ["View All Employees",
             "View All Employees by Dept",
             "View All Employees by Manager",
             "Add Employee",
             "Remove Employee"
            ]
        }
    ]).then(function(ans){

        switch(ans.res){
            case "View All Employees":

            break;

            case "View All Employees by Dept":

            break;

            case "View All Employees by Manager":

            break;

            case "Add Employees":

            break;

            case "Remove Employees":

            break;

        }


    })