1)-->to open the postgresql cli , we have to search for the psql and then we have to open it

2)"\l" -->this shows the list of the existing databases in cmd line

3)CREATE DATABASE TEST-->used to create a database

4)\c db_name-->it is used to switch to a database and connect in psql

5)SELECT datname FROM pg_database;--->it gives the total number of databases present

6)DROP database db_name;-->its used to delete a database

7)CREATE TABLE person(
id INT,
name VARCHAR(100),
city VARCHAR(100)
);---->used for creating a table

8)Adding data into Table
INSERT INTO person (id,name,city) VALUES (202,'Raju','Delhi');
INSERT INTO person VALUES (201,'Raju','Delhi');

9)Reading data from a table
select <coloumn name> from table_name;
select \* from table_name;

10)Updating data
Modify/update a table
UPDATE table_name
SET name='London'
WHERE id=101;

11. Delete data from a table
    DELETE FROM table_name
    WHERE name="Raju";

12)DATA TYPES-->INT,DOUBLE,FLOAT,DECIMAL,VARCHAR,DATE,BOOLEAN

13)Constraint
Primary Key--->uniquely identifies each record in a table,must conatin UNIQUE value cannot be NULL
NOT NULL--->it makes the null cannot be null
Default-->it gives a default value,ex:-->acc_type VARCHAR(100) NOT NULL DEFAULT 'savings'
Serial-->to use AUTO_INCREMENT in postgres we use SERIAL, ex:-> id SERIAL PRIMARY KEY
Unique

create TABLE employees(
emp_id SERIAL PRIMARY KEY,
fname VARCHAR(50) NOT NULL,
lname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
dept VARCHAR(50),
salary DECIMAL(10,2) DEFAULT 30000,
hire_date DATE NOT NULL DEFAULT CURRENT_DATE//it gives the current value of the date whenever we use the default date;
);

14)\d database_name;->its shows gives the details about the column in command line .

15)SELECT setval('dataBaseName_colName_seq',1);
//on using this the serial keyword marks that the 1 is alreadt booked and it will start setting the serial values from 2,
So basically SERIAL will by default begin from the number 1 and will continue after that,so if we set the 1 primary key by ourselves it will collide when we will try to auto_increment it as when we'll use auto increment it will also start from 1, so we use this command to mark that the 1 place is booked and it has to start from 2,

15)Clauses
WHERE,DISTINCT,ORDER BY,LIMIT,LIKE,or,AND

select _ from employees where emp_id=2;
select _ from employees where dept='Marketing';
select \* from employees where salary>50000;

LIMIT
select _ from employees where salary>50000 limit 2;  
 select _ from employees where dept='Marketing' or dept='Finance';
select \* from employees where dept='Finance' AND salary>5000;

16)Relational operators
<,>,>=,<=,=,!=

17)Logical operators
or-->any one condition has to be true
AND-->both the conditions has to be true
IN-->select \* from employees where dept IN ('IT','Marketing','Finance');//-->its similar to OR but in place of writing the OR everytime we write an array;

NOT IN-->select \* from employees where dept NOT IN ('IT','Marketing','Finance');//-->its similar to OR but in place of writing the OR everytime we write an array;

BETWEEN--->select \* from employees where salary BETWEEN 40000 AND 65000;

18)DISTINCT clause
select DISTINCT dept FROM employees;--->it gives the list of distinct departments from the employees table

19)ORDER BY-->SORTING of data

select _ from employees order by fname;-->it gives data in ascending order
select _ from employees order by salary desc;--->it gives data in descending order

20)LIKE clause-->its case sensitive
it will search the data on the basis of the last name ending with 'on'
select \* from employees where lname like '%on';

it will search the data on the basis of the first name starting with 'a'
select \* from employees where fname like 'A%';

it will search the data on the basis of the first name having 'i' in between;
select \* from employees where fname like '%i%';

it will search the data on the basis of the dept name having 2 letters only , to mark 2 letters we gave 2 dashes;
select \* from employees where dept like '\_\_';

it will give the data on the basis of the fname having second character "a" and the first and the rest character can be anything;
select \* from employees where fname like '\_a%';

21)Aggregate Functions->Count, Min, Max, Avg,sum
SELECT count(fname) FROM employees; -->gives the total number of employees;

SELECT SUM(salary) FROM employees;

SELECT fname from employees WHERE salary=(SELECT MAX(salary) FROM employees);

22)cmd(GROUP BY)
SELECT dept,count(fname) from employees GROUP BY dept;

23)STRING functions
CONCAT,ex:-->
SELECT emp_id,CONCAT(fname,' ',lname) as FULLName FROM employees;

CONCAT*WS,:-->
SELECT emp_id,CONCAT_WS(*,fname,lname) as newData FROM employees;

SUBSTRING:->
SELECT SUBSTRING("fname",1,3) from employees;

