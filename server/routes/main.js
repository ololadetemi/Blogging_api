const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Routes
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "Blog API in nodejs",
            description: "Blog created with Nodejs, Express and MongoDB"
        }

        let perPage = 20;
        let page = req.query.page || 1;

        const data = await Post.aggregate([ {$sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
   
    
    

    
        res.render('index', { 
            locals, 
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
         });


    } catch (error) {
        console.log(error);

    }
});

/** POst :id */

router.get('/post/:id', async (req, res) => {
    try {

        const locals = {
            title: "",
            description:""
        }

        let slug = req.params.id;
        const data = await Post.findById({_id: slug })
        res.render('post', { locals, data });
    } catch (error) {
        console.log(error);
    }
});

/* Post- searchTerm */
router.post('/search', async (req, res) => {
    try {
      const locals = {
        title: "Search",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
  
      let searchTerm = req.body.searchTerm;
      const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")
  
      const data = await Post.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChar, 'i') }},
          { body: { $regex: new RegExp(searchNoSpecialChar, 'i') }}
        ]
      });
  
      res.render("search", {
        data,
        locals,
        currentRoute: '/'
      });
  
    } catch (error) {
      console.log(error);
    }
  
  });






router.get('/about', (req, res) => {
    res.render('about');
})
    






/*function insertPostData () {
    Post.insertMany([
        {
            title: "Building a blog with Node js1",
            body: "this is the body of the blog.Enjoy!"
        },
        {
            title: "Building a blog with Node js2",
            body: "this is the body of the blog.Enjoy!"
        },
        {
            title: "Building a blog with Node js3",
            body: "this is the body of the blog.Enjoy!"
        },
        {
            title: "Building a blog with Node js4",
            body: "this is the body of the blog.Enjoy!"
        },
        {
            title: "Building a blog with Node js5",
            body: "this is the body of the blog.Enjoy!"
        },
    ])
}
insertPostData();
*/

module.exports = router;
