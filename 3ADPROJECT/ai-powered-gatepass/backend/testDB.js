const { sequelize } = require('./models');

sequelize.authenticate()
  .then(() => console.log('✅ DB OK'))
  .catch(err => console.log('❌ DB Error:', err));
