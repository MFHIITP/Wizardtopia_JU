const express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;
const router = express.Router();

const app = express();

app.set('/Wizartopia_Project');
app.set('view-engine', 'html');
app.use("/static", express.static('static'));

app.use(express.urlencoded());

app.get('/', (req,res)=>{
    res.status(200).sendFile(__dirname + "/Login.html");
});

app.listen(port, ()=>{
    console.log("http://localhost:3000");
});

const mongoose = require('mongoose');
const server = "hossainfarshid:JUITfh-891@clusterfarshid.vcl5snh.mongodb.net";
const database = "Wizardtopia";

const connect = async()=>{
    try{
        await mongoose.connect(`mongodb+srv://${server}/${database}`);
        console.log("Connecion Successful");
    }
    catch(err){
        console.log("Connection could not be established");
    }
}
connect();


var Schema = mongoose.Schema({
    name:String,
    year:String,
    branch:String,
    phone: Number,
    email:String,
    study:String
});
const Collection1 = mongoose.model("collection_1", Schema);


// app.post("/backend1.js", (req,res)=>{
//     console.log(5);
//     async function del1(){
//         let c = prompt("Enter your email address");
//         const dele = mongoose.model("collection_1").deleteOne({email: c});
//         console.log(dele);
//         if(dele.deletedCount == 0){
//             res.send("You have not registered");
//         }
//         else{
//             res.send("Your registration have been deleted");
//         }
//     }
//     del1();
// });


app.post("/backend_main.js", async (req, res)=>{
    var data = new Collection1(req.body);
    

    async function output(data, res){
        const same = await Collection1.find({email: data.email});
        try{
            const value = await same[0].email;
            if(value){
                res.send("You have already registered before. Please contact the admin if you want to reenter");
            }
        }
        catch(err){
            data.save().then(()=>{
                res.status(200).send("Your data has been updated to the database. Please exit the website");
            }).catch(()=>{
                res.send("OOPs, The data has not been saved. Please try again");
            });
        }
    }

    output(data, res);
    
});

// app.post == form action. The form action actions on the backend.js
// Therefore, the app that is the form itself will action or post on the backend.js.
// Thar is why, app.post os backend.js as well as the real app(form).post(action), form.action is backend.js


app.post("/backend1.js", async(req,res)=>{
    async function del(){
        const email = req.body.email;
        const confirm = req.body.confirm;
        if(confirm == "on"){
            try{
                const dele = await mongoose.model("collection_1").deleteOne({email: email});
                if(dele.deletedCount == 0){
                    res.send("Your name has not been registered. Please register youtself.");      
                }
                else{
                    res.send("Your account has been successfully deleted.");
                }
            }
            catch(err){
                res.send("Unexpected server or network issue.");
            }
        }
    }
    del();
});



app.post("/backend_register.js", async(req, res)=>{
    var data = req.body;

    async function output(data, res){
        const mail = await Collection1.find({email: data.email});
        try{
            const value = await mail[0].email;
            if(value){
                res.send("You have already registered before. Please contact the admin if you want to reenter");
            }
        }
        catch(err){
            res.status(200).sendFile(__dirname + "/static/form.html");
        }
    }

    output(data, res);
});

app.post("/backend_login.js", async(req,res)=>{
    var data = req.body;
    async function output(data, res){
        const mail = await Collection1.find({email: data.email});
        try{
            const value = await mail[0].email;
            if(value){
                res.status(200).sendFile(__dirname + "/static/index.html"); 
            }
        }
        catch(err){
            res.send("You have not yet registered. Please register");
        }
    }
    
    output(data, res);
});


app.post("/backend_view.js", async(req, res)=>{
    var data = req.body.email;
    async function out(data, res){
        try{
            const fn = await mongoose.model("collection_1").findOne({email: data});
            res.send(fn);
        }
        catch(err){
            res.send("You have not registered.");
        }

    }
});