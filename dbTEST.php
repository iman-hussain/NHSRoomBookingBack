<?php
$servername = "mi-linux.wlv.ac.uk";
//Server Name
$username = "1933527";
//Manjinder's student number
$password = "707y1s";
//Database password for connecting to database
//To connect to hosting (via putty) use password "Friday1995" which is Manjinder's account password
$dbname = "db1933527";
//Database name

// Create connection using values declared above
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection and print error if incorrect
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT building_id, building_name, building_address FROM Building";
//Select the values from the Building table using standard SQL script
$result = $conn->query($sql);
//Not entirely sure what this is? Think it stores the results of the above script in the variable $result

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["building_id"]. " - Name: " . $row["building_name"]. " - Address: " . $row["building_address"]. "<br>";
        //prints the output with the headings (the stuff in brackets)
    }
} else {
    echo "0 results";
    //Prints that there are 0 results, if there are 0 results
}
$conn->close();
?>