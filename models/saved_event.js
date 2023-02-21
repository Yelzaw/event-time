
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Saved_event extends Model { }

Saved_event.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            // allowNull: true,
            primaryKey: true,
            // autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        event_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'event',
                key: 'id',
            },
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },        
        
        notes: {
            type: DataTypes.STRING
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'saved_event'
    }
);

module.exports = Saved_event;

