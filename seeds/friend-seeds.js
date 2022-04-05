const {Friend} = require('../models');


const friendData = [
    {
        user_id_1:1,
        user_id_2:4
    },
    {
        user_id_1:2,
        user_id_2:4

    },
    {
        user_id_1:3,
        user_id_2:4
    }
];

const seedFriends = () => Friend.bulkCreate(friendData);

module.exports = seedFriends;