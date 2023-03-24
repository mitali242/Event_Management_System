<?php
$userid=$_POST[userid];
$password=$_POST[password];
$con=mysql_connect("localhost","root");
$db=mysql_selectdb("login");
$cmd=mysql_query("insert into stu values($userid,$password)");
$cmd=mysql_query($query,$con);
if($cmd)
echo "record success";
else
echo "record unsuccessfull";
?>