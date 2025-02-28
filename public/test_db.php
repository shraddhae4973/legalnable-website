<?php
$servername = "mi-linux.wlv.ac.uk";
$username = "2040271";
$password = "h1e24y";
$database = "db2040271";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully!";
?>
