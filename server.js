const express = require("express");
// const connectDB = require("./config/db");
const app = express();

//Connect Database
// connectDB();

//Init Middleware
app.use(express.json({extended: false}))

//Define Routes
app.get('/', (req, res) => {  
    res.send('YOUR EXPRESS BACKEND IS CONNECTED TO REACT' );  
}); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));