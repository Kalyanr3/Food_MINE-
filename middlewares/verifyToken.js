/*const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const verifyToken = async(req, res, next) => {
    const token = req.headers.token;

    if(!token){
        return res.status(401).json({error: "Token is required"});

    }
    try {
        //const decoded = jwt.verify(token, secretKey);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const vendor = await Vendor.findById(decoded.vendorId);

        if(!vendor){
            return res.status(404).json({error: "vendor not found"})  
        }

         req.venodrId = vendor._id

         next()
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Invalid token"});
        
    }
}

module.exports = verifyToken;
*/

/*const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const vendor = await Vendor.findById(decoded.id); // ← corrected to `id`

        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        req.vendorId = vendor._id; // ← fixed typo from `venodrId`
        next();

    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: "Invalid token" }); // Changed to 401
    }
};

module.exports = verifyToken;
*/
const Vendor = require('../models/vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        // Verify the JWT using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Try to find the vendor in the database
        const vendor = await Vendor.findById(decoded.id); // <-- Corrected here
        
        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // If vendor is found, attach to the request object
        req.vendorId = vendor._id;
        next();  // Call the next middleware

    } catch (error) {
        console.error("Token verification failed: ", error); // <-- Log the error

        // Send a response with the actual error message
        return res.status(500).json({ error: "Invalid token", details: error.message });
    }
};

module.exports = verifyToken;

