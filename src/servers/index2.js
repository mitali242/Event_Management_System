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
app.post('/Signin',(req,res) => {
    const C_name= req.body.C_name;
    const C_Password= req.body.C_Password;
    const C_emailid= req.body.C_emailid;
    const C_ContNo= req.body.C_ContNo;
    const C_add= req.body.C_add;
    const C_IDproof=req.body.C_IDproof;
    const C_IDproofNo=req.body.C_IDproofNo;

    const sqlInsert= "INSERT INTO customerlog (C_name,C_ContNo,C_emailid,C_Password,C_add,C_IDproof,C_IDproofNo) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert,[C_name,C_ContNo,C_emailid,C_Password,C_add,C_IDproof,C_IDproofNo],(err,result) => {
        console.log(err);
    }
    )
});

app.post("/login", (req,res) => {
    const C_name = req.body.C_name;
    const C_Password= req.body.C_Password;

    db.query("SELECT * FROM customerlog where C_name= ? AND C_Password= ?",
    [C_name,C_Password],
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
app.listen(3001, ()=>{
    console.log("running server");
});*/