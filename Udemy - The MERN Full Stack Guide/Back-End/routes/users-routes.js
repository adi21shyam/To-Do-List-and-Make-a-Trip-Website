//3rd Party Modules
const { Router } = require('express');
const { check } = require('express-validator');

//Local Modules
const fileUpload = require('../middleware/fileUpload');

const router = Router();
const {
        signUp, 
        logIn, 
        getUsers } = require('../controllers/users-controllers');

router.get('/', getUsers);

router.post('/signup',
        fileUpload.single('image'),
        [
        check('email').normalizeEmail().isEmail(),
        check('name').isLength({min:3}),
        check('password').isLength({min:6})
        ], signUp);

router.post('/login', [ 
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min:6})
        ], logIn);

module.exports = router;