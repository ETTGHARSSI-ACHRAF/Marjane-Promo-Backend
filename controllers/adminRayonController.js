const {getAdminRayonByEmail,getAllAdminRayon,deleteAdminRayon,createAdminRayon} = require('../models/adminRayonModel');
const {updatePromo,getPromosNonTraiterByIdPromo} = require('../models/promoModel');
const nodemailer = require('nodemailer');
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


     // get all admin rayon
     getAllAdminRayon : (req,res)=>{
        const centre=req.params.centre;
        getAllAdminRayon(centre,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            });
        })
    },
    // supprimer admin rayon
    deletAdminRayon : (req,res)=>{
        const id=req.params.id;
        deleteAdminRayon(id,(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : "database connection error"
                });
            }
            return res.status(200).json({
                success : 1,
                data : result
            });
        });
    },


        // AJouter admin de rayon
        createAdminRayon :async (req,res)=>{
            const body = req.body;
            const saltRounds = 10;
            const psd=body.password_admin_rayon;
            
            body.password_admin_rayon = await hash(body.password_admin_rayon, saltRounds);
            
            createAdminRayon(body,(err,result)=>{
                if(err){
                    console.log(err);
                    return res.status(500).json({
                        success : 0,
                        message : "database connection error"
                    });
                }
                // console.log(result);
                // Step 1
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'safiair282@gmail.com', // TODO: your gmail account
                        pass: 'Youcode2021' // TODO: your gmail password
                    }
                  });
                  // Step 2
                  let mailOptions = {
                    from: 'safiair282@gmail.com', // TODO: email sender
                    to: body.email_admin_rayon, // TODO: email receiver
                    subject: 'votre compte sur la platforme marjane',
                    text: 'votre code pour connecter sur la platforme : '+psd+' pour acceder a votre compte cliquer ici : http://localhost:5000/adminRayon',
                  };
    
                  // Step 3
                  transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return log('Error occurs');
                    } 
                    return res.status(200).json({
                        success : 1,
                        data : result,
                        body:body
                    });
                  });
               
            });
        },
}