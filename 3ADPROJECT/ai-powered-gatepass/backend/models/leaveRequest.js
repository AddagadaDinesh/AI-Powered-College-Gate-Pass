// backend/models/leaveRequest.js
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const LeaveRequest = sequelize.define("LeaveRequest", {
    studentId: { type: DataTypes.INTEGER, allowNull: false },
    branch: { type: DataTypes.STRING, allowNull: true },
    from_date: { type: DataTypes.DATEONLY, allowNull: false },
    to_date: { type: DataTypes.DATEONLY, allowNull: false },
    reason: { type: DataTypes.TEXT, allowNull: false },
    status: { type: DataTypes.ENUM("pending", "approved", "rejected"), defaultValue: "pending" },
    qr_token: { type: DataTypes.STRING, allowNull: true },
    expires_at: { type: DataTypes.DATE, allowNull: true },
  });

  LeaveRequest.associate = (models) => {
    LeaveRequest.belongsTo(models.User, { foreignKey: "studentId", as: "user" });
  };

  LeaveRequest.beforeCreate((leave) => {
    leave.qr_token = uuidv4();
    const expireTime = new Date();
    expireTime.setHours(expireTime.getHours() + 24);
    leave.expires_at = expireTime;
  });

  return LeaveRequest;
};
