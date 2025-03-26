//  dont wast your time here its middlewares for making the tokens auth 
// ignore it 


import jwt from 'jsonwebtoken';
import JWT_SECRET from 'env';
import User from 'models/user.model';

const authorize = async (req, res, next) => {
	try{
		let token;
		if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
			token = req.headers.authorization.split(' ')[1];
		}
		if(!token){
			return res.status(401).json({ error: 'Unauthorized' });
		}
		const decoded = jwt.verify(token, JWT_SECRET);
		const user = await User.findById(decoded.id);
		if(!user){
			return res.status(401).json({ error: 'Unauthorized' });
		}
		req.user = user;
		next();
	}catch(error){
		res.status(401).json({error: 'Unauthorized'});
	}
};

export default authorize;