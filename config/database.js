const {createPool} =require('mysql');
const pool = createPool({
    port:process.env.port,
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

module.exports=pool;