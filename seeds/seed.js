const sequelize = require('../config/connection');
const { User, Event, Category, Order } = require('../models');

const userData = require('./userData.json');
const eventData = require('./eventData.json');
const categoryData = require('./categoryData.json');
const orderData = require('./orderData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const category = await Category.bulkCreate(categoryData, {
    individualHooks: true,
    returning: true,
  });

  for(const event of eventData) {
    await Event.create({
      ...event,
    });
  }
  const order = await Order.bulkCreate(orderData, {
    individualHooks: true,
    returning: true,
  })

  ;

  process.exit(0);
};

seedDatabase();
