<h1>ARRAY</h1>

<?php
$cars = array("BMW\n", "VOLVO\n", "TOYOTA\n", "FORD\n");
echo $cars[3];

$car = array(
    "Brand" => "Ford",
    "model" => "Mustang",
    "year" => 1964);
    echo $car["model"];

    $info =array(
        "user"=> array(
            "firstName"=> "John Adrian",
            "middleName" => "Castro",
            "lastName" => "Llanita"
        ),
        "address" => array(
            "province" => "bulacan",
            "municipality" => "marilao",
            "barangay" => "lambakin"
        ),

        );

        echo $info["address"]["municipality"];
        $info["user"]["age"] = 20;
        print_r($info);
        echo "<br/>";

        echo"<pre>";
        print_r($info);
        echo "<br/>";
        var_dump($info);
        echo "</pre>";

        echo "set of users<br>";
        $favoriteByuser = array(
            array(

            ),
            array(

            ),
            array(

            ),
            array(

            ),

        )
        ?>