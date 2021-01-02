const mysql = require("mysql");
const inquirer = require("inquirer");

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
             "View All Employees by Dept",
             "View All Employees by Manager",
             "Add Employee",
             "Remove Employee"
            ]
        }
    ]).then(function(ans){

        switch(ans.res){
            case "View All Employees":
            showEmployees();
            promptUser();
            break;

            case "View All Employees by Dept":
            byDept();

            break;

            case "View All Employees by Manager":

            break;

            case "Add Employees":

            break;

            case "Remove Employees":

            break;

        }


    })

}

function showEmployees(){
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;

        for(var i = 0; i < res.length; i++){
        
            console.log(`${res[i].first_name} ${res[i].last_name}`);
            console.log('========================================');
        }
    
    })


}

function byDept(){

    inquirer.prompt([
        {
            name: "dept",
            type: "list",
            message: "Which department would you like to view? ",
            choices: 
            ["IT",
             "Production",
             "Engineering",
             "Accounting",
             "Sales"
            ]
        }
    ]).then(function(ans){

        switch(ans.dept){

            case 'IT':

            break;

            case 'Production':

            break;

            case 'Engineering':
                
            break;

            case 'Accounting':
                
            break;

            case 'Sales':
                
            break;
        }
    })

}