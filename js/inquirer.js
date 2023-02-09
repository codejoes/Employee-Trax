import inquirer from "inquirer";

const main_menu = [
    {
        type: 'list',
        name: 'main',
        message: 'Choose an option: ',
        choices: ['View All Departments', 'View All Employees', 'View All Roles', 'Add A Department', 'Add A Role', 'Add An Employee', 'Update An Employee Role']
    }
]


function runEmployeeTrax() {
    inquirer
        .prompt([...main_menu])
        // .then((answer) => {
        //     console.log(answer);
        // })
        .then((answer) => {
            if (answer.main === 'View All Departments') {
                console.log(`You chose ${answer.main}!`)
            }
        })
}
runEmployeeTrax();