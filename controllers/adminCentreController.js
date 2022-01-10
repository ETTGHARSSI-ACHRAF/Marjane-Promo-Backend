const {getAdminCentreByEmail,getAllAdminCentre,deleteAdminCentre} = require('../models/adminCentreModel');
const nodemailer = require('nodemailer');
const {genSaltSync,hash,compare} =require('bcrypt');
const {sign, decode} =require('jsonwebtoken');

module.exports = {
     // autontification de pdg
     loginAdminCentre : (req,res)=>{
        const body = req.body;
        getAdminCentreByEmail(body.email_admin, async(err, result) => {
            if (err) {
                console.log(err);
            }
            if (result == null) {
                return res.json({
                    success: 0,
                    date: 'invalide email or password1'
                });
            }
            const resu = await compare(body.password_admin,result.password_admin);
            if(resu){
                result.password_admin= undefined;
                const jsontoken = sign({result:result},"qwe1234",{
                    expiresIn:"1h"
                });
                return res.json({
                    success : 1,
                    message : 'login succesfully',
                    token: jsontoken,
                    data: decode(jsontoken)
                });
            }else{
                return res.json({
                    success : 0,
                    data : "invalid email or password"
                })
            }
        });
    },
    
    // get all admin centre
    getAllAdmin : (req,res)=>{
        getAllAdminCentre((err,result)=>{
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
// supprimer admin centre
    deletAdminCentre : (req,res)=>{
        const id=req.params.id;
        deleteAdminCentre(id,(err,result)=>{
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
}