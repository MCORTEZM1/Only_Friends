const {Friendship} = require('../models');


const friendshipData = [
    {
        user_id1:1,
        user_id2:4,
        date_est:2022/4/4

    },
    {
        user_id1:2,
        user_id2:4,
        date_est:2022/4/4

    },
    {
        user_id1:3,
        user_id2:4,
        date_est:2022/4/4
    },
    {
        user_id1:1,
        user_id2:2,
        date_est:2022/3/4
    },
    {
        user_id1:1,
        user_id2:3,
        date_est:2022/4/4
    }
];

const seedFriendship = () => Friendship.bulkCreate(friendshipData);

module.exports = seedFriendship;