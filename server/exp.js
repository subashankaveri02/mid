const express=require('express');
const app=express();
app.use(express.json());
const students=[
    {
        id:1,
        nmae:"Subash",
        email:"abc@gmail.com",
        sem:3
    },
    {
        id:2,
        nmae:"Kaveri",
        email:"def@gmail.com",
        sem:3
    }

];
app.get('/api/students',(req,res)=>{
    res.status(200).json(students);
});
app.get('/api/students/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const st=students.find(s=>s.id===id);
    if(!st){
        return res.status(404).json({message:"Not Found"});
    }
    res.status(200).json(st);
});
app.post('/api/students',(req,res)=>{
    const {name,email,course,sem}=req.body;
    if(!name||!email||!course||!sem){
        return res.status(404).json({message:"All fields required"});

    }
    const newstu={
        id:students.length>0?Math.max(...students.map(s=>s.id))+1:1,
        name,email,course,sem
    };
    students.push(newstu);
     res.status(200).json({message:"Successfully added",students});
});
app.put('/api/students/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const st=students.find(s=>s.id===id);
    if(!st){
        return res.status(404).json({message:"Not Found"});
    }
    const {name,email,course,sem}=req.body;
    if(name) students.name=name;
    if(email) students.email=email;
    if(course) students.course=course;
    if(sem) students.sem=sem;
    res.status(200).json({message:"Successfully updated",students});
});
app.delete('/api/students/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const st=students.find(s=>s.id===id);
    if(!st){
        return res.status(404).json({message:"Not Found"});
    }
    students=students.filter(s=>s.id!==id);
    res.status(200).json({message:"Successfully deleted",students});
});
app.listen(3000,()=>{
    console.log("RESTAPI SERVER ruuning at http:localhost/3000")
});