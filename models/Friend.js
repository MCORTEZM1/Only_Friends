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
        friend_name: {
            type:DataTypes.STRING,
            references: {
                model: 'user',
                key: 'username'
            }
        },
        user_id: {
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
