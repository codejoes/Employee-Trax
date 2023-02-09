import express from 'express';
import inquirer from 'inquirer';
import mysql from 'mysql2';
//import inquirer_file from './js/inquirer';

const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employees_db'
  },
  console.log('Connected to the employees_db database.')
);

//View All Departments
app.get('/api/departments', (req, res) => {
  const sql = 'SELECT id, title FROM departments';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
        return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

//View All Roles
app.get('/api/roles', (req, res) => {
  const sql = 'SELECT id, title, salary, department_id FROM roles';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
        return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

//View All Departments
app.get('/api/employees', (req, res) => {
  const sql = 'SELECT id, first_name, last_name, role_id, manager_id FROM employees';

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({error: err.message});
        return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

//Add A Department
app.post('/api/new-department', ({body}, res) => {
  const sql = `INSERT INTO departments (title)
    VALUES (?)`;
  const params = [body.title];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
        return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

//Add A Role
app.post('/api/new-role', ({body}, res) => {
  const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?)`;
  let newParams = [body.title, body.salary, body.department_id]
  const params = [newParams];
  console.log(body);
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
        return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

//Add A New Employee
app.post('/api/new-employee', ({body}, res) => {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?)`;
  let newParams = [body.first_name, body.last_name, body.role_id, body.manager_id];
  const params = [newParams];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({error: err.message});
        return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});





















// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  