REPLACE:->
SELECT REPLACE('Hey_Buddy','Hey','Hello');-->output->Hello_Buddy

REVERSE:->
SELECT REVERSE(fname) from employees;

LENGTH:->
SELECT fname,LENGTH(fname) as Length FROM employees;

SELECT fname from employees WHERE LENGTH(fname)>5;

UPPER,LOWER:->
SELECT UPPER(fname) from employees;

LEFT,RIGHT:->these are used for getting the number of words from left and right
SELECT LEFT("Hey Buddy",2);-->output-->"He"
SELECT RIGHT("Hey Buddy",2);-->output-->"dy"

TRIM:->
cmd("TRIM"),its used for removing the extra spaces from the end and the start
SELECT TRIM(' Alright! ');,ex:-"Alright!"

24)POSITION:->
its used for getting the position of the combinedcharacters from the word
SELECT POSITION('om' IN 'Thomas');--output-->3

MOST OF THE FUNCTIONS BELOW IS SIMILAR TO MSQL , so you can follow mysql docs

25)cmd(ALTER)--->its is used to alter the data or coloumn in a table
EX:->
ALTER TABLE contacts
ADD COLUMN city VARCHAR(50);

Deleting a coloumn
ex:->
ALTER TABLE contacts
DROP COLUMN city;

Changing the name of the coloumn
ex:->
ALTER TABLE contacts
RENAME COLUMN emp_id TO id;

Renaming a table
ex:-->
ALTER TABLE contacts
RENAME TO mycontacts;

Changing the data type of a coloumn in a table
ex:->
ALTER TABLE contacts
MODIFY mob VARCHAR(15) DEFAULT "unknown";

Changing the the datatype details of the table;
ex;->in the below example we changed the data type of the fname column
ALTER TABLE employees
ALTER COLUMN fname SET DATA TYPE varchar(150);

Changing the the datatype we're changing the DEFAULT;
ex;->in the below example we changed the data type of the fname column
ALTER TABLE employees
ALTER COLUMN fname
SET DEFAULT "unkown";

Changing the the datatype we're removing the DROP DEFAULT;
ex;->in the below example we changed the data type of the fname column
ALTER TABLE employees
ALTER COLUMN fname
DROP DEFAULT ;

We can even give add or remove constraints
ex:->//mob_no_less_than_10digits is the name of the constraint removing
ALTER TABLE employees
DROP CONSTRAINT mob_no_less_than_10digits ;

ex:->
ALTER TABLE employees
ADD CONSTRAINT mob_not_null CHECK(mob!=null) ;

26)cmd(CHECK)-->it is used to check on the basis of the constraint
ex:-->in the below code we're checking whether the value of the mob we're entering is equal to 10 or not
CREATE TABLE contact1(
mob VARCHAR(15) UNIQUE CHECK (LENGTH(mob)=10)
);

27)NAMED CONSTRAINT

ex:-->in the below example we gave a name to the constraint "mob_no_less_than_10digits" and then we give the condition
CREATE TABLE contacts(
name VARCHAR(50),
mob VARCHAR(15) UNIQUE,
CONSTRAINT mob_no_less_than_10digits CHECK (LENGTH(mob)>=10)
);

28)cmd (CASE statement)
ex1:-->in the below code we're fetching fname,salary and an extra column in the table called Salary Category in which we're marking each user "Higher Salary" and "Lower Salary" in the table on the basis of the salary greater then equal to 50000

SELECT fname,salary,
CASE
WHEN salary>=50000 THEN "Higher Salary"
ELSE "Low Salary"
END
AS "Salary Category"
FROM employees;

ex2:-->
ELECT fname,salary,
CASE
WHEN salary>=50000 THEN "Higher Salary"
WHEN salary>=30000 AND salary<50000 THEN "Mid Salary"
ELSE "Low Salary"
END
AS "Salary Category"
FROM employees

ex:->in the below code we're grouping the people on the basis of the salary
SELECT
CASE WHEN salary>55000 THEN 'HIGH'
WHEN salary BETWEEN 48000 AND 55000
THEN 'MID'
ELSE 'LOW'
END AS sal_cat , COUNT(emp_id)
FROM employees GROUP BY sal_cat;

29)Foreign Key example

CREATE TABLE customers(
cust_id AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(50)
);

CREATE TABLE orders(
order_id INT AUTO_INCREMENT PRIMARY KEY,
date DATE DEFAULT CURRENT_TIMESTAMP,
amount DECIMAL(10,2),
cust_id INT,
FOREIGN KEY (cust_id) REFERENCES customers(cust_id)
);

JOIN operation is used to combine rows from two or more tables based on a related column between them.
Types of JOIN

Cross Join-->every row in one table is connected with every row from another table
SELECT \* FROM customers CROSS JOIN orders;

