const bcrypt = require("bcrypt");
const { User } = require("./models"); // adjust path if needed
require("dotenv").config();

const resetPassword = async () => {
  try {
    const email = "sunil@gmail.com";   // Faculty email
    const newPassword = "sunil";   // New password

    // Hash the new password
    const hashed = await bcrypt.hash(newPassword, 10);

    // Update user password
    const result = await User.update(
      { password: hashed },
      { where: { email } }
    );

    console.log("Password reset successful:", result);
    process.exit(0);
  } catch (err) {
    console.error("Error resetting password:", err);
    process.exit(1);
  }
};

resetPassword();
