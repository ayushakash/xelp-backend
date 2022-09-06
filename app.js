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
    // let data = req.body

    const xelp_data = new customerData(req.body);    

    try {
        let foundUser = await customerData.findOne({ email: req.body.email })
        console.log({ foundUser })

        if (!foundUser) {
            // register the user
            
            let user = await xelp_data.save();       
            console.log('user saved sucessfully', user);
            res.status(200).send({
                success: true,
                message: "User registered successfully",
                statusCode: 200
            })
        } else {
            // user already exists
            console.log("user already exists")
            res.status(401).send({
                success: false,
                message: "User already exists",
                statusCode: 401
            })
        }
        
        await xelp_data.save();       
        console.log('user saved sucessfully');
        
    } catch (error) {
        console.log(error)
        res.status(400)
        res.send('Data Not updated Please enter correct data');
    }


})

app.post('/login' ,async( req,res) => {

    console.log(req.body);
    console.log("Email: ", req.body.email)
    console.log("Password: ", req.body.password)

    let response = await customerData.findOne({ email: req.body.email });
    console.log("Response: ", response, typeof response)

    if (!response) {
        // console.log("Email address is not found in the database")
        res.status(404).send({
            success: false,
            message: "Email address is not found in the database",
            statusCode: 404
        })
        return
    }


    if (response.password != req.body.password) {
        res.status(401).send({
            success: false,
            message: "Password is not matching",
            statusCode: 401
        })
    } else {
        res.status(200).send({
            success: true,
            message: "Email and password matching",
            statusCode: 200
        })
    }
})













app.listen('4000',
    console.log('app running on port 4000')
)