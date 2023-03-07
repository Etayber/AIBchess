<?php

$hostname = "3.71.113.171";
$username = "etay";
$password = "etay";
$db = "Users";

$dbconnect=mysqli_connect($hostname,$username,$password,$db);

if ($dbconnect->connect_error) {
  die("Database connection failed: " . $dbconnect->connect_error);
}

if(isset($_POST['submit'])) {
  $email=$_POST['email'];
  $password=$_POST['password'];
  $phone=$_POST['phone'];

  $query = "INSERT INTO Users (email, password, phone)
  VALUES ('$email', '$password', '$phone')";

    if (!mysqli_query($dbconnect, $query)) {
        die('An error occurred. Your review has not been submitted.');
    } else {
      echo "Thanks for your review.";
    }

}
?>