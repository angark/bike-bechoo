//autuController.js

const jwt = require ('jsonwebtoken')

exports.googleCallback = (req,res) =>{
    try {
        //generate token
        const token = jwt.sign({sub:req.user._id},
            process.env.JWT_SECRET,
            {expiresIn:'1hr'}
        );
        

        //set token in a secure Http-only cookie
        res.cookie('token',token, {
            httpOnly:true,
            sameSite:'lax'
        });

        //redirect to user dashboard
        res.redirect(`${process.env.UI_URL}/success-login?access_token=${token}`)

    } catch (error) {
        console.error('Error during google callback',error)
        res.status(500).json({message:'Internal server error during login'})
        
    }
}

exports.getUser = (req, res)=>{
    try {
        if (!req.user){
            res.status(401).json({message:'User not authenticated'})
        }
        res.json({
            user:req.user
        })
    } catch (error) {
        console.error('Error fetching user details',error)
        res.status(500).json({message:'Internal server error'})
        
    }
}

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user id
    next();
  } catch {
    return res.status(400).json({ message: "Invalid token" });
  }
};