const mongoose = require("mongoose");

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.set("strictQuery", false);
    mongoose.connect(
        DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connected'));
};

module.exports = dbConnect;