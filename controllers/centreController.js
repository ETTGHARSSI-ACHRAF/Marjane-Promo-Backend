const {getAllCentre}= require('../models/centreModel');

module.exports = {
     // afficher tout les centres 
    getAllCenter : (req,res)=>{
        getAllCentre((err, result) => {
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