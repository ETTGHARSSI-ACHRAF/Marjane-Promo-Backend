const {loginPdg,createAdminCentre} = require('../controllers/pdgController');
const {loginAdminCentre,getAllAdmin,deletAdminCentre} = require('../controllers/adminCentreController');
const {loginAdminRayon,getAllAdminRayon,deletAdminRayon,createAdminRayon} = require('../controllers/adminRayonController');
const {createPromo,validePromo,getPromosByAdminRayon,getAllPromosParCentre,statistique,statistiqueDeCentre} = require('../controllers/promotionController');
const {getAllCenter} = require('../controllers/centreController');
const {getAllRayon} = require('../controllers/rayonController');
const {getAllProduitByCategorie} = require('../controllers/produitController');
const router = require('express').Router();
const {checkToken} =require('../auth/token_validation');


// pdg
router.post('/pdg/login',loginPdg);
router.post('/pdg/CreateAdminCentre',createAdminCentre);
router.get('/pdg/allAdminCentre',getAllAdmin);
router.delete('/pdg/deleteAdminCentre/:id',deletAdminCentre);

// admin de centre
router.post('/adminCentre/login',loginAdminCentre);
router.get('/adminCentre/AllAdminRayon/:centre',getAllAdminRayon)
router.delete('/adminCentre/deleteAdminRayon/:id',deletAdminRayon);
router.post('/adminCentre/crearteAdminRayon',createAdminRayon);

//  admin de rayon
router.post('/adminRayon/login',loginAdminRayon);

// promo
router.post('/promo/create',createPromo);
router.post('/promo/validePromo',validePromo);
router.get('/promo/:id',getPromosByAdminRayon);
router.get('/promosCentre/:id',getAllPromosParCentre);
router.get('/promo',statistique);
router.get('/promo/statistiqueCentre/:id',statistiqueDeCentre);

// centre 
router.get('/centres',getAllCenter);

// produit
router.get('/listeProduit/:id',getAllProduitByCategorie);

// rayon
router.get('/rayons',getAllRayon);
module.exports = router;