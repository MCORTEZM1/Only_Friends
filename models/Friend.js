const { Model, DataTypes } = require('sequelize');
const { now } = require('sequelize/types/utils');
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
        user_id1: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        user_id2: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: 'user',
                key: 'id'
            }
        },
        are_friends:{
           type: DataTypes.BOOLEAN,
           defaultValue:false,
        },
        friends_since: {
            type:DataTypes.DATEONLY,
            allowNull:false,
            defaultValue:now
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
