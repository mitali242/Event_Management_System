const nodemailer = require('nodemailer');
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require('dotenv').config()
const crypto = require("crypto");

const mailkey = process.env.GMAIL_SECRET_KEY
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN


const bcrypt = require('bcrypt');
const { response } = require("express");
const { useState } = require("react");
const e = require("express");
const { link } = require("fs-extra");
const { render } = require('react-dom');
const { combineReducers } = require('redux');
const { Redirect } = require('react-router');
const { O_SYMLINK } = require('constants');
const saltRounds = 10
const stripe = require('stripe')('sk_test_51ImV2tSAmoTezFtzO6Sv7eq7q6imIjzQRS96eRMP836ltTDZ2212mS6xiZXDtGBxXRaHmwldgR4EPhrUWVVO03BU009KDLZkN6');
 
const app = express();
app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET","POST"],
    credentials: true
}));
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session ({
    key: "userid",
    secret:"subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expire: 60*60*24
    },
})
);

const db = mysql.createConnection(
    {
        user:"root",
        host:"localhost",
        database:"event2",
    }
);
db.connect(function(error) {
    if (!!error) {
        console.log('Error');}
    else {
        console.log('connected');
    }
        
});

let userotp = 0;

app.post('/Register',(req,res) => {
    const Admin_name= req.body.Admin_name;
    const Password= req.body.Password;
    const Admin_emailID= req.body.Admin_emailID;
    const Admin_ContNo= req.body.Admin_ContNo;
    const Admin_add= req.body.Admin_add;
    const name= req.body.name;
    bcrypt.hash(Password,saltRounds, (err,hash) =>{
        if (err) {
            console.log(err)
        }
        const sqlselectad = "SELECT Admin_Username FROM adminlog WHERE Admin_Username=?";
        db.query(sqlselectad,[Admin_name],(err,result)=>{
            if(result.length > 0)
                     {
                        /* console.log("Venue already booked by someone else on that date..."); */
                        res.send({message:"username already exists.."});
                     }
                
                    })
        

        const sqlInsertA= "INSERT INTO adminlog (Admin_Username,password,Admin_emailID,Admin_ContNo,Admin_add,Ad_name) VALUES (?,?,?,?,?,?)";
        db.query(sqlInsertA,[Admin_name,hash,Admin_emailID,Admin_ContNo,Admin_add,name],(err,result) => {
            console.log(err); 


        const sqlselectad = "SELECT * FROM adminlog WHERE Admin_Username=?";
        db.query(sqlselectad,[Admin_name],(err,result)=>{
            if(result.length>0){
           res.send({message:"Register successfully"})
            }
        })


    }
    )
    })
});
app.post('/Signin',(req,res) => {
    const C_name= req.body.C_name;
    const name=req.body.name;
    const C_Password= req.body.C_Password;
    const C_emailid= req.body.C_emailid;
    const C_ContNo= req.body.C_ContNo;
    const C_add= req.body.C_add;
    const C_IDproof=req.body.C_IDproof;
    const C_IDproofNo=req.body.C_IDproofNo;
    bcrypt.hash(C_Password,saltRounds, (err,hash) =>{
        if (err) {
            console.log(err)
        }
        const sqlselectbk = "SELECT C_name FROM customerlog WHERE C_name=?";
        db.query(sqlselectbk,[C_name],(err,result)=>{
            if(result.length > 0)
                     {
                        /* console.log("Venue already booked by someone else on that date..."); */
                        res.send({message:"username already exists.."});
                     }
                
                    })
        const sqlInsert2= "INSERT INTO customerlog (C_name,name,C_ContNo,C_emailID,C_Password,C_add,C_IDproof,C_IDproofNo) VALUES (?,?,?,?,?,?,?,?)";
        db.query(sqlInsert2,[C_name,name,C_ContNo,C_emailid,hash,C_add,C_IDproof,C_IDproofNo],(err,result) => {
            console.log(err);
            const sqlselectbk = "SELECT * FROM customerlog WHERE C_name=?";
        db.query(sqlselectbk,[C_name],(err,result)=>{
            if(result.length>0){
           res.send({message:"Register successfully"})
            }
        })

    }
    )
})
});
app.post('/Signup',(req,res) => {
    const VAdmin_name= req.body.VAdmin_name;
    const password= req.body.password;
    const VAdmin_emailID= req.body.VAdmin_emailID;
    const VAdmin_ContNo= req.body.VAdmin_ContNo;
    const VAdmin_add= req.body.VAdmin_add;
    const name=req.body.name;
    bcrypt.hash(password,saltRounds, (err,hash) =>{
        if (err) {
            console.log(err)
        }
        const sqlselectbk = "SELECT VAdmin_name FROM vadminlog WHERE VAdmin_name=?";
        db.query(sqlselectbk,[VAdmin_name],(err,result)=>{
            if(result.length > 0)
                     {
                        /* console.log("Venue already booked by someone else on that date..."); */
                        res.send({message:"username already exists.."});
                     }
                
                    })
        const sqlInsertVa= "INSERT INTO vadminlog (VAdmin_name,password,VAdmin_emailID,VAdmin_ContNo,VAdmin_add,name) VALUES (?,?,?,?,?,?)";
        db.query(sqlInsertVa,[VAdmin_name,hash,VAdmin_emailID,VAdmin_ContNo,VAdmin_add,name],(err,result) => {
            console.log(err);


            const sqlselectVa = "SELECT * FROM vadminlog WHERE VAdmin_name=?";
        db.query(sqlselectVa,[VAdmin_name],(err,result)=>{
            if(result.length>0){
           res.send({message:"Register successfully"})
            }
         })
        }
        )
    })
});
app.get("/get_venue_places",(req,res)=>{

    const selectvenue="SELECT 	Venue_name,Venue_rate from addvenue";
    db.query(selectvenue,(err,result_venue)=>{
         /* console.log(result_venue); */ 
        res.send(result_venue);
       
    });
    }); 
    
    
