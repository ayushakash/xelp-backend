const express = require ('express');
const customerData = require('./database.js')


const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var cors = require('cors');
app.use(cors());




app.post('/signup',async(req,res)=>{
    console.log("Request body: ", req.body)

    let data = req.body
    

    const xelp_data = new customerData(req.body);
    

    try {
        
        await xelp_data.save();       
        console.log('user saved sucessfully');
        
    } catch (error) {
        res.status(400)
        res.send('Data Not updated Please enter correct data');
    }


})

app.post('/login',async(req,res)=>{

    console.log(req.body);
    customerData.find({email:req.body.email}, function(err, data){
        

        
        console.log(data[0].password)
        
        
        if(req.body.password ===data[0].password){

            res.send("1");

        }
        else{

            res.send("0");
        }
        

        
    });


})













app.listen('4000',
    console.log('app running on port 4000')
)