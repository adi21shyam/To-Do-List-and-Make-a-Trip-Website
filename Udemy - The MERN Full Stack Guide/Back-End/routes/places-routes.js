//3rd Party Modules
const { Router } = require('express');
const { check } = require('express-validator');

//Local Modules
const fileUpload = require('../middleware/fileUpload');
const checkAuth = require('../middleware/checkAuth');

const router = Router();

const {
        getPlaceByPlaceId, 
        getPlacesByUserId, 
        postPlaceForLoggedUser, 
        patchUpdatePlaceByPlaceId, 
        deletePlaceByPlaceId } = require('../controllers/places-controllers');
 
router.get('/users/:userId', getPlacesByUserId);
router.get('/:placeId',getPlaceByPlaceId);


//Adding Middleware to verify only the valid token can send these requests below
router.use(checkAuth);

router.post('/',
        fileUpload.single('image'),
        [
        check('title').not().isEmpty(), 
        check('description').isLength({min:5}), 
        check('address').not().isEmpty()
        ], 
        postPlaceForLoggedUser);

router.patch('/:placeId',
        [
        check('title').not().isEmpty(), 
        check('description').isLength({min:5})
        ],
        patchUpdatePlaceByPlaceId);

router.delete('/:placeId',deletePlaceByPlaceId);

module.exports = router;