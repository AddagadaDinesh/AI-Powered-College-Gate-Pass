// backend/models/qrLog.js
module.exports = (sequelize, DataTypes) => {
  const QRLog = sequelize.define("QRLog", {
    qr_token: { type: DataTypes.STRING, allowNull: false },
    scanned_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  });

  QRLog.associate = (models) => {
    QRLog.belongsTo(models.User, { foreignKey: "userId", as: "user" }); // student who owns the leave
    QRLog.belongsTo(models.LeaveRequest, { foreignKey: "leaveId", as: "leave" });
  };

  return QRLog;
};