Inner Join-->returns only the rows where there is a match between the specified coloumns in both the left (or first) and right (or second) tables.
ex:->
SELECT \* FROM customers
INNER JOIN orders
ON orders.cust_id=customers.cust_id;

ex:-->in the below code we're grouping the users on the basis of their name and getting the amount of purchases they have made
SELECT name,SUM(amount) FROM customers
INNER JOIN orders
ON orders.cust_id=customers.cust_id;
GROUP BY name;

ex:-->in this example we're trying to get the total number of orders placed by each customer
SELECT c.name, COUNT(o.order_id) AS total_orders
FROM customers c
INNER JOIN orders o ON o.cust_id = c.cust_id
GROUP BY c.name;

Left Join-->Returns all rows from the left table and the matching rows from the right table,
ex:-->customers is the left table and orders is the right table
SELECT \* FROM customers
LEFT JOIN orders
ON orders.cust_id=customers.cust_id;

ex:-->customers is the left table and orders is the right table
SELECT name,SUM(amount) FROM customers
LEFT JOIN orders
ON orders.cust_id=customers.cust_id GROUP BY name;

ex:-->customers is the left table and orders is the right table
and we also added the ifnull condition that if the amount is null we make the amount value will be 0
SELECT name,IFNULL(SUM(amount),0) FROM customers
LEFT JOIN orders
ON orders.cust_id=customers.cust_id GROUP BY name;

Many-Many relationship:-

ex:-->we created two tables one is for courses and other one is for students , then we created a third table called student_course which i used to join the other two;

CREATE TABLE students(
id INT AUTO_INCREMENT PRIMARY KEY,
student_name VARCHAR(20)
);
CREATE TABLE courses(
id INT AUTO_INCREMENT PRIMARY KEY,
course_name VARCHAR(20),
fees INT
);
CREATE TABLE student_course(
student_id INT,
course_id INT,
FOREIGN KEY (student_id) REFERENCES students(id);
FOREIGN KEY (course_id) REFERENCES courses(id);
);

Now for many to many we use the below relationship :-->
SELECT student_name , course_name FROM students
JOIN
student_course ON student_course.student_id=students.id
JOIN
courses ON student_course.course_id=courses.id;

30)CMD(VIEW)--> cmd(VIEW)-->
//a view is a virtual table that provides a way to represent the result of a SQL query as if it were a real table. Views allow you to encapsulate complex queries and make them easier to reuse and manage

ex:-View creates an extra table of the name inst_info which is the result of the below query

CREATE VIEW inst_info AS
SELECT student_name , course_name,fees FROM students
JOIN
student_course ON student_course.student_id=students.id
JOIN
courses ON student_course.course_id=courses.id;

31)cmd(HAVING CLAUSE)-->

in the below code we used HAVING in place of the WHERE , as we cannot use WHERE with GROUP BY
ex:-we're seeing the data of the fees of each student group by student name having sum greater than 10000
SELECT student_name , SUM(fees) FROM insta_info GROUP BY student_name HAVING SUM(fees)>10000

32)cmd(GROUP BY ROLL UP)
the roll us provides adds another row with the total sum of the fees coloumn , we can use rollup with count, sum ,avg
SELECT
COASLESCE(pname,'Total'), //coaslesce is similar to "ifnull" in mysql
SUM(total_price) as Amount
from billing_info
GROUP BY
ROLLUP (p_name) ORDER BY amount,

33)cmd(STORED ROUTINE)-->
An SQL statement or a set of SQL Statement that can be stored on a database server which can be called number of times
a stored routine is a set of SQL statements that can be stored in the database and executed as a unit.
Types:
1)STORED Procedure-->it performs operations but do not return a value , it contains a series of SQL statements and procedural logic and used for performing actions like modification , transaction control, and executing sequences of statements

how to write:-->

CREATE OR REPLACE PROCEDURE procedure_name(parameter_name,parameter_type,..)
LANGUAGE plpgsql
AS $$
BEGIN
//procedural code here
END;

$$
;

CREATE OR REPLACE PROCEDURE update_emp_salary(
    p_employee_id INT,
    p_new_salary NUMERIC
)
LANGUAGE plpgsql
AS
$$

BEGIN
UPDATE employees
SET SALARY = p_new_salary
WHERE emp_id=p_employee_id;
END;

$$
;

CALL update_emp_salary(3,71000);//how to call the above function

2)User defined Functions:-->custom function created by user to perform specific operations and return a value .
CREATE OR REPLACE FUNCTION function_name(parameters)
RETURNS return_type AS
$$

BEGIN
//function body (sql statements)
RETURN some_value;//for scalar functions
END;

$$
LANGUAGE plpgsql;

ex:-->to run the function we can run via the below method
SELECT * FROM dept_max_sal_emp1('HR')