app.get("/get_venue_rates",(req,res)=>{
    
        const selectvenuerate="SELECT Venue_name,Venue_rate from addvenue";
        db.query(selectvenuerate,(err,result_venuerate)=>{
             /* console.log(result_venuerate); */ 
            res.send(result_venuerate);
           
        });
        }); 

        app.get("/get_venue_feed",(req,res)=>{

            const selectfeed="SELECT * from c_feedback";
            db.query(selectfeed,(err,result_feed)=>{
                 /* console.log(result_venue); */ 
                res.send(result_feed);
               
            });
            }); 
app.post("/searching",(req,res) => {
   
            const searchdate=req.body.searchdate;
            const serachterm=req.body.serachterm;
        
            const sqlsearch="SELECT Event_place,Bookdate from booking WHERE Bookdate=(?)";
            const temp=db.query(sqlsearch,[searchdate],(err,result1)=>{
        
                if(temp!=null)
                {
                    console.log(result1);
                   console.log(result1.length);
                }
        
                if(result1.length >= 0)
                {
                    for(var i=0;i<(result1.length);i++)
                    {
        
                        if((result1[i].Event_place)==serachterm)
                         {
                            
                            res.send({message:"Venue already booked by someone else on that date..."});
                            break;
                         }
                         else
                         {
                            
                            res.send({message:"Venue available on that date..."});
                         }
                    }
                }
                else 
                {
                    
                    res.send({message:"Venue available on that date..."});
                }
                
            })
        });
        
        
        
        

