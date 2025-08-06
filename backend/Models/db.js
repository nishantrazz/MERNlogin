const mongoose = require('mongoose');

const mongo_rul = process.env.MONGO_CON;


mongoose.connect(mongo_rul)
.then(() => {
    console.log('mongoDB connected');
}).catch((err) => 
    console.log('Mongodb conntectes error', err));

