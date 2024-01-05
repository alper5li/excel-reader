const mysql = require('mysql');

const pool = mysql.createPool({
    limit: process.env.LIMIT,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})



function validate(username,password)
{
    pool.getConnection((error, connection) => 
    {
        if (error) throw error;
        connection.query(`SELECT * FROM students WHERE username =${username}`, (err, data) => 
        {
            if (err) throw err;
            console.log(data);
        })
    })

    res.render('show');
}

const userSchema = ({
    email:String,
    passowrd:String
});

module.exports = {
    userSchema
};