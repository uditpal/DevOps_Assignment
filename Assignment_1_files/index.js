const express=require('express'),
app=express(),
path=require('path'),
{v4:uuid}=require('uuid'),
methodOverride=require('method-override'),
port=process.env.PORT||3000;

let comments=[
{id:uuid(),username:'Todd',comment:'lol that is so funny'},
{id:uuid(),username:'Skyler',comment:'I like to go birdwatching with my dog'},
{id:uuid(),username:'Sk8erBoi',comment:'Plz delete your account, Todd'},
{id:uuid(),username:'onlysayswoof',comment:'woof woof woof'},
]
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'views'));
app.use(methodOverride('_method'));
app.use(express.json());

// GET /comments :-list all comments;
app.get('/',(req,res)=>{
    res.redirect('/comments');
})
app.get('/comments',(req,res)=>{
res.render('comments/index',{comments:comments});
});

// GET /comments/new :for new comment post page.
app.get('/comments/new',(req,res)=>{
res.render('comments/new');
})
// POST /comments :-Create a new comment.
app.post("/comments", (req, res) => {
const {username,comment}=req.body;
comments.push({username,comment,id:uuid()});
res.redirect('/comments');
});
// GET /comments/:id :-Get a particular comment using id;
app.get("/comments/:id", (req, res) => {
const{id}=req.params;
const comment=comments.find((c)=>c.id===id);
console.log(comment)
res.render('comments/show',{ comment });
});

app.get("/comments/:id/edit", (req, res) => {
const {id}=req.params;
const foundComment=comments.find((c)=>c.id===id);
res.render('comments/edit',{ comment:foundComment });
});

// PATCH /comments/:id/edit :- Update(Edit) a particular comment using id;
app.patch("/comments/:id/edit",(req,res)=>{
const {id}=req.params;
console.log(req.body);
const foundComment=comments.find((c)=>c.id===id);
foundComment.comment=req.body.comment;
console.log(foundComment);
res.redirect('/comments');
});
// DELETE /comments/:id:- Delete a particular comment using id;
app.delete("/comments/:id",(req,res)=>{
const {id}=req.params;
comments=comments.filter(c=> c.id!==id);
res.redirect('/comments');
});
app.listen(port,()=>console.log(`Server listen on ${port} 🔥`));