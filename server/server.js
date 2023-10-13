const express = require('express');
const cors = require('cors');
const app = express();        
app.use(cors());
app.use(express.json());                           
app.use(express.urlencoded({ extended: true }));  
require('./mongoose.config');   
require('./routes/note.routes')(app);
app.listen(3000, () => {
    console.log("Listening at Port 3000")
})