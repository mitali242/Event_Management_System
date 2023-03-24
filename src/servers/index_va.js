/*const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection(
    {
        user:"root",
        host:"localhost",
        database:"event",
    }
);
db.connect(function(error) {
    if (!!error) {
        console.log('Error');}
    else {
        console.log('connected');
    }
        
});

app.post('/Signup',(req,res) => {
    const VAdmin_name= req.body.VAdmin_name;
    const password= req.body.password;
    const VAdmin_emailID= req.body.VAdmin_emailID;
    const VAdmin_ContNo= req.body.VAdmin_ContNo;
    const VAdmin_add= req.body.VAdmin_add;
    const sqlInsert= "INSERT INTO VAdminlog (VAdmin_name,password,VAdmin_emailID,VAdmin_ContNo,VAdmin_add) VALUES (?,?,?,?,?)";
    db.query(sqlInsert,[VAdmin_name,password,VAdmin_emailID,VAdmin_ContNo,VAdmin_add],(err,result) => {
        console.log(err);
    }
    )
});

 app.post("/login", (req,res) => {
    const VAdmin_name = req.body.VAdmin_name;
    const password= req.body.password;

    db.query("SELECT * FROM VAdminlog where VAdmin_name= ? AND password= ?",
    [VAdmin_name,password],
    (err, result) => {
        if(err) {
            res.send({err: err});
        }


        if(result.length > 0)
        {
            res.send(result);
        }
        else{
            res.send({ message: "wrong username/password" });
        }
    }
    );
});
app.listen(3002, ()=>{
    console.log("running server");
});*/
