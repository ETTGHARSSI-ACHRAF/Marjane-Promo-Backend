const {loginPdg,createAdminCentre} = require('../controllers/pdgController');
const {loginAdminCentre,getAllAdmin,deletAdminCentre} = require('../controllers/adminCentreController');
const {loginAdminRayon} = require('../controllers/adminRayonController');
const {createPromo,validePromo,getPromosByAdminRayon,getAllPromosParCentre} = require('../controllers/promotionController');
const {getAllCenter} = require('../controllers/centreController');
const router = require('express').Router();
const {checkToken} =require('../auth/token_validation');


// pdg
router.post('/pdg/login',loginPdg);
router.post('/pdg/CreateAdminCentre',createAdminCentre);
router.get('/pdg/allAdminCentre',getAllAdmin);
router.delete('/pdg/deleteAdminCentre/:id',deletAdminCentre);
// admin de centre
router.post('/adminCentre/login',loginAdminCentre);


//  admin de rayon

router.post('/adminRayon/login',loginAdminRayon);

// promo
router.post('/promo/create',checkToken,createPromo);
router.patch('/promo/validePromo',checkToken,validePromo);
router.get('/promo',checkToken,getPromosByAdminRayon);
router.get('/promosCentre/:id',getAllPromosParCentre);

// centre 
router.get('/centres',getAllCenter);
module.exports = router;