app.post("/sendEmail",(req,res)=> {
    const emailID  = req.body.Admin_emailID;
    const otp = Math.floor(100000 + Math.random()*900000)
    userotp = otp;
    const ttl = 2*60*1000
    const expires = Date.now() +ttl;
    const data = `${emailID}.${otp}.${expires}`
    const hash = crypto.createHmac('sha256', `mailkey`).update(data).digest('hex')
    const fullhash = `${hash}.${expires}`
    const user=  req.body.Admin_name;
    const selectAd = "SELECT * FROM adminlog WHERE  Admin_emailID=?"
    db.query(selectAd,[emailID],(err,result) => {
           if(result.length > 0){
        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4458d9e0f8ae6c",
              pass: "f66e29c129e21f"
            }
          });
          res.status(200).send({emailID,hash:fullhash})
               var currentDateTime = new Date();
                 var mailOptions = {
                   from: 'mitalikotecha08@gmail.com',
                  to:`${emailID}`,
                   subject:'Password reset',
                   html:"<h1>Welcome to daily task report <h1>\
                   <p><h3>Hello<h3>\
                   You are receiving this because you (or someone else) have requested the reset of the password for your account,Please check the following otp , and verify it</h1><br/>"
                  + "Your one time password is "+otp+""+currentDateTime+"<a href='http://localhost:3000/Resetpass/'>Click here to reset your password</a>"
                  
                
               };
           
        
       transporter.sendMail(mailOptions, function(error,info){
        if(error) {
            console.log(error);
        }else{
            console.log('EMail sent:' +info.response);
            if(info.response){
                res.send({message:"email send on your mail id"});
            }
            user.updateOne({email: userData.emailID},{
                token: currentDateTime,
            }, {multi: true},function(err,affected,resp) {
                return res.status(200).json({
                    success: false,
                    msg: info.response,
                    userlist: resp,
                });
            })
          }
         });
        }
         else{
            res.send( {message:"wrong mail id"} )
         }
        
        })
     });           
app.post("/resetpass",function(req,res){
    const user=  req.body.Admin_name;
    const newpassword=  req.body.newpassword;
    const confirmpassword=  req.body.confirmpassword;
    const selectrt = "SELECT Admin_Username FROM adminlog WHERE Admin_Username=?";
    db.query(selectrt,[user],(err,result1) => {
        if(newpassword === confirmpassword)
        {
                bcrypt.hash(confirmpassword,saltRounds,(err,hash) =>{
                    if(err) throw err;
                        const updatead= `UPDATE adminlog SET Password = '${hash}' WHERE Admin_Username= ?`;
                        db.query(updatead,[user],(err,result)=>{
                        if(result1.length>0){
                            console.log({success: true});
                            res.send({message: "Your password successfully updated"});
                            }
                        else{
                            if(result1.length === 0){
                                    console.log({success: false });
                                        res.send({message: "user not found"});
                            }      
                                   
                        
                        }
                    });
                    });
                
        }})
    
    })
app.post("/sendEmailC",(req,res)=> {
    const C_emailID  = req.body.C_emailID;
    const otp = Math.floor(100000 + Math.random()*900000)
    userotp = otp;
    const ttl = 2*60*1000
    const expires = Date.now() +ttl;
    const data = `${C_emailID}.${otp}.${expires}`
    const hash = crypto.createHmac('sha256', `mailkey`).update(data).digest('hex')
    const fullhash = `${hash}.${expires}`
    const user=  req.body.C_name;
    const selectC = "SELECT * FROM customerlog WHERE C_emailID = ?"
    db.query(selectC,[C_emailID],(err,result) => {
        if(result.length>0){
        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4458d9e0f8ae6c",
              pass: "f66e29c129e21f"
            }
          });
          res.status(200).send({C_emailID,hash:fullhash})
               var currentDateTime = new Date();
                 var mailOptions = {
                   from: 'mitalikotecha08@gmail.com',
                  to:`${C_emailID}`,
                   subject:'Password reset',
                   html:"<h1>Welcome to daily task report <h1>\
                   <p><h3>Hello<h3>\
                   You are receiving this because you (or someone else) have requested the reset of the password for your account,Please check the following otp , and verify it</h1><br/>"
                  + "Your one time password is "+otp+""+currentDateTime+"<a href='http://localhost:3000/resetpass/'>Click here to reset your password</a>"
                  
                
               };
           
        
       transporter.sendMail(mailOptions, function(error,info){
        if(error) {
            console.log(error);
        }else{
            console.log('EMail sent:' +info.response);
            if(info.response){
                res.send({message:"email send on your mail id"});
            }
            user.updateOne({email: userData.C_emailID},{
                token: currentDateTime,
            }, {multi: true},function(err,affected,resp) {
                return res.status(200).json({
                    success: false,
                    msg: info.response.hash,
                    userlist: resp,
                });
            })
          }
         });
        }
        else{
            res.send( {message:"wrong mail id"} )
         }
     })
    });
    
