<h1>Condition</h1>

<?php
$number = 15;
if($number % 2){
    echo"Odd\n";
}else if($number % 3){

}
else {
    echo"Even\n";
}

echo"<br/>";

$authenticated = true;
$checkAccess = ($authenticated)? "access granted" : "access denied";
echo $checkAccess;

switch($color){
    case "red":

        break;

    case "blue":

        break;

    case "yellow":

        break;

    case "green":

        break;
}