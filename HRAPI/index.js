const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('Welcome To HR API');
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/emp',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/empTotal',async(req,res)=>{
    try{
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/countriesTotal',async(req,res)=>{
    try{
        const result = await pool.query('select count(country_id) from countries');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/regionTotal',async(req,res)=>{
    try{
        const result = await pool.query('select count(region_id) from regions');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/departmentsTotal',async(req,res)=>{
    try{
        const result = await pool.query('select count(department_id) from departments');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});


app.get('/jobsTotal',async(req,res)=>{
    try{
        const result = await pool.query('select count(job_id) from jobs');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/employeed',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, l.street_address, l.city, l.state_province, c.country_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON l.location_id = d.location_id INNER JOIN countries c ON c.country_id = l.country_id limit 5;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jobhistory',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, jh.job_id from employees e RIGHT JOIN job_history jh ON jh.employee_id = e.employee_id limit 5;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/empjob',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, jh.job_id from employees e LEFT JOIN job_history jh ON jh.employee_id = e.employee_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/empjobd',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, jh.job_id, d.department_name from employees e LEFT JOIN job_history jh ON jh.employee_id = e.employee_id INNER JOIN departments d ON e.department_id = d.department_id limit 2; ');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/empjdl',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, jh.job_id, d.department_name, l.street_address, l.city from employees e LEFT JOIN job_history jh ON jh.employee_id = e.employee_id INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON d.location_id = l.location_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/empjobc',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, jh.job_id, c.country_name from employees e LEFT JOIN job_history jh ON jh.employee_id = e.employee_id INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON d.location_id = l.location_id INNER JOIN countries c ON l.country_id = c.country_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jobed',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, jh.job_id, d.department_name FROM job_history jh INNER JOIN employees e ON e.employee_id = jh.employee_id INNER JOIN departments d ON d.department_id = jh.department_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jobej',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, jh.start_date, jh.end_date, j.job_title FROM job_history jh INNER JOIN employees e ON e.employee_id = jh.employee_id INNER JOIN jobs j ON j.job_id = jh.job_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/jobejd',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, j.job_title, d.department_name FROM job_history jh INNER JOIN employees e ON jh.employee_id = e.employee_id INNER JOIN departments d ON d.department_id = jh.department_id INNER JOIN jobs j ON j.job_id = jh.job_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jobejl',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, j.job_title, l.street_address FROM job_history jh INNER JOIN employees e ON jh.employee_id = e.employee_id INNER JOIN departments d ON d.department_id = jh.department_id INNER JOIN jobs j ON j.job_id = jh.job_id INNER JOIN locations l ON l.location_id = d.location_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jobejc',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, j.job_title, c.country_name FROM job_history jh INNER JOIN employees e ON jh.employee_id = e.employee_id INNER JOIN departments d ON d.department_id = jh.department_id INNER JOIN jobs j ON j.job_id = jh.job_id INNER JOIN locations l ON l.location_id = d.location_id INNER JOIN countries c ON c.country_id = l.country_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/rcl',async(req,res)=>{
    try{
        const result = await pool.query('SELECT l.street_address, l.city, c.country_name, r.region_name FROM locations l INNER JOIN countries c ON l.country_id = c.country_id INNER JOIN regions r ON r.region_id = c.region_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/crl',async(req,res)=>{
    try{
        const result = await pool.query('SELECT c.country_name, r.region_name, l.street_address FROM locations l RIGHT JOIN countries c ON c.country_id = l.country_id INNER JOIN regions r ON r.region_id = c.region_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/lcr',async(req,res)=>{
    try{
        const result = await pool.query('SELECT c.country_name, r.region_name, l.street_address FROM locations l LEFT JOIN countries c ON l.country_id = c.country_id INNER JOIN regions r ON r.region_id = c.region_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/del',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, d.department_name, l.city FROM departments d LEFT JOIN employees e ON e.department_id = d.department_id INNER JOIN locations l ON d.location_id = l.location_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/edlc',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, d.department_name, l.city, c.country_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON l.location_id = d.location_id INNER JOIN countries c ON c.country_id = l.country_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/emdl',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name as employee_first_name, e.last_name as employee_last_name, m.first_name as manager_first_name, m.last_name as manager_last_name, d.department_name, l.city FROM employees e INNER JOIN employees m ON e.manager_id = m.employee_id INNER JOIN departments d ON d.department_id = e.department_id INNER JOIN locations l ON d.location_id = l.location_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/ejdl',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, j.job_title, d.department_name, l.city from employees e INNER JOIN jobs j ON e.job_id = j.job_id INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON d.location_id = l.location_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/ejdm',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name as employee_first_name, e.last_name as employee_last_name, m.first_name as manager_first_name, m.last_name as manager_last_name, j.job_title, d.department_name FROM employees e INNER JOIN employees m ON e.manager_id = m.employee_id INNER JOIN jobs j ON e.job_id = j.job_id INNER JOIN departments d ON e.department_id = d.department_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
}); 

app.get('/ejdml',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name as employee_first_name, e.last_name as employee_last_name, m.first_name as manager_first_name, m.last_name as manager_last_name, j.job_title, d.department_name, l.city FROM employees e INNER JOIN employees m ON e.manager_id = m.employee_id INNER JOIN jobs j ON e.job_id = j.job_id INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON d.location_id = l.location_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/cr',async(req,res)=>{
    try{
        const result = await pool.query('SELECT country_id, country_name, region_id FROM countries WHERE region_id = 1 limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/dc',async(req,res)=>{
    try{
        const result = await pool.query('SELECT d.department_name, l.city FROM departments d INNER JOIN locations l ON d.location_id = l.location_id WHERE city LIKE N% limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/edme',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name as employee_first_name, e.last_name as employee_last_name, m.first_name as manager_first_name, m.last_name as manager_last_name, m.commission_pct as manager_commission_pct FROM employees e INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN employees m ON d.manager_id = m.employee_id WHERE m.commission_pct > 0.15 limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/jem',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, j.job_title FROM employees e INNER JOIN jobs j ON e.job_id = j.job_id INNER JOIN departments d ON d.department_id = e.department_id WHERE d.manager_id = e.employee_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/asia',async(req,res)=>{
    try{
        const result = await pool.query(`SELECT l.street_address, l.city, c.country_id, r.region_name FROM locations l INNER JOIN countries c ON l.country_id = c.country_id INNER JOIN regions r ON c.region_id = r.region_id WHERE r.region_name LIKE 'Asia';`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});



app.get('/de',async(req,res)=>{
    try{
        const result = await pool.query('SELECT d.department_id, d.department_name FROM departments d INNER JOIN employees e ON d.department_id = e.department_id WHERE e.commission_pct < (SELECT AVG(commission_pct) FROM employees) limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/je',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, e.salary, j.job_title FROM employees e INNER JOIN jobs j ON e.job_id = j.job_id WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id) limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/empd',async(req,res)=>{
    try{
        const result = await pool.query('SELECT employee_id, first_name, last_name FROM employees WHERE department_id IS NULL limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/ej',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name FROM employees e INNER JOIN (SELECT employee_id FROM job_history GROUP BY employee_id HAVING COUNT(employee_id) > 1) jh ON e.employee_id = jh.employee_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/ced',async(req,res)=>{
    try{
        const result = await pool.query('SELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/ts',async(req,res)=>{
    try{
        const result = await pool.query('SELECT j.job_id, j.job_title, SUM(e.salary) AS total_salary FROM employees e INNER JOIN jobs j ON e.job_id = j.job_id GROUP BY j.job_id, j.job_title limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/cp',async(req,res)=>{
    try{
        const result = await pool.query('SELECT d.department_id, d.department_name, AVG(e.commission_pct) AS avg_commission_pct, COUNT(e.employee_id) AS employee_count FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_id, d.department_name limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/ms',async(req,res)=>{
    try{
        const result = await pool.query('SELECT c.country_id, c.country_name, MAX(e.salary) AS max_salary from employees e INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON l.location_id = d.location_id INNER JOIN countries c ON c.country_id = l.country_id GROUP BY c.country_id, c.country_name limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/ez',async(req,res)=>{
    try{
        const result = await pool.query('FROM employees e INNER JOIN departments d ON d.department_id = employee_id INNER JOIN locations l ON d.location_id = l.location_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/ea',async(req,res)=>{
    try{
        const result = await pool.query(`SELECT e.first_name, e.last_name, j.job_title, d.department_name, jh.start_date FROM job_history jh INNER JOIN employees e ON e.employee_id = jh.employee_id INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN jobs j ON j.job_id = e.job_id WHERE jh.start_date >= '1993-01-01' AND end_date <= '1997-08-31';`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/cd',async(req,res)=>{
    try{
        const result = await pool.query(`SELECT c.country_name, l.city, COUNT(d.department_id) AS number_of_departments FROM countries c INNER JOIN locations l ON c.country_id = l.country_id INNER JOIN departments d ON l.location_id = d.location_id INNER JOIN employees e ON d.department_id = e.department_id GROUP BY c.country_name, l.city HAVING COUNT(e.employee_id) >= 2 limit 2;`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/dfl',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, j.job_title, jh.start_date, jh.end_date FROM employees e INNER JOIN jobs j ON e.job_id = j.job_id INNER JOIN job_history jh ON j.job_id = jh.job_id WHERE e.commission_pct IS NULL limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/eid',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, c.country_name FROM employees e INNER JOIN departments d ON e.department_id = d.department_id INNER JOIN locations l ON d.location_id = l.location_id INNER JOIN countries c ON c.country_id = l.country_id limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/did',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.first_name, e.last_name, e.salary, d.department_id FROM employees e INNER JOIN departments d ON e.department_id = d.department_id WHERE e.salary = (SELECT MIN(salary) FROM employees WHERE department_id = e.department_id) limit 2;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/all',async(req,res)=>{
    try{
        const result = await pool.query('SELECT * FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 2 ;');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/fls',async(req,res)=>{
    try{
        const result = await pool.query('SELECT e.employee_id, e.first_name, e.last_name, e.salary FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees) AND e.department_id IN (SELECT department_id FROM employees WHERE first_name LIKE '%J%' OR last_name LIKE '%J%');');
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});
app.get('/flt',async(req,res)=>{
    try{
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name, j.job_title, l.city FROM employees e INNER JOIN jobs j ON e.job_id = j.job_id INNER JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id WHERE l.city = 'Toronto';`);
        res.json(result.rows);
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});















const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`connect Successfully...on Port ${PORT}`);
});