app.post("/resetpass1",function(req,res){
    const user=  req.body.C_name;
    const newpassword=  req.body.newpassword;
    const confirmpassword=  req.body.confirmpassword;
    const selectrt = "SELECT C_name FROM customerlog WHERE C_name=?";
    db.query(selectrt,[user],(err,result2) => {
        if(newpassword === confirmpassword)
        {
                bcrypt.hash(confirmpassword,saltRounds,(err,hash) =>{
                    if(err) throw err;
                        const updatead= `UPDATE customerlog SET C_Password = '${hash}' WHERE C_name= ?`;
                        db.query(updatead,[user],(err,result)=>{
                            if(result2.length>0){
                                console.log({success: true});
                                res.send({message: "Your password successfully updated"});
                                }
                            else{
                                if(result2.length === 0){
                                        console.log({success: false });
                                            res.send({message: "user not found"});
                                }   
                        
                        }
                    });
                    });
                
        }})
      
    })   
app.post("/sendEmailV",(req,res)=> {
    const VAdmin_emailID  = req.body.VAdmin_emailID;
    const otp = Math.floor(100000 + Math.random()*900000)
    userotp = otp;
    const ttl = 2*60*1000
    const expires = Date.now() +ttl;
    const data = `${VAdmin_emailID}.${otp}.${expires}`
    const hash = crypto.createHmac('sha256', `mailkey`).update(data).digest('hex')
    const fullhash = `${hash}.${expires}`
    const user=  req.body.VAdmin_name;
    const selectVa = "SELECT * FROM vadminlog WHERE  VAdmin_emailID=?"
    db.query(selectVa,[VAdmin_emailID],(err,result) => {
        if(result.length>0){
        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4458d9e0f8ae6c",
              pass: "f66e29c129e21f"
            }
          });
          res.status(200).send({VAdmin_emailID,hash:fullhash})
               var currentDateTime = new Date();
                 var mailOptions = {
                   from: 'mitalikotecha08@gmail.com',
                  to:`${VAdmin_emailID}`,
                   subject:'Password reset',
                   html:"<h1>Welcome to daily task report <h1>\
                   <p><h3>Hello<h3>\
                   You are receiving this because you (or someone else) have requested the reset of the password for your account,Please check the following otp , and verify it</h1><br/>"
                  + "Your one time password is "+otp+""+currentDateTime+"<a href='http://localhost:3000/Resetpass/'>Click here to reset your password</a>"
                  
                 
               };
           
        
       transporter.sendMail(mailOptions, function(error,info){
        if(error) {
            console.log(error);
        }else{
            console.log('EMail sent:' +info.response);
            user.updateOne({email: userData.VAdmin_emailID},{
                token: currentDateTime,
            }, {multi: true},function(err,affected,resp) {
                return res.status(200).json({
                    success: false,
                    msg: info.response,
                    userlist: resp,
                });
            })
          }
         });
        }
        else{
            res.send( {message:"wrong mail id"} )
         }
     })
});     
app.post("/resetpass2",function(req,res){
    const user=  req.body.VAdmin_name;
    const newpassword=  req.body.newpassword;
    const confirmpassword=  req.body.confirmpassword;
    const selectrt = "SELECT VAdmin_name FROM vadminlog WHERE VAdmin_name=?";
    db.query(selectrt,[user],(err,result1) => {
        if(newpassword === confirmpassword)
        {
                bcrypt.hash(confirmpassword,saltRounds,(err,hash) =>{
                    if(err) throw err;
                        const updatead= `UPDATE vadminlog SET password = '${hash}' WHERE VAdmin_name= ?`;
                        db.query(updatead,[user],(err,result)=>{
                            if(result1.length>0){
                                console.log({success: true});
                                res.send({message: "Your password successfully updated"});
                                }
                            else{
                                if(result1.length === 0){
                                        console.log({success: false });
                                            res.send({message: "user not found"});
                                }   
                        
                        }
                    });
                    });
                
        }})
    
    })
