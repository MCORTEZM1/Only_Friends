// importing post table/model from models folder 
const { Post } = require('../models');
// creating variable, an array ,  to store user seeds 
const postData = [
    {
        title: '',
        post_body: '',
        category_name: 'Business',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Cars',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Coding',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Crypto',
    },
    {
        title: '',
        post_body: '',
        category_name: 'DIY',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Fashion',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Finance',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Fitness',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Food',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Gaming',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Lifestyle',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Movie',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Music',
    },
    {
        title: '',
        post_body: '',
        category_name: 'News',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Parenting',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Pets',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Politics',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Sports',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Tech',
    },
    {
        title: '',
        post_body: '',
        category_name: 'Travel',
    },
{
    title: 'Hello World 1',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Cars', 
    user_id: 1,
    // channel_id: 1
},
{
    title: 'Hello World 2',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Gaming', 
    user_id: 1,
    // channel_id: 1
},
{
    title: 'Hello World 3',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Gaming', 
    user_id: 0,
    // channel_id: 0
},
{
    title: 'Hello World 4',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Gaming', 
    user_id: 0,
    // channel_id: 0
},
{
    title: 'Hello World 5',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Gaming', 
    user_id: 1,
    // channel_id: 1
},
{
    title: 'Hello World 6',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Gaming', 
    user_id: 3,
    // channel_id: 3
},
{
    title: 'Hello World 7',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Crypto', 
    user_id: 1,
    // channel_id: 1
},
{
    title: 'Hello World 8',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Crypto', 
    user_id: 2,
    // channel_id: 2
},
{
    title: 'Hello World 8',
    post_body: ' a;sldkfjalser ja;lsdfja;woeirjff;laks ;aslldkfjl;asjdfoin ;alskdfjp;kasd jl;akjsdf sj ;lkasjdf;laksjdfopewa ;lkjasdfl kjaweoi ;laskdjfi ;lkajsfpoujeag ;lkajsdf asr',
    category_name: 'Business', 
    user_id: 2,
    // channel_id: 2
},
];
// function to import seeds into the db upon command 'npm run seed'
const seedPosts = () => Post.bulkCreate(postData);
// exporting the function that creates and inserts the seeds into db 
module.exports = seedPosts;
