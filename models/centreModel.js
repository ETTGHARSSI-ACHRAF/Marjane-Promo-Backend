const pool = require('../config/database');

module.exports = {
    getAllCentre : (callBack)=>{
        pool.query(
            'SELECT * FROM centre',
            [],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                // console.log(results);
                return callBack(null,results);
                
            }
        )
    }
}