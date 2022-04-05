const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Friend extends Model { };

Friend.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id_1: {
            type:DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        user_id_2: {
            type: DataTypes.INTEGER,
            
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timeStamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'friend'
    }
);

module.exports = Friend;
