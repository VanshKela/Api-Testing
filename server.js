const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
}).then(() => {
    console.log("DB CONNECTED");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});