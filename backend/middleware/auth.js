// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {

      const token = req.cookies.adminToken || req.cookies.userToken; // Prioritize adminToken
      if (!token) 
        return res.status(403).json({ message: 'No token provided' });

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

};

export const authorizeAdmin = (req, res, next) => {

      const token = req.cookies.adminToken;
      if (!token){
         return res.status(403).json({ message: 'No admin token provided' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
          return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(401).json({ message: 'Invalid admin token' });
      }
      
};


// middleware/auth.js
// export const authenticate = (req, res, next) => {
//    const adminToken = req.cookies;
//   if (!token) return res.status(403).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {

//     return res.status(401).json({ message: 'Invalid token' });

//   }
// };