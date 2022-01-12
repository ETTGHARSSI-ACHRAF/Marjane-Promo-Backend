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
            "INSERT INTO promo_prod(date_debut,date_fin,fk_prod,fk_promo,prix_promo,statu,commentaire) VALUES (?,?,?,?,?,'en cour','en cour')",
            [
                data.date_debut,
                data.date_fin,
                data.fk_prod,
                data.fk_promo,
                data.prix_promo
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
    },
    getStatistiquePromoEnCour : (callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "en_cour" FROM `promo_prod` WHERE statu="en cour"',
            // 'SELECT COUNT(statu='en cour') as 'en_cour', COUNT(statu='valider') as 'valider',COUNT(statu='non valider') as 'non_valider', COUNT(statu='non traiter') as 'non_traiter' FROM `promo_prod` WHERE statu='non traiter'',
            [],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
    getStatistiquePromoNonTraiter : (callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "non_traiter" FROM `promo_prod` WHERE statu="non traiter"',
            [],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
    getStatistiquePromoValider : (callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "valider" FROM `promo_prod` WHERE statu="valider"',
           
            [],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
    getStatistiquePromoNonValider : (callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "non_valider" FROM `promo_prod` WHERE statu=" non valider"',
            [],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
    getStatistiquePromoEnCourByCentre : (centre,callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "en_cour" FROM promo_prod,promotion,admin_centre WHERE statu="en cour" AND promo_prod.fk_promo=promotion.id_promo AND promotion.fk_admin=admin_centre.id_admin AND admin_centre.fk_centre=?',
            [
                centre
            ],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
    getStatistiquePromoNonTraiterByCentre : (centre,callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "non_traiter" FROM promo_prod,promotion,admin_centre WHERE statu="non traiter" AND promo_prod.fk_promo=promotion.id_promo AND promotion.fk_admin=admin_centre.id_admin AND admin_centre.fk_centre=?',
            [
                centre
            ],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
    getStatistiquePromoValiderByCentre : (centre,callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "valider" FROM promo_prod,promotion,admin_centre WHERE statu="valider" AND promo_prod.fk_promo=promotion.id_promo AND promotion.fk_admin=admin_centre.id_admin AND admin_centre.fk_centre=?',
           
            [
                centre
            ],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
    getStatistiquePromoNonValiderByCentre : (centre,callBack)=>{
        pool.query(
            'SELECT COUNT(id_promo_prod) as "non_valider" FROM promo_prod,promotion,admin_centre WHERE statu="non valider" AND promo_prod.fk_promo=promotion.id_promo AND promotion.fk_admin=admin_centre.id_admin AND admin_centre.fk_centre=?',
            [
                centre
            ],
            (error,results)=>{
                if(error){
                    // console.log(error);
                   return callBack(error);
                   
                }
                console.log(results);
                return callBack(null,results[0]);
                
            }
        )
    },
}