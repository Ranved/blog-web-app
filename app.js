const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to serve static files and parse request body
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Simulated in-memory database for posts
let posts = [];

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Home route - Display all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// New post route - Show form to create a new post
app.get('/new', (req, res) => {
    res.render('new-post');
});

// Post creation route - Handle form submission to add a new post
app.post('/new', (req, res) => {
    const { title, content } = req.body;
    const newPost = { id: posts.length + 1, title, content };
    posts.push(newPost);
    res.redirect('/');
});

// Edit post route - Display form to edit an existing post
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit-post', { post });
});

// Update post route - Handle post updates
app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    post.title = title;
    post.content = content;
    res.redirect('/');
});

// Delete post route
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
