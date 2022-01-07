const {getAdminRayonByEmail} = require('../models/adminRayonModel');
const {updatePromo,getPromosNonTraiterByIdPromo} = require('../models/promoModel');
const {genSaltSync,hash,compare} =require('bcrypt');
const {sign,decode} =require('jsonwebtoken');

module.exports = {
     // autontification de admin rayon
     loginAdminRayon : (req,res)=>{
        const body = req.body;
        getAdminRayonByEmail(body.email_admin_rayon, async(err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length == 0) {
                return res.json({
                    success: 0,
                    date: 'invalide email or password1'
                });
            }
            const resu = await compare(body.password_admin_rayon,result.password_admin_rayon);
            if(resu){
                result.password_admin_rayon= undefined;
                const jsontoken = sign({result:result},"qwe1234",{
                    expiresIn:"1h"
                });
                process.env.jsontoken =jsontoken;
                const dataAdmin = decode(process.env.jsontoken)
                getPromosNonTraiterByIdPromo(dataAdmin.result.fk_cat,(err, result) => {
                    if(err){
                        // console.log(err);
                        return res.status(500).json({
                            success : 0,
                            message : "database connection error",
                            data:err
                        });
                    }
                    // update les status des promos d'une rayon par non traiter
                   if(result.length>0){
                       for(let i=0;i<result.length;i++){
                                const data = {
                            "statu": "non traiter",
                            "commentaire": "null",
                            "id_promo_prod": result[i].id_promo_prod
                        }
                        updatePromo(data,(err,result)=>{
                            if(err){
                                console.log(err);
                                return res.status(500).json({
                                    success : 0,
                                    message : "database connection error"
                                });
                            }
                        }); 
                       }
                   }
                });

                return res.json({
                    success : 1,
                    message : 'login succesfully',
                    token: jsontoken
                });
                
            }else{
                return res.json({
                    success : 0,
                    data : "invalid email or password"
                })
            }
        });
    },
}