app.post("/sendPayment",(req,res)=> {
    const C_emailid = req.body.C_emailid;
  const selectC = "SELECT * FROM customerlog WHERE C_emailid = ?"
    db.query(selectC,[C_emailid],(err,result) => {
        var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "4458d9e0f8ae6c",
              pass: "f66e29c129e21f"
            }
          });
          res.status(200).send({C_emailid})
               var currentDateTime = new Date();
                 var mailOptions = {
                   from: 'mitalikotecha08@gmail.com',
                    to:`${C_emailid}`,
                   subject:'Payment successful',
                   html:"<p><h2>Hello<h2>"+C_emailid+"\
                       <h1>your payment is successfull <h1><p>Thank You"
    };



    transporter.sendMail(mailOptions, function(error,info) {
        if(error) {
            console.log(error);
        }else{
            console.log('EMail sent:' +info.response);
            if(info.response){
                res.send({message:"email send on your mail id"});
            }
            user.updateOne({email: userData.C_emailid},{
                token: currentDateTime,
            }, {multi: true},function(err,affected,resp) {
                return res.status(200).json({
                    success: false,
                    msg: info.response,
                    userlist: resp,
                });
            })
          }
         });
     })
}); 
app.post('/Verifyotp',(req,res)=>{
    //const Admin_emailID = req.body.Admin_emailID;
    const userotp1 = req.body.userotp1;
    console.log(userotp);
    console.log(userotp1);

    if(req.body.userotp1==userotp){
        res.send({message1:"user confirmed"});
    }
    else{
       // console.log("wrong otp");
        res.send({message:"incorrect otp"});
    }
    //const otp = Math.floor(100000 + Math.random()*900000)
})
    
app.post('/Verifyotp1',(req,res)=>{
     //const Admin_emailID = req.body.Admin_emailID;
     const userotp1 = req.body.userotp1;
     console.log(userotp);
     console.log(userotp1);
 
     if(req.body.userotp1==userotp){
         res.send({message1:"user confirmed"});
     }
     else{
        // console.log("wrong otp");
         res.send({message:"incorrect otp"});
     }
})
app.post('/Verifyotp2',(req,res)=>{
    //const Admin_emailID = req.body.Admin_emailID;
    const userotp1 = req.body.userotp1;
    console.log(userotp);
    console.log(userotp1);

    if(req.body.userotp1==userotp){
        res.send({message1:"user confirmed"});
    }
    else{
       // console.log("wrong otp");
        res.send({message:"incorrect otp"});
    }
})
/*app.post("/Verifyotp",function(req,res){
    const userotp = req.body.userotp;
    var otp;
   if(userotp === otp){
    console.log({msg:`user confirmed`})}
    else{
    console.log({verification: false,msg: 'incorrect otp'}); 
   }
})*/

