const pool = require('../config/database');

module.exports = {
    createAdminRayon : (data,callBack)=>{
        pool.query(
            'INSERT INTO `admin_rayon`(`nom_admin_rayon`, `email_admin_rayon`, `password_admin_rayon`, `fk_centre`, `fk_cat`) VALUES (?,?,?,?,?)',
            [
                data.nom_admin_rayon,
                data.email_admin_rayon,
                data.password_admin_rayon,
                data.fk_centre,
                data.fk_cat
            ],
            (error,results)=>{
                if(error){
                    
                  return  callBack(error);
                }
                return callBack(null,results);
            }
                
            
        );
    },
    getAdminRayonByEmail : (email_admin_rayon,callBack)=>{
        pool.query(
            'SELECT * FROM admin_rayon WHERE email_admin_rayon=?',
            [email_admin_rayon],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                return callBack(null,results[0]);
                
            }
        )
    },

    // get all admin rayon
    getAllAdminRayon : (centre,callBack) =>{
        pool.query(
            'SELECT * FROM admin_rayon,centre,categorie WHERE admin_rayon.fk_centre=centre.id_centre AND admin_rayon.fk_cat=categorie.id_cat And fk_centre=?',
            [centre],
            (error,results)=>{
                if(error){
                  return  callBack(error);
                }
                return callBack(null,results);
            } 
            
            )
    },

    // delete admin rayon by id
    deleteAdminRayon : (id,callBack) =>{
        pool.query(
            'DELETE FROM admin_rayon WHERE id_admin_rayon=?',
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