CREATE OR REPLACE FUNCTION dept_max_sal_emp1(dept_name VARCHAR)
RETURNS TABLE(emp_id INT, fname VARCHAR, salary NUMERIC)//we're returning a table so we wrote table here
AS $$
BEGIN
    RETURN QUERY
    SELECT
        e.emp_id,  e.fname, e.salary
    FROM
        employees e
    WHERE
        e.dept = dept_name
        AND e.salary = (
            SELECT MAX(emp.salary)
            FROM employees emp
            WHERE emp.dept = dept_name
        );
END;
$$ LANGUAGE plpgsql;

34)cmd(WINDOW functions)-->it is used to perform calculations across a set of rows related to the current row
defined by OVER() clause.

ex:-->
//it will give the sum of the salaries but it will return the number of times of each row ,
SELECT SUM(salary) OVER() AS sum_salary FROM employees;

//we can even give multiple data in OVER()
SELECT 
emp_id,
fname,
salary,
SUM(salary) OVER(ORDER BY emp_id) AS sum_salary 
FROM employees;

//we are trying to get the sum of each department 
SELECT 
emp_id,
fname,
salary,
SUM(salary) OVER(PARTITION BY dept) AS sum_salary 
FROM employees;


SELECT 
emp_id,
fname,
salary,
MAX(salary) OVER(PARTITION BY dept) AS sum_salary 
FROM employees;

other functions such as ---> ROW_NUMBER(),RANK(),DENSE_RANK(),LAG(),LEAD()


ex:-->in the below code we're are sorting the salry on the basis of row number  
SELECT
ROW_NUMBER()  OVER(ORDER BY salary) AS row_no,
emp_id,
fname,
salary,
FROM employees;

ex:-->we're ranking the data on the basis of salary
SELECT
emp_id,
fname,
salary,
RANK() OVER(ORDER BY salary) AS rank_sal,
FROM employees;


SELECT
emp_id,
fname,
salary,
DENSE_RANK() OVER(ORDER BY salary) AS rank_sal,
FROM employees;

ex:->lag_sal displays the the salary value present before the current salary value
SELECT
emp_id,
fname,
salary,
LAG(salary) OVER() AS lag_sal,
FROM employees;

ex:->lead_sal displays the the salary value present below the current salary value
SELECT
emp_id,
fname,
salary,
LEAD(salary) OVER() AS lead_sal,
FROM employees;

SELECT
emp_id,
fname,
salary,
salary - LAG(salary) OVER(order by salary desc) AS diff_sal,
FROM employees;


35)CTE--->its a temporary result set that you can define within  query to simplify complex sql statements

WITH cte_name(optional_column_list) AS (
    //CTE query definition
    SELECT ...
)
//Main query referencing the CTE

SELECT ...
FROM cte_name
WHERE ...;

EX:-->we want to calculate the average salary per department and then find all the eployees whose salary is above the avergae salary of their department.

WITH AvgSal AS (
    SELECT 
        dept,  AVG(salary) AS avg_salary     FROM   employees
    GROUP BY dept
)
SELECT 
    e.emp_id,e.fname, e.dept,e.salary, a.avg_salary
FROM  employees e
JOIN  AvgSal a ON e.dept = a.dept
WHERE e.salary > a.avg_salary;

ex:-->highest paid employee in each department

WITH HighestPaid AS (
    SELECT 
        dept, 
        MAX(salary) AS max_salary
    FROM 
        employees
    GROUP BY 
        dept
)
SELECT 
    e.emp_id, 
    e.fname, 
    e.lname, 
    e.desig, 
    e.dept, 
    e.salary
FROM 
    employees e
JOIN 
    HighestPaid h ON e.dept = h.dept AND e.salary = h.max_salary;


36)TRIGGERS--->
its a special procedures in a database that automatically excecute pre defined actions in response to certain events on specified table or view.

CREATE TRIGGER trigger_name
{BEFORE | AFTER | INSTEAD OF}{INSERT | UPDATE | DELETE | TRUNCATE}
ON Table_name
FOR EACH { ROW | STATEMENT }
EXECUTE FUNCTION trigger_function_name();

//the below is the defined function
CREATE OR REPLACE FUNCTION trigger_function_name(parameters)
RETURNS return_type AS
$$

BEGIN
//function body (sql statements)
RETURN some_value;//for scalar functions
END;

$$
LANGUAGE plpgsql;

ex:-->use case
Create  a trigger so that if we insert/update negative salary in a table it will be triggered that set it to 0.

//trigger function
CREATE OR REPLACE FUNCTION check_salary()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.SALARY<0 THEN
        NEW.SALARY=0;
    END IF;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql;

//create the trigger
CREATE TRIGGER before_insert_salary
BEFORE INSERT ON EMPLOYEES
FOR EACH ROW
EXECUTE FUNCTION check_salary();

