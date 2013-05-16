<?php

// print_r($_POST);
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
$subname="";
$subemail="";
$subfield9="";
$subtomorrow="";
$subfield8="";
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
//print_r($_GET);
//exit();

if(isset($_POST)){
 if(isset($_POST['field9'])){
   $subfield9=$_POST['field9'];
 }
 if(isset($_POST['Name'])){
   $subname=$_POST['Name'];
 }
 if(isset($_POST['Email1'])){
   $subemail=$_POST['Email1'];
 }
 if(isset($_POST['field8'])){
   $subfield8=$_POST['field8'];
 }
 
  if(isset($_POST['tomorrow'])){
   $subtomorrow=$_POST['tomorrow'];
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

if($subfield8===""){
 $showpage=file_get_contents('confirm_thanks.htm');
}

if($subfield8==="boy"){
 $showpage=file_get_contents('thank_you.html');
}
if($subfield8==="girl"){
 $showpage=file_get_contents('girl_thank_you.html');
}
if($subfield8==="multi"){
 $showpage=file_get_contents('multi_thank_you.html');
}

// String substitutions. Note: these items must be unique in the html file
//				All occurances of for instance, ---1, will be replaced
$showpage=str_replace("---1",$subname,$showpage);
$showpage=str_replace("---2",$subemail,$showpage);
$showpage=str_replace("---3",$subfield9,$showpage);
$showpage=str_replace("---V",$subtomorrow,$showpage);

// Display the modified web page
echo $showpage;
exit();

?>
