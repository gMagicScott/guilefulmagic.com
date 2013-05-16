<?php

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
*/

if(isset($_GET)){
 if(isset($_GET['auto'])){
   $auto=$_GET['auto'];
 }
 if(isset($_GET['name'])){
   $subname=$_GET['name'];
 }
 if(isset($_GET['email'])){
   $subemail=$_GET['email'];
 }
 if(isset($_GET['form'])){
   $form=$_GET['form'];
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
 $showpage=file_get_contents('confirm.html');
} else {
 $showpage=file_get_contents('confirm.html');
}

// String substitutions. Note: these items must be unique in the html file
//				All occurances of for instance, ---1, will be replaced
$showpage=str_replace("---1",$subname,$showpage);
$showpage=str_replace("---2",$subemail,$showpage);
$showpage=str_replace("---3",$autocode,$showpage);

// Display the modified web page
echo $showpage;
exit();

?>
