const pool = require('../config/database');

module.exports = {
    getAdminCentreByEmail : (email_admin,callBack)=>{
        pool.query(
            'SELECT * FROM admin_centre WHERE email_admin=?',
            [email_admin],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                return callBack(null,results[0]);
                
            }
        )
    },
    // create admin centre
    createAdminCentre : (data,callBack)=>{
        pool.query(
            'INSERT INTO admin_centre(nom_admin,email_admin,password_admin,fk_centre) VALUES (?,?,?,?)',
            [
                data.nom_admin,
                data.email_admin,
                data.password_admin,
                data.fk_centre
            ],
            (error,results)=>{
                if(error){
                    
                  return  callBack(error);
                }
                return callBack(null,results);
            }
                
            
        );
    },
    // get all admin
    getAllAdminCentre : callBack =>{
        pool.query(
            'SELECT * FROM admin_centre,centre,ville WHERE admin_centre.fk_centre=centre.id_centre AND centre.fk_ville=ville.id_ville',
            [],
            (error,results)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            } 
            
            )
    },
    // delete admin by id
    deleteAdminCentre : (id,callBack) =>{
        pool.query(
            'DELETE FROM admin_centre WHERE id_admin=?',
            [id],
            (error,results)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            } 
            
            )
    },
}