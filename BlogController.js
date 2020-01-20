const {Blog} = require('../models');

module.exports = {
    // Create a new Blog
    async createBlog(req, res) {
        try {
            const blogData = await Blog.create(req.body);
            console.log(req.body);
            res.send(blogData)
        } catch (err) {
            res.status(400).send({})
        }
    },
    // Get Single blog with ID
    async getBlog(req, res) {
        try {
            const blogId = req.params.blogId;
            const blog = await Blog.findOne({
                where: {
                    id: blogId
                }
            });

            // Blog does not exist
            if (!blog) {
                res.status(403).send({
                    error: ' Blog Post does not exist'
                })
            }
            // Convert blog to JSON data
            const blogJson = blog.toJSON();

            //Send Single blog to Front-End to display
            res.send({
                blog: blogJson
            })
        } catch (e) {
            res.status(400).send({
                error: e
            })
        }
    },
    // Get all existing blogs
    async getAll(req, res) {
        try {
            const allBlogs = await Blog.findAll();
            //Send all existing Blogs to Front-End to display
            res.send({
                Blogs: allBlogs
            })
        } catch (e) {
            res.status(400).send({
                error: e
            })
        }
    }
};