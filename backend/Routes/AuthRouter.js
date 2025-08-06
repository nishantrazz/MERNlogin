// authrouter

const router = require('express').Router();
const { signup, login } = require('../controllers/AuthController');
const { signupValidation, loginValidation } = require('../MiddleWeres/AuthValidation');

// router.post('/login', (req , res)=> {
//     console.log('/auth/login post rout hit');
//     res.send('Login Success');
// });

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);



module.exports = router;