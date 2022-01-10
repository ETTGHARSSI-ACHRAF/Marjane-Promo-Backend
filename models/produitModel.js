const pool = require('../config/database');

module.exports = {
    getAllProduitByCategorie : (cat,callBack)=>{
        pool.query(
            'SELECT * FROM produit WHERE fk_cat=?',
            [cat],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                // console.log(results);
                return callBack(null,results);
                
            }
        )
    },
    getProduitById : (id,callBack)=>{
        pool.query(
            'SELECT * FROM produit WHERE id_prod=?',
            [id],
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