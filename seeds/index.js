// importing seed functions from their respective files 
const seedUsers = require('./user-seeds');
const seedChannels = require('./channel-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
// importing sequelize 
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('....DATABASE SYNCED....');
    // place seed functions here in order of what is needed to be created first,
    //  in order to have the next aka comments would be after post, bc u need posts for comments to occur
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');

    await seedPosts();
    console.log('\n----- POSTS SEEDED -----\n');

    

    await seedComments();
    console.log('\n----- COMMENTS SEEDED -----\n');

    process.exit(0);
};
// invoke function to seedall and sync the database
seedAll();