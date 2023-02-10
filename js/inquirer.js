import inquirer from "inquirer";
import mysql from "mysql2";
import cTable from "console.table";

//CONNECT TO SQL DATABASE
const db = mysql.createConnection(
    {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'password',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
  );

//ARRAYS
const employeeArray = [];
const roleArray = [];
const managerArray = [];

//MENU OPTIONS
const main_menu = [
    {
        type: 'list',
        name: 'main',
        message: 'Choose an option: ',
        choices: ['View All Departments', 'View All Employees', 'View All Roles', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role', 'End Program']
    }
]

//MAIN MENU
function runEmployeeTrax() {
    
    inquirer
        .prompt([...main_menu])
        .then((answer) => {
            if (answer.main === 'View All Departments') {
                console.log(`You chose ${answer.main}!`)
                viewAllDepartments();
            }
            else if (answer.main === 'View All Employees') {
                console.log(`You chose ${answer.main}!`)
                viewAllEmployees();
            }
            else if (answer.main === 'View All Roles') {
                console.log(`You chose ${answer.main}!`)
                viewAllRoles();
            }
            else if (answer.main === 'Add A Department') {
                console.log(`You chose ${answer.main}!`)
                addDepartment();
            }
            else if (answer.main === 'Add A Role') {
                console.log(`You chose ${answer.main}!`)
                addRole();
            }
            else if (answer.main === 'Add An Employee') {
                console.log(`You chose ${answer.main}!`)
                addEmployee();
            }
            else if (answer.main === 'Update An Employee Role') {
                console.log(`You chose ${answer.main}!`)
                updateEmployeeRole();
            }
            else if (answer.main === 'End Program') {
                console.log(`You chose ${answer.main}!`)
                endProgram();
            }
        })
}
//INITIALIZE MAIN MENU
runEmployeeTrax();

//MAIN MENU FUNCTIONS
function updateEmployeeRole() {
    getEmployees();
    getRoles();

    inquirer
        .prompt([
            {
                name: 'lastName',
                type: 'list',
                choices: employeeArray,
                message: "Which employee do you wish to update"
            },
            {
                name: 'newRole',
                type: 'list',
                message: 'Select a new role: ',
                choices: roleArray
            },
        ])
        .then((data) => {
                console.log(data);
        })
}
//     const updateQuestions = [
//         {
//             name: 'update',
//             type: 'list',
//             message: 'Which employee do you wish to update?',
//             choices: employeeArray
//         },
//         {
//             name: 'newRole',
//             type: 'list',
//             message: 'Select a new role: ',
//             choices: roleArray
//         },
//     ]
    
//     inquirer
//         .prompt([...updateQuestions])
//         .then((data) => {
//             var employeeId = employeeArray.indexOf(data.update) + 1;
//             var roleId = roleArray.indexOf(data.newRole) + 1;


//             console.log(employeeId, roleId);
//             //let newParams = [employeeId, roleId];
//             //const params = [newParams];

//             // const sql = `UPDATE employees SET role_id ${employeeId} WHERE id ${roleId}`
//             // db.query(sql, (err, rows) => {
//             //     if (err) {
//             //         throw err; 
//             //     } else {
//             //         console.log('Role updated successfully!')
//             //         viewAllEmployees();
//             //         runEmployeeTrax();
//             //     }
//             // })
//         })
// }

function viewAllDepartments() {
    const sql = `SELECT id, title FROM departments`;

    db.query(sql, (err, rows) => {
        if (err) {
        throw err;
        } else {
            console.table(rows);
            runEmployeeTrax();
        }
    });
}

function viewAllEmployees() {
    const sql = 'SELECT id, first_name, last_name, role_id, manager_id FROM employees';

    db.query(sql, (err, rows) => {
        if (err) {
        throw err;
        } else {
            console.table(rows);
            runEmployeeTrax();
        }
    });
}

function viewAllRoles(){
    const sql = 'SELECT id, title, salary, department_id FROM roles';

    db.query(sql, (err, rows) => {
        if (err) {
        throw err;
        } else {
            console.table(rows);
            runEmployeeTrax();
        }
    });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the name of the department: '
            }
        ])
        .then((data) => {
            console.log(data);
            const sql = `INSERT INTO departments (title)
                VALUES (?)`;
            const params = [data.title];

            db.query(sql, params, (err, rows) => {
                if (err) {
                throw err;
                } else {
                    console.log('New department added successfully.');
                    viewAllDepartments();
                    runEmployeeTrax();
                }
            });
        })
}

function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Enter the name of the role: '
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter the role salary: '
            },
            {
                name: 'department_id',
                type: 'input',
                message: "Enter the ID of this role's department: "
            },
        ])
        .then((data) => {
            console.log(data);
            const sql = `INSERT INTO roles (title, salary, department_id)
            VALUES (?)`;
            let newParams = [data.title, data.salary, data.department_id]
            const params = [newParams];
            db.query(sql, params, (err, rows) => {
                if (err) {
                throw err;
                } else {
                    console.log('New role added successfully.');
                    viewAllRoles();
                    runEmployeeTrax();
                }
            });
        })
}


function addEmployee() {
    const employeeQuestions = [
        {
            name: 'first_name',
            type: 'input',
            message: 'Enter the employees first name: '
        },
        {
            name: 'last_name',
            type: 'input',
            message: 'Enter the employees last name: '
        },
        {
            name: 'role',
            type: 'list',
            message: 'Select a role: ',
            choices: getRoles()
            
        },
        {
            name: 'confirm',
            type: 'confirm',
            message: 'Is this employee a manager?',
        },
    ];

    getRoles();
    getManagers();

    inquirer
        .prompt([...employeeQuestions])
        .then((answers) => {
            inquirer
                .prompt([
                    {
                        when: () => answers.confirm = false,
                        name: 'manager',
                        type: 'list',
                        message: "What is the manager's name? ",
                        choices: getManagers()
                        
                    }
                ])
                .then((data) => {
                    console.log(data);
                    console.log(data.manager);
                    var roleId = roleArray.indexOf(answers.role) + 1;
                    var managerId = managerArray.indexOf(data.manager) + 1;
                    console.log(roleId, managerId);
                    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                        VALUES (?)`;
                    let newParams = [answers.first_name, answers.last_name, roleId, managerId];
                    const params = [newParams];
                    
                    db.query(sql, params, (err, rows) => {
                        if (err) {
                        throw err;
                        } else {
                            console.log('New employee added successfully.');
                            viewAllEmployees();
                            runEmployeeTrax();
                        }
                    });
                })
        })
}


function getRoles() {
    const sql = `SELECT title FROM roles`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else {
            for (let i = 0; i < rows.length; i++) {
                roleArray.push(rows[i].title);
            }
            return roleArray;
        }
    })
}


function getManagers() {
    const sql = `SELECT first_name FROM employees WHERE manager_id IS NULL`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else {
            for (let i = 0; i < rows.length; i++) {
                managerArray.push(rows[i].first_name);
            }
            return managerArray;
        }
    })
}


function getEmployees() {
    const sql = `SELECT first_name FROM employees`
    db.query(sql, (err, rows) => {
        if (err) {
            throw err;
        } else {
            for (let i = 0; i < rows.length; i++) {
                employeeArray.push(rows[i].first_name);
            }
            return employeeArray;
        }
    })
}

function endProgram() {
    db.end();
}