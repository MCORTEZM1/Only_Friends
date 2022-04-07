const {Model, DataTypes} = require('sequelize');
const sequelize= require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    validatePassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password);
    }
};

User.init(
    {
        // id column takes integers, primarykey, cant be null, autoincrement 
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull:false,
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // username column takes a string cannot be null
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        // email column takes string , cant be null, checks for email format, unqiue 
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                isEmail:true
            }
        },
        // password column takes a string , cant be null and validates if the length is between 3 and 15 chars
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[3,15]
            }
        }
    },
    {
    // i think hooks are supposed to go here but not sure if we need it 
        hooks: {
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            async beforeUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updateUser.password, 10);
                return updateUser;
            }
        },
        sequelize,
        timeStamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'user'
    }
);

module.exports = User;