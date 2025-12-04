// backend/models/user.js
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      rollNo: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      branch: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      // Added gatekeeper role
      role: {
        type: DataTypes.ENUM("student", "faculty", "admin", "gatekeeper"),
        defaultValue: "student",
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  // Hash password before creating a new user
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Hash password before updating if changed
  User.beforeUpdate(async (user) => {
    if (user.changed("password") && user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.associate = (models) => {
    User.hasMany(models.LeaveRequest, { foreignKey: "studentId", as: "leaves" });
    User.hasMany(models.QRLog, { foreignKey: "userId", as: "qrLogs" });
  };

  return User;
};
