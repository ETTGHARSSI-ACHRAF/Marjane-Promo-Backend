const {addPromo,addPromoProd,updatePromo,getPromosByAdminRayon,getAllPromosParCentre} = require('../models/promoModel');
const {decode} =require('jsonwebtoken');
module.exports = {
    // ajouter promotion et promo_prod
    createPromo : (req,res)=>{
        const body = req.body;
        addPromo(body,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
        addPromoProd(body,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result,
                body:body
            });
        });    
        });
    },
    // validation d'une promotion par l'admin de rayon avec la conduction horaire
    validePromo : (req,res)=>{
        const body = req.body;
        let date_ob = new Date();
        if (date_ob.getHours() >= 8 && date_ob.getHours() < 12) {
            updatePromo(body,(err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success : 0,
                        message : "database connection error"
                    });
                }
                return res.status(200).json({
                    success : 1,
                    data : result,
                    body:body
                });
            }); 
        }else{
            return res.status(500).json({
                success : 0,
                message : "hors session"
            });
        }
        
    },
    // afficher les promos de l'admin de rayon
    getPromosByAdminRayon : (req,res)=>{
        const dataAdmin = decode(process.env.jsontoken)
        getPromosByAdminRayon(dataAdmin.result.fk_cat,(err, result) => {
            if(err){
                // console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error",
                    data:err
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            });
        });
    },
    getAllPromosParCentre : (req,res) =>{
        const id=req.params.id;
        getAllPromosParCentre(id,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result,
            });
        });   
    }
}