const express = require("express");
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require('body-parser');
const firmRoutes = require('./routes/firmRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const path = require('path');


const app = express();

const PORT = process.env.PORT || 4000;

dotenv.config();
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// MongoDB URI - replace <username>, <password>, and <dbname> as needed
//const MONGO_URI = "mongodb://localhost:27017/foodmine"; // Use your actual URI

// Connect to MongoDB
//mongoose.connect(MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true })

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch((error) => console.error("❌ MongoDB connection error:", error));

// ✅ Add this to parse JSON body
app.use(express.json());

// (optional) Add this if you're accepting form data
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.json()); 
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads', express.static('uploads'));
app.use(cors());

// app.use(cors({
//     origin: "http://localhost:5173", // Allow your frontend
//     methods: "GET, POST, PUT, DELETE, OPTIONS",
//     allowedHeaders: "Content-Type, Authorization"
// }));

// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true // if you're using cookies/auth
// }));


// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }));
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // or specify the frontend domain
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });


// Define route
app.use('/', (req, res) => {
  res.send("<h1> Welcome to Food MINE! </h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server started and running at port ${PORT}`);
});

