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
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        ),
        array(
            "firstName" => "firstName",
            "middleName" => "middleName",
            "lastName" => "lastName",
            "Course" => "Course",
            "Section" => "Section"
        )
        // Additional student records go here...
    )
);

$StudentID = 1;

foreach ($table["body"] as $student) {
    echo "<tr>\n";
    echo "<td>$StudentID</td>";
    echo "<td>{$student['lastName']}</td>";
    echo "<td>{$student['middleName']}</td>";
    echo "<td>{$student['firstName']}</td>";
    echo "<td>{$student['Course']}</td>";
    echo "<td>{$student['Section']}</td>";
    echo "</tr>\n";
    $StudentID++;
}

?>
</table>
