const User = require('./user');
const Category = require('./Category');
const Event = require('./Event');
const Order = require('./Order');
const Saved_event = require('./saved_event');

Order.belongsTo(Event,{
    foreignKey: 'event_id'
});

Event.hasMany(Order,{
    foreignKey: 'event_id'
});

Order.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(Order,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Saved_event.belongsTo(User,{
    foreignKey: 'user_id'
});

User.hasMany(Saved_event,{
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Saved_event.belongsTo(Event,{
    foreignKey: 'event_id'
});

Event.hasMany(Saved_event,{
    foreignKey: 'event_id',
    onDelete: 'CASCADE'
});

Event.belongsTo(Category,{
    foreignKey: 'category_id'
});

Category.hasMany(Event,{
    foreignKey: 'category_id',
})

User.belongsToMany(Event, {
    through:{
        model: Order,
        unique: false
    },
    
})

Event.belongsToMany(User,{
    through: {
        model:Order,
        unique:false
    },
})


module.exports = { Category, Event, Order, Saved_event, User };