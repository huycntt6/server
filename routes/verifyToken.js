//token
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('authorization');
   
    if(!token) return res.send({success: false, error: token +'ko co j ak'});
    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch(err){
        res.json({success: false, error: "Phát sinh lỗi, vui lòng đăng nhập lại!"});
    }
}