const {getAllProduitByCategorie} = require('../models/produitModel')
module.exports = {
    // afficher tout les centres 
   getAllProduitByCategorie : (req,res)=>{
    const id=req.params.id;
       getAllProduitByCategorie(id,(err, result) => {
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
   }
}