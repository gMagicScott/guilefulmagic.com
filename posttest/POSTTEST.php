<?php

//print_r($_POST);
// exit();

/* Documentation:
  Strategy:  Use the html files as templates. Values are substituted at locations in the html that begin
		with --- folowed by a number (1 would be ---1, 2 would be ---2)
  Procedure:  Initialize the varibles to empty (as a precaution to avoid php errors);
		Check the inputs using isset($_GET['???']) (precaution against php errors);
		Set the inputs;
		Retrieve appropriate html file into string variable($showpage);
		Substitute variables using str_replace();
		Serve the html web page using echo();
*/
// substitute name field, email field, auto setting, which form
$name="";
$email1="";
$company="";
$address1="";
$address2="";
$city="";
$state="";
$zip="";
$country="";
$homephone="";
$workphone="";

$subfield8="boy";
$auto="no";
$autocode="";
$form="sample";

// string variable $showpage will be the web page served
$showpage="";


// Check the input, if any of these are empty, you might want to exit with an error message
// empty is the else condition, would look like
/*
		if(isset($_GET['auto'])){
		  $auto=$_GET['auto'];
		} else {
		  exit('some error message here');
		}
		
		
		
name="Name"
name="Email1"
name="Company"
name="Workphone"
name="Homephone"
name="Address1"
name="Address2"
name="City"
name="State"
name="Zip"
name="Country"
name="Fax"
name="field1"
name="field2"
name="field3"
name="field4"
name="field5"
name="field6"
name="field7"
name="field8"
name="field9"
name="field10"





*/
if(isset($_POST)){
 foreach($_POST as &$v){
   $v=str_replace("\\","",$v);
 }  
}
if(isset($_POST)){
 if(isset($_POST['Name'])){
   $name=$_POST['Name'];
 }
 if(isset($_POST['Company'])){
   $company=$_POST['Company'];
 }
 if(isset($_POST['Email1'])){
   $email1=$_POST['Email1'];
 }
 if(isset($_POST['Address1'])){
   $address1=$_POST['Address1'];
 }
 if(isset($_POST['Address2'])){
    $address2=$_POST['Address2'];
 }
 if(isset($_POST['City'])){
   $city=$_POST['City'];
 }
 if(isset($_POST['State'])){
   $state=$_POST['State'];
 }
 if(isset($_POST['Zip'])){
   $zip=$_POST['Zip'];
 }
 if(isset($_POST['Country'])){
   $country=$_POST['Country'];
 }
 if(isset($_POST['Workphone'])){
   $workphone=$_POST['Workphone'];
 }
 if(isset($_POST['Homephone'])){
   $homephone=$_POST['Homephone'];
 }
}

// $autocode has already been set to "" (nothing) the template variable ---3 needs to come of the 
// web page whether auto is set or not.  
// If auto=yes then $autocode = the javascript to execute the auto submit

if($auto==="yes"){
  $autocode='<script type="text/javascript">
     document.getElementById("form1").submit();
     </script>
';
}

// Get the appropriate web page according to input variable


if($form==="sample"){
 $showpage=file_get_contents('thank_you.html');
} else {
 $showpage=file_get_contents('thank_you.html');
}

$subsplitname = explode(" ", $name, 2);
$subfirstname = $subsplitname[0];
$sublastname = $subsplitname[1];

// String substitutions. Note: these items must be unique in the html file
//				All occurances of for instance, ---1, will be replaced
$showpage=str_replace("---1",$name,$showpage);
$showpage=str_replace("---2",$email1,$showpage);
$showpage=str_replace("---3",$company,$showpage);
$showpage=str_replace("---4",$workphone,$showpage);
$showpage=str_replace("---5",$homephone,$showpage);
$showpage=str_replace("---6",$address1,$showpage);
$showpage=str_replace("---7",$address2,$showpage);
$showpage=str_replace("---8",$city,$showpage);
$showpage=str_replace("---9",$state,$showpage);
$showpage=str_replace("---A",$zip,$showpage);
$showpage=str_replace("---B",$country,$showpage);
$showpage=str_replace("---Y",$subfirstname,$showpage);
$showpage=str_replace("---Z",$sublastname,$showpage);


// Display the modified web page
echo $showpage;
exit();

?>
