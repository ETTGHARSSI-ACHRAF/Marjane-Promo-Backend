const pool = require('../config/database');

module.exports = {
    getAllRayon : (callBack)=>{
        pool.query(
            'SELECT * FROM categorie',
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