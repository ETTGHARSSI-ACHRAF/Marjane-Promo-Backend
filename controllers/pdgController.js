const {getAdminCentreByEmail} =require('../models/pdgModel');
const {createAdminCentre} = require('../models/adminCentreModel');
const nodemailer = require('nodemailer');
const {genSaltSync,hash,compare} =require('bcrypt');
const {sign,decode} =require('jsonwebtoken');

module.exports = {
    // autontification de pdg
    loginPdg : (req,res)=>{
        const body = req.body;
        console.log(body.email_pdg);
        getAdminCentreByEmail(body.email_pdg, async(err, result) => {
            if (err) {
                console.log(err);
            }
            if (result == null) {
                return res.json({
                    success: 0,
                    date: 'invalide email '
                });
            }
            const resu = await compare(body.password_pdg,result.password_pdg);
            if(resu){
                result.password_pdg= undefined;
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
                    data : "invalid password"
                })
            }
        });
    },
    // create d'une admine de centre par le pdg
    createAdminCentre :async (req,res)=>{
        const body = req.body;
        const saltRounds = 10;
        const psd=body.password_admin;
        
        body.password_admin = await hash(body.password_admin, saltRounds);
        
        createAdminCentre(body,(err,result)=>{
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
                to: body.email_admin, // TODO: email receiver
                subject: 'votre compte sur la platforme marjane',
                text: 'votre code pour connecter sur la platforme : '+psd+' pour acceder a votre compte cliquer ici : http://localhost:5000/adminCentre ',
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