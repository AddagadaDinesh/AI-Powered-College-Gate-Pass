const mongoose = require('mongoose');
const User = require('./models/user');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to DB");
    const user = await User.findOne({ email: "dineshaddagada@gmail.com" });
    const fs = require('fs');
    if (user) {
      fs.writeFileSync('user_found.txt', `User found: ${JSON.stringify(user)}`);
    } else {
      fs.writeFileSync('user_found.txt', "User NOT found");
    }
    process.exit();
  })
  .catch(err => {
    console.error("DB Error:", err);
    process.exit(1);
  });
