// require to use sequelize
const { Model, DataTypes } = require('sequelize');
//required to use sequelize
const sequelize = require('../config/connection');
// creatae our model
class Post extends Model { }

// Initiates models and holds properties
// figure out how to make the model have media in the prop. consider using urls. Save the urls as strings
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        image_path: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        // address string length in the future for title
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            //   len is for the length of characters min 2 and a max of 50
            len: [2,50]
        },
        post_body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // this is our foreign key for our reference 
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
            modelName: 'post'
        }
);

module.exports = Post;