const inquirer = require('inquirer'); // Importing the inquirer npm package for user prompts/inputs
const Table = require('cli-table'); // Importing the cli-table npm package to upgrade table presentation
const db = require('./db'); // Importing the custom database module

// Manages the main menu presentation and user input
function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then(answer => {
        switch (answer.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Exit':
                console.log('Exiting program.');
                process.exit(0);
        }
    });
}

function viewAllDepartments() {
    // SQL query to select all departments sorted by id
    const sql = 'SELECT * FROM department ORDER by id';
    db.query(sql, (err, results) => {
        if (err) throw err;
        // Creating a table to display department data
        const table = new Table({
            head: ['ID', 'Name']
        });
        // Populating the table with department information
        results.forEach(department => {
            table.push([department.id, department.name]);
        });
        console.log(table.toString());
        mainMenu();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        }
    ]).then(answer => {
        // Inserting the new department into the database
        db.query('INSERT INTO department SET ?', { name: answer.name }, (err) => {
            if (err) throw err;
            console.log('Department added successfully!');
            mainMenu();
        });
    });
}

function viewAllRoles() {
    // SQL query to select all roles with department information sorted by id
    const sql = `
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        INNER JOIN department ON role.department_id = department.id
        ORDER BY role.id    
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        // Creating a table to display role data
        const table = new Table({
            head: ['ID', 'Title', 'Salary', 'Department']
        });
        // Populating the table with role information
        results.forEach(role => {
            table.push([role.id, role.title, role.salary, role.department]);
        });
        console.log(table.toString());
        mainMenu();
    });
}

function addRole() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        // Extracting department names from the results
        const departmentChoices = results.map(department => ({
            name: department.name,
            value: department.id
        }));
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the role:'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Select the department for the role:',
                choices: departmentChoices // Providing the list of department choices
            }
        ]).then(answer => {
            // Inserting the new role into the database
            db.query('INSERT INTO role SET ?', { title: answer.title, salary: answer.salary, department_id: answer.department }, (err) => {
                if (err) throw err;
                console.log('Role added successfully!');
                mainMenu();
            });
        });
    });
}

function viewAllEmployees() {
    // SQL query to select all employees with role and department information sorted by id
    const sql = `
        SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS manager ON employee.manager_id = manager.id
        ORDER BY employee.id    
    `;
    db.query(sql, (err, results) => {
        if (err) throw err;
        // Creating a table to display employee data
        const table = new Table({
            head: ['ID', 'First Name', 'Last Name', 'Role', 'Department', 'Manager']
        });
        // Populating the table with employee information
        results.forEach(employee => {
            table.push([employee.id, employee.first_name, employee.last_name, employee.role, employee.department, employee.manager || 'None']);
        });
        console.log(table.toString());
        mainMenu();
    });
}

function addEmployee() {
    db.query('SELECT * FROM role', (err, roleResults) => {
        if (err) throw err;
        db.query('SELECT * FROM employee', (err, employeeResults) => {
            if (err) throw err;
            // Extracting role titles and employee names for choices
            const roleChoices = roleResults.map(role => ({ name: role.title, value: role.id }));
            const employeeChoices = employeeResults.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id }));
            // Adding an option for null manager
            employeeChoices.push({ name: 'None', value: null });
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'Enter the first name of the employee:'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'Enter the last name of the employee:'
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Select the role for the employee:',
                    choices: roleChoices // Providing the list of role choices
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Select the manager for the employee:',
                    choices: employeeChoices // Providing the list of employee choices
                }
            ]).then(answer => {
                // Inserting the new employee into the database
                db.query('INSERT INTO employee SET ?', { first_name: answer.firstName, last_name: answer.lastName, role_id: answer.roleId, manager_id: answer.managerId }, (err) => {
                    if (err) throw err;
                    console.log('Employee added successfully!');
                    mainMenu();
                });
            });
        });
    });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Enter the ID of the employee whose role you want to update:'
        },
        {
            type: 'input',
            name: 'newRoleId',
            message: 'Enter the ID of the new role:'
        }
    ]).then(answer => {
        // Updating the employee's role in the database
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answer.newRoleId, answer.employeeId], (err) => {
            if (err) throw err;
            console.log('Employee role updated successfully!');
            mainMenu();
        });
    });
}

mainMenu();