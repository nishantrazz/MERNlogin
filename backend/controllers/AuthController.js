// AuthController

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../Models/User');
const User = require('../Models/User');


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: 'User already exits, you can Login',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userModel = new UserModel({
            name,
            email,
            password: hashedPassword,
            plainPassword: password //for testing 
        });

        await userModel.save();

        res.status(201).json({
            message: 'Signup successfully',
            success: true
        });
    } catch (err) {
        console.error("signup erroe", err);
        res.status(500).json({
            message: 'Internal serval Error',
            success: false
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        const errormsg = 'Auth Failed : Email or Password is wrong'
        if (!user) {
            return res.status(409).json({ message: errormsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(409).json({ message: errormsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24' }
        );

        return res.status(200).json({
            message: 'Login successfully',
            success: true,
            jwtToken,
            email: user.email,
            name: user.name

        });
        // res.status(201).json({
        //     message: 'Login successfully',
        //     success: true,

        // });
        // res.status(201).json({
        //     message: 'Signup successfully',
        //     sucess: true,
        //     jwtToken,
        //     email,
        //     name: user.name
        // });
    } catch (err) {
        console.error("login error", err);
        res.status(500).json({
            message: 'Internal Server Error',
            success: false
        })
    }
}




module.exports = {
    signup,
    login
};