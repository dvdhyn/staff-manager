# Module 3 Challenge


## Table of Contents
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Process](#process)
* [Demonstration](#demonstration)

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```


## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Process

This week we were not given starter code. 
Programs used to handle queries / manage database: MySQL Workbench, MAMP, Node.js
npm package dependencies: 
inquirer@8.2.4 - prompts user using command-line
mysql2 - connects to SQL database through JavsScript
cli-table - gives tables upgraded look in command-line interface

Before running the script, install any dependencies with "npm install" first.
To invoke the CLI, use command "node index.js".
Use the arrow keys and enter to nagivate through the interface.


## Demonstration
https://app.screencastify.com/v3/watch/AgvI75amNUY5szLl1T7f