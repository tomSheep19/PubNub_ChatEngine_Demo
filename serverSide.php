<?php
/**
 * Created by PhpStorm.
 * User: miemie
 * Date: 10/03/2018
 * Time: 20:04
 */

if (isset($_POST['Sex'])) {
    $sex = $_POST['Sex'];
} else {
    //No selection, search for all
  //  $sex = 'default';
}


if (isset($_POST['Age'])) {
    $age = $_POST['Age'];
} else {
    //No selection, search for all
    $age = 'default';
}


if (isset($_POST['Hobby'])) {
    $hobby = $_POST['Hobby'];
} else {
    //No selection, search for all
    $hobby = 'default';
}



