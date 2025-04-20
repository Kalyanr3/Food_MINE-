
/*const Firm = require('../models/Firm');

const Vendor = require('../models/vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({storage: storage });



const addFirm = async(req,res) => {
    

    try {

        const {firmName, area, category, region, offer} = req.body;

        const image = req.file? req.file.filename: undefined;
        

        const vendor = await Vendor.findById(req.vendorId);

        if(!vendor){
            res.status(404).json({message: "vendor not found"});
            
        }


    const firm = new Firm({
        firmName, 
        area, 
        category, 
        region, 
        offer, 
        image, 
        vendor: vendor._id

    })

    const savedFirm = await firm.save();

    vendor.firm.push(savedFirm);

    await vendor.save();

    return res.status(200).json({message: 'Firm added successfull'});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
        
    }

}


module.exports = {addFirm: [upload.single('image'), addFirm]};
 */


const Firm = require('../models/Firm');  // Correct import for Firm model
const Vendor = require('../models/vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + Path.extname(file.originalname)); // <-- Fix this to use Date.now() properly
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        const firm = new Firm({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendor._id
        });

        const savedFirm = await firm.save();
        vendor.firm.push(savedFirm);
        await vendor.save();

        return res.status(200).json({ message: 'Firm added successfully' });

    } catch (error) {
        console.error("Error adding firm: ", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

const deleteFirmById = async(req,res) => {

    try {

        const firmId = req.paramas.firmId;

        const deleteFirm = await Firm.findByIdAndDelete(firmId);
        
        if(!deletedProduct){
            return res.status(404).json({ error: "No Product Found"});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error"});
        
    }
}


module.exports = { addFirm: [upload.single('image'), addFirm],deleteFirmById };
