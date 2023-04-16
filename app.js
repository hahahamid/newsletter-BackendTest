// jshint eversion:6

const express = require("express"); 
const bodyParse = require("body-parser"); 
const request = require("request");
const https = require("https"); 


const app = express(); 

app.use(express.static("public")); 
app.use(bodyParse.urlencoded({extended:true})); 

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    
    const firstName = req.body.fName; 
    const lastName = req.body.lName; 
    const mailAddress = req.body.email; 

    var data = {
        members: [
            {
                email_address : mailAddress, 
                status : "subscribed", 
                merge_fields: {
                    FNAME : firstName,
                    LNAME : lastName,
                }
            }
        ]
    }; 


    const jsonData = JSON.stringify(data); 

    const url = "https://us21.api.mailchimp.com/3.0/lists/d82858b19e"


    const options = {
        method : "POST", 
        auth : "hamid1:18d3039cf41c29e7b309e8d9eebf9130-us21"
    }


    const request = https.request(url, options, function (response) {

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/sucess.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data", function (data) {
            console.log(JSON.parse(data)); 
        })
    })

    
    request.write(jsonData); 
    request.end(); 


})


app.post("/failure", function (req, res) {
    res.redirect("/");  
})


app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server started at port 3000"); 
})


//API KEY
// 18d3039cf41c29e7b309e8d9eebf9130-us21

//LIST ID
// d82858b19e 