app.post("/submit1",(req,res) => {
    const Feed_description= req.body.Feed_description;
    const Feed_rate = req.body.Feed_rate;
    const username = req.body.username;
    
    const sqlforkeyfd="SELECT C_ID from customerlog where C_name=(?)";
    db.query(sqlforkeyfd,[username],(err,result) => {
        console.log(result); 
        console.log(result[0].C_ID);
    const sqlInsertFd= "INSERT INTO c_feedback (Feed_description,Feed_rate,C_ID) VALUES (?,?,?)";
    db.query(sqlInsertFd,[Feed_description,Feed_rate,result[0].C_ID],(err,result) => {
        console.log(err);
    }
    )
    })
});
app.post("/submit2",(req,res) => {
    const Feed_description= req.body.Feed_description;
    const Feed_rate = req.body.Feed_rate;
    const username=req.body.username;

    const sqlforkeyfdv="SELECT VAdmin_Id from vadminlog where VAdmin_name=(?)";
    db.query(sqlforkeyfdv,[username],(err,result)=>{
        console.log(result);
        console.log(result[0].VAdmin_Id);
    const sqlInsertFd1= "INSERT INTO va_feedback (Feed_description,Feed_rate,VAdmin_Id) VALUES (?,?,?)";
    db.query(sqlInsertFd1,[Feed_description,Feed_rate,result[0].VAdmin_Id],(err,result) => {
        console.log(err);
    }
    )
})
});
app.post("/upload",(req,res) => {
    const username = req.body.VAdmin_name;
    const Venue_name= req.body.Venue_name;
    const Venue_add = req.body.Venue_add;
    const Venue_capacity = req.body.Venue_capacity;
    const Venue_rate = req.body.Venue_rate;
    const sqlforkeyv="SELECT VAdmin_Id from  vadminlog WHERE VAdmin_name=?";
    db.query(sqlforkeyv,[username],(err,result)=>{
        if(result.length === 0){
            console.log({success: false });
                res.send({message: "user not found"});
    }  
        console.log(result[0].VAdmin_Id)
        if(result.length > 0) {
        const sqlInsertad= "INSERT INTO addvenue (Venue_name,Venue_add,Venue_capacity,Venue_rate,VAdmin_Id) VALUES (?,?,?,?,?)";
        db.query(sqlInsertad,[Venue_name,Venue_add,Venue_capacity,Venue_rate,result[0].VAdmin_Id],(err,result) => {
            //console.log(err);
            
            console.log(result);
                res.send({message:"Venue upload successfully"});

        })
    }/*else{
        if(result.length === 0){
                console.log({success: false });
                    res.send({message: "user not found"});
        }   */
    })

});
app.post("/submit",(req,res) => {
    const C_emailID  = req.body.C_emailID;
 const Event_name= req.body.Event_name;
    const Noofguest = req.body.Noofguest;
    const Bookdate = req.body.Bookdate;
    const Paymentdate = req.body.Paymentdate;
    const Event_place = req.body.Event_place;
    const Pay_amount = req.body.Pay_amount;
    console.log(Bookdate);
    const sqlsearch="SELECT Bookdate from booking WHERE Bookdate=(?)";
    const temp=db.query(sqlsearch,[Bookdate],(err,result1)=>{

        if(temp!=null)
        {
            console.log(result1);
           console.log(result1.length);
        }

        if(result1.length > 0)
        {
                    /* console.log("Venue already booked by someone else on that date..."); */
                    res.send({message:"Venue already booked by someone else on that date..."});
        }
        else{
    const sqlforkeybkv="SELECT Venue_ID from addvenue WHERE Venue_name=(?)"
    db.query(sqlforkeybkv,[Event_place],(err,result3)=>{
        console.log(result3);
        console.log(result3[0].Venue_ID);

        const sqlforkeybkc="SELECT C_ID from customerlog where 	C_emailID=(?)";
        db.query(sqlforkeybkc,[C_emailID],(err,result2) => {
           
            console.log(result2); 
            console.log(result2[0].C_ID);

            if(result2.length > 0) {
    const sqlInsertbk= `INSERT INTO booking (Event_name,Noofguest,Bookdate,Paymentdate,Event_place,Payment,C_ID,Venue_ID) VALUES (?,?,?,?,?,?,?,?)`;
    db.query(sqlInsertbk,[Event_name,Noofguest,Bookdate,Paymentdate,Event_place,Pay_amount,result2[0].C_ID ,result3[0].Venue_ID],(err,result) => {
        console.log(result);
})
            }
    });

});
        }
});


        const selectAd = "SELECT * FROM customerlog WHERE  C_emailID=?"
        db.query(selectAd,[C_emailID],(err,result) => {
      var transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "4458d9e0f8ae6c",
          pass: "f66e29c129e21f"
        }
      });

      res.status(200).send({C_emailID})
           var currentDateTime = new Date();
             var mailOptions = {
               from: 'mitalikotecha08@gmail.com',
                to:`${C_emailID}`,
               subject:'Booking confirmed',
               html:"<h2>Hello<h2>"+C_emailID+"\
                  <p> <h4>We are pleased to inform you that your booking is confirmed for your event.</br>\
                 <h2> <center> Invoice </center></h2>\
                  <hr veritical size=2 width = 100% color=black>\
                  <p><h4>Booking details<h4><p>\
                  <hr veritical size=2 width = 100% color=black>\
                  <p><h4>Venue for event:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+Event_place+"</h4>\
                  <p><h4>Your Event:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+Event_name+"</h4>\
                  <p><h4>No of Guest:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+Noofguest+"</h4>\
                  <p><h4>Book date:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp     "+Bookdate+"</h4>\
                  <p><h4>Pay Amount:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspRs&nbsp&nbsp  "+Pay_amount+"</h4>\
                  <p><h4>Payment date:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"+Paymentdate+"</h4>\
                  <hr veritical size=2 width = 100% color=black>\
                  <p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspTotalRs "+Pay_amount+"</p>\
                  <hr veritical size=2 width = 100% color=black>\
                  <h3>Thank You for visiting our site"
            };



transporter.sendMail(mailOptions, function(error,info) {
    if(error) {
        console.log(error);
    }else{
        console.log('EMail sent:' +info.response);
        if(info.response){
            res.send({message:"booking successfull"});
        }
        user.updateOne({email: userData.C_emailid},{
            token: currentDateTime,
        }, {multi: true},function(err,affected,resp) {
            return res.status(200).json({
                success: false,
                msg: info.response,
                userlist: resp,
            });
        })
      }
    });
     });
    });
    
