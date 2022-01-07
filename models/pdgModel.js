const pool = require('../config/database');

module.exports = {
    getAdminCentreByEmail : (email_pdg,callBack)=>{
        pool.query(
            'SELECT * FROM pdg WHERE email_pdg=?',
            [email_pdg],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                // console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    }
}