// Series of npm packages that we will use to give our server useful functionality
const mysql = require("mysql");
const inquirer = require("inquirer");
// i use console.table to print MySQL rows to the console
const cTable = require("console.table");
require("dotenv").config()

// i use createConections to create conections with MySQL
// i have a locahost, port, user , password and database.. to conect databases with MySql Workbench
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employees_datebase"
});

// I conect my Sql server and the database
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

// Prompt the user for input using inquirer
// The prompt() method returns the input value if the user clicks "OK". If the user clicks "cancel" the method returns nul
// After nmp install if you use node server.js in comand line will show you the list below and if you press the up arrow or down arrow
// you can choose any action (press enter to choose one )
function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "Choose between the given choices",
        choices: [
            "View employees",
            "Add employee",
            "Remove employee",
            "Update employee role",
            "View roles",
            "Add role",
            "Remove role",
            "View departments",
            "Add department",
            "Remove department",
            "Exit"
        ]

    })
    // so then the function have a parameter answer
    // and he will switch to answer.action 
    // and var query = "SELECT * FROM employee"; 
    // will show me the employee list 
   
        .then(function (answer) {
            switch (answer.action) {
                case "View employees":
                    var query = "SELECT * FROM employee";
                    connection.query(query, function (err, res) {
                        console.table(res);
                        runSearch();
                    });

                    break;

                case "View roles":
                    employeeRole();
                    break;


                case "View departments":
                    var query = "SELECT * FROM department";
                    connection.query(query, function (err, res) {
                        console.table(res)
                        runSearch();
                    });

                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "Remove employee":
                    removeEmployee()
                    break;


                case "Update employee role":
                    updateEmployeeRool();
                    break;


                case "Add department":
                    addDepartment();
                    break;


                case "Remove department":
                    removeDepartment();
                    break;


                case "Add role":
                    addRole();
                    break;


                case "Remove role":
                    removeRole();
                    break;


                case "Exit":
                    console.log("You have a nide day!")
                    connection.end();

                    break;

            }
        });
}

function employeeRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        console.table(res)
        runSearch();
    });
}

function addEmployee() {
    inquirer.prompt([{
        name: "first_name",
        type: "input",
        message: "Enter first name"
    }, {
        name: "last_name",
        type: "input",
        message: "Enter last name"
    }, {
        name: "role_id",
        type: "number",
        message: "Enter role id number"
    }, {
        name: "manager_id",
        type: "input",
        message: "Enter manager id"
    }])
        .then(function (answer) {
            var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`;
            var values = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id];
            connection.query(query, values, function (err, res) {
                var check = "SELECT * FROM employee";
                connection.query(check, function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });
        });
};

function addRole() {
    inquirer.prompt([{
        name: "title",
        type: "input",
        message: "Enter role title"
    }, {
        name: "salary",
        type: "number",
        message: "Enter salary amount"
    }, {
        name: "department_id",
        type: "number",
        message: "Enter department id "
    }])
        .then(function (answer) {
            var query = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
            var values = [answer.title, answer.salary, answer.department_id];
            connection.query(query, values, function (err, res) {
                var check = "SELECT * FROM role";
                connection.query(check, function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });
        })
};


function addDepartment() {
    inquirer.prompt([{
        name: "name",
        type: "input",
        message: "Enter department name"
    }])
        .then(function (answer) {
            var query = `INSERT INTO department (name) VALUES (?)`;
            var values = [answer.name];
            connection.query(query, values, function (err, res) {
                var check = "SELECT * FROM department";
                connection.query(check, function (err, res) {
                    console.table(res);
                    runSearch();
                });
            });
        })
};

function removeEmployee() {
    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, res) {
        if (err) throw error;
        const New = res.map(array => {
            var ob = {
                name: `${array.first_name} ${array.last_name}`,
                value: array.id
            }
            return ob
        });
        inquirer.prompt({
            name: "delete",
            type: "list",
            message: "Delete employee",
            choices: New
        })
            .then(function (response) {
                connection.query("DELETE FROM employee WHERE id=?;", [response.delete], function (err, res) {
                    if (err) throw err;
                    runSearch();
                });

            });
    });
};

function updateEmployeeRool() {
    connection.query("SELECT id, first_name, last_name FROM employee;", function (err, res) {
        if (err) throw err;
        const New = res.map(array => {
            var ob = {
                name: `${array.first_name} ${array.last_name}`,
                value: array.id
            }
            return ob
        });
        inquirer.prompt({
            name: "update",
            type: "list",
            message: "Update Employee",
            choices: New
        })
            .then(function (response) {
                connection.query("SELECT id, title FROM role;", function (err, res) {
                    if (err) throw err;
                    const empl = res.map(array => {
                        var ob = {
                            name: array.title,
                            value: array.id
                        }
                        return ob
                    });
                    inquirer.prompt({
                        name: "roleUpdate",
                        type: "list",
                        message: "Do you want to update the employee's new role?",
                        choices: empl
                    }).then(function (answer) {
                        let values = [answer.roleUpdate, response.update];
                        connection.query("UPDATE employee SET role_id = ? WHERE id=?", values, function (err, res) {
                            if (err) throw err;

                            connection.query("SELECT * FROM employee WHERE id=?", response.update, function (err, res) {
                                if (err) throw err;
                                console.table(res);
                                runSearch();
                            }
                            );
                        })
                    })
                })
            })
    });
};






function removeDepartment() {
    connection.query("SELECT id, name FROM department;", function (err, res) {
        if (err) throw err;
        const New = res.map(array => {
            var ob = {
                name: `${array.name}`,
                value: array.id
            }
            return ob
        });
        inquirer.prompt({
            name: "delete",
            type: "list",
            message: "Delete Deparment",
            choices: New
        })
            .then(function (response) {
                connection.query("DELETE FROM department WHERE id=?;", [response.delete], function (err, res) {
                    if (err) throw err;
                    runSearch();
                }
                );
            })
    })
};

function removeRole() {
    connection.query("SELECT id, title FROM role;", function (err, res) {
        if (err) throw err;
        const New = res.map(array => {
            var ob = {
                name: `${array.title}`,
                value: array.id
            }
            return ob
        });
        inquirer.prompt({
            name: "delete",
            type: "list",
            message: "Delete department",
            choices: New
        })
            .then(function (response) {
                connection.query("DELETE FROM role WHERE id=?;", [response.delete], function (err, res) {
                    if (err) throw err;
                    runSearch();
                }
                );
            })
    })
};