app.get("/login",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.Admin_name})
    } else {
        res.send({loggedIn: false})
    }
})
app.post("/login", (req,res) => {
    const Admin_name = req.body.Admin_name;
    const Password= req.body.Password;
    const selectA="SELECT * FROM adminlog where Admin_Username= ?";
    db.query(selectA,[Admin_name],
    (err, result) => {
        if(err) {
            res.send({err: err});
        }


        if((result.length) > 0)
        {
          bcrypt.compare(Password,result[0].password,(error, response)=>{
              if(response) 
              {
                req.session.user = result;
                console.log(req.session.user);
                 res.send({message: "Logged in successfull "})
              }else{
                res.send({ message: "wrong username/password" }); 
              }
          })
        }
        else{
            res.send({ message: "User doesn't exist" });
        }
    }
    );
});
app.get("/login1",(req,res)=> {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.C_name})
    } else {
        res.send({loggedIn: false})
    }
})
app.post("/login1", (req,res) => {
    const C_name = req.body.C_name;
    const C_Password= req.body.C_Password;
    const selectC="SELECT * FROM customerlog where C_name= ?";
    db.query(selectC, [C_name],
    (err, result) => {
        if(err) {
            res.send({err: err});
        }


        if(result.length > 0)
        {
        bcrypt.compare(C_Password,result[0].C_Password,(error, response)=>{
            if(response) 
            {
              req.session.user = result;
              console.log(req.session.user);
            res.send(result);

            }else{
              res.send({ message: "wrong username/password" }); 
            }
        })
      }
      else{
          res.send({ message: "User doesn't exist" });
      }
    }
    );
});
app.get("/login2",(req,res)=> {
    if(req.session.user){
        res.send({loggedIn: true, user: req.session.VAdmin_name})
    } else {
        res.send({loggedIn: false})
    }
})
app.post("/login2", (req,res) => {
    const VAdmin_name = req.body.VAdmin_name;
    const password= req.body.password;
    const selectV="SELECT * FROM VAdminlog where VAdmin_name= ?";
    db.query(selectV,[VAdmin_name],
    (err, result) => {
        if(err) {
            res.send({err: err});
        }

        if(result.length > 0)
        {
        bcrypt.compare(password,result[0].password,(error, response)=>{
            if(response) 
            {
              req.session.user = result;
              console.log(req.session.user);
              //res.send({message: "Logged in successfull "});
              //res.send({message:"logged in successfull"});
             res.send(result);
            }else{
              res.send({ message: "wrong username/password" }); 
            }
        })
      }
      else{
          res.send({ message: "User doesn't exist" });
      }
    }
    );
});
app.post('/pay', async (request, response) => {
    try {
      // Create the PaymentIntent
      let intent = await stripe.paymentIntents.create({
        payment_method: request.body.payment_method_id,
        description: "Test payment",
        amount: request.body.amount * 100,
        currency: 'inr',
        confirmation_method: 'manual',
        confirm: true
      });
      // Send the response to the client
      response.send(generateResponse(intent));
    } catch (e) {
      // Display error on client
      return response.send({ error: e.message });
    }
  });

  const generateResponse = (intent) => {
    if (intent.status === 'succeeded') {
      // The payment didn’t need any additional actions and completed!
      // Handle post-payment fulfillment
      return {
        success: true
      };
    } else {
      // Invalid status
      return {
        error: 'Invalid PaymentIntent status'
      };
    }
  };
   
  // request handlers
  app.get('/', (req, res) => {
    res.send('Stripe Integration! - Clue Mediator');
  });
  
   
app.listen(3001, ()=>{
    console.log("running server");
});