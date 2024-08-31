<h1>HANDS ON ACTIVITY 2</h1>
<table align ="left" border ="1" cellpadding = "3" cellspacing = "2">
    
    <tr>
        <td>StudentID</td>
        <td>lastName</td>
        <td>middleName</td>
        <td>firstName</td>
        <td>Course</td>
        <td>Section</td>
</tr>
<?php
$StudentID = 1;
$quantity = 10;

for($StudentID = 1; $StudentID<=10; $StudentID++){
    echo "<tr> \n";

    echo "<td>$StudentID</td>";

    
    
}


$table = array(
    "Header" => array(
        "StudentID",
        "lastName",
        "middleName",
        "firstName",
        "Course",
        "Section"

    ),
    "body" => array(
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
        array(
            "firstName"=>"firstName",
            "middleName"=>"middleName",
            "lastName"=>"lastName",
            "Course"=>"Course",
            "Section"=>"Section"
        ),
    )
)

?>
</table>