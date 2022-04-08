const {Friend} = require('../models');


const friendData = [
    {
        user_1:1,
        user_2:4,
        are_friends:true

    },
    {
        user_1:2,
        user_2:4,
        are_friends:true

    },
    {
        user_1:3,
        user_2:4,
        are_friends:true
    }
];

const seedFriends = () => Friend.bulkCreate(friendData);

module.exports = seedFriends;