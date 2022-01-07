const pool = require('../config/database');

module.exports = {
    // ajouter promotion
    addPromo : (data,callBack)=>{
        pool.query(
            'INSERT INTO promotion(remise,fk_admin,fk_rayon) VALUES (?,?,?)',
            [
                data.remise,
                data.fk_admin,
                data.fk_rayon
            ],
            (error,results)=>{
                if(error){
                    
                  return  callBack(error);
                }
                return callBack(null,results);
            }  
        );
    },
    // ajouter promo_prod
    addPromoProd :(data,callBack)=>{
        pool.query(
            "INSERT INTO promo_prod(date_debut,date_fin,fk_prod,fk_promo,statu,commentaire) VALUES (?,?,?,?,'en cour','en cour')",
            [
                data.date_debut,
                data.date_fin,
                data.fk_prod,
                data.fk_promo
            ],
            (error,results)=>{
                if(error){
                    
                  return  callBack(error);
                }
                return callBack(null,results);
            }  
        );
    },
    updatePromo : (data,callBack)=>{
        pool.query(
            "UPDATE promo_prod SET statu=?,commentaire=? WHERE id_promo_prod=?",
            [
                data.statu,
                data.commentaire,
                data.id_promo_prod
            ],
            (error,results)=>{
                if(error){
                    
                  return  callBack(error);
                }
                return callBack(null,results);
            }  
        );
    },
    getPromosByAdminRayon:(id,callBack)=>{
        pool.query(
            "SELECT * FROM promo_prod INNER JOIN promotion on promo_prod.fk_promo=promotion.id_promo INNER JOIN produit ON promo_prod.fk_prod=produit.id_prod where fk_rayon=?",
            [
                id
            ],
            (error,results)=>{
                if(error){
                    
                  return  callBack(error);
                }
                return callBack(null,results);
            }  
        );
    },
    getPromosNonTraiterByIdPromo : (id,callBack) =>{
        pool.query(
            "SELECT * FROM promo_prod INNER JOIN promotion on promo_prod.fk_promo=promotion.id_promo INNER JOIN produit ON promo_prod.fk_prod=produit.id_prod where fk_rayon=? and promo_prod.statu='en cour'",
            [
                id
            ],
            (error,results)=>{
                if(error){
                    
                  return  callBack(error);
                }
                return callBack(null,results);
            }  
        );
    },
    getAllPromosParCentre : (fk_centre,callBack)=>{
        pool.query(
            'SELECT * FROM admin_centre,promotion,promo_prod,produit,centre,categorie WHERE promotion.id_promo=promo_prod.fk_promo AND promotion.fk_admin=admin_centre.id_admin AND promo_prod.fk_prod=produit.id_prod AND admin_centre.fk_centre=centre.id_centre AND promotion.fk_rayon=categorie.id_cat AND centre.id_centre=?',
            [
                fk_centre
            ],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results);
                
            }
        )
    }
}