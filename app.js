const express = require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https =require("https")


const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));
app.get("/",function(rec,res){
    res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
  
const firstName=req.body.fname;
const lastName= req.body.lname;
const email= req.body.email;
//console.log(firstName, lastName, email); 
const data={
    members:[{
        email_address:email,
        status: "subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }]
};
const jsonData = JSON.stringify(data);
const url='https://us21.api.mailchimp.com/3.0/lists/2b7703f063'

const options = {
    method : "POST",
    auth:"yeabsra:334286d13ba1339aca534c7348310946-us21"
}

const request = https.request(url,options, function(response){
    
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")
    }
    
    response.on("data",function(data){
        console.log(JSON.parse(data)); 
    })
})
  request.write(jsonData);
  request.end();  
})

app.listen(3000,function(){
    console.log("Server running on port 3000"); 
})
//334286d13ba1339aca534c7348310946-us21
//2b7703f063