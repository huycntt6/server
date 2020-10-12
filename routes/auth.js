const router = require('express').Router();
const User = require('../modal/user');
//pem code
const bcrypt = require('bcryptjs');
//token
const jwt = require('jsonwebtoken');
//validation
const {registerValidation, loginValidation} = require('../modal/validation');

const verify = require('./verifyToken');

router.get('/', verify, async(req, res) => {
     const user = await User.findOne({_id: req.user})
     res.json({success: true, user: user});
});

router.post('/register', async(req, res) => {
    
    // validate the data before is user
    const validation = registerValidation(req.body);
    if(validation.error){
        return res.json({success: false, error: validation.error, error_code: '101'});
    }
    // check user already
    const checkEmail = await User.findOne({email:req.body.email});
    if(checkEmail){
        return res.json({success: false, error: "Email đã tồn tại!", error_code: '501'});
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try{
        const saveUser = await user.save();
        res.json({success: true, data: saveUser});
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // validate the data before is user
    const validation = loginValidation(req.body);
    if(validation.error){
        return res.json({success: false, error: validation.error, error_code: '101'});
    }
    // check user already
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return res.json({success: false, error: "Email không tồn tại!", error_code: '102'});
    }
    const dePass = await bcrypt.compare(req.body.password, user.password);
    if(!dePass){
        return res.json({success: false, error: "Mật khẩu không chính xác!", error_code: '103'});
    }
    
    //create and assign token
    const token = jwt.sign({_id: user._id}, 'qwertyuiopqaz');
    res.json({token: token, success: true});
   
});

module.exports = router;