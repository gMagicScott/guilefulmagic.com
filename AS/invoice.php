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
$subcompany="";
$subworkphone="";
$subhomephone="";
$subaddress1="";
$subaddress2="";
$subcity="";
$substate="";
$subzip="";
$subfax="";
$subcountry="";
$subfield1="";
$subfield2="";
$subfield3="";
$subfield4="";
$subfield5="";
$subfield6="";
$subfield7="";
$subfield8="";
$subfield9="";
$subfield10="";
$subadname="";
$submerchantname="";
$submerchantemail="";
$submerchantworkphone="";
$submerchanturl="";
$submerchantcompany="";
$submerchantaddress="";
$subtoday="";
$auto="no";
$autocode="";
$form="large";

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
 foreach($_GET as &$v){
   $v=str_replace("\\","",$v);
 }  
}



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
 if(isset($_GET['company'])){
   $subcompany=$_GET['company'];
   
   }
 if(isset($_GET['workphone'])){
   $subworkphone=$_GET['workphone'];
   
      }
 if(isset($_GET['homephone'])){
   $subhomephone=$_GET['homephone'];
   
     }
 if(isset($_GET['address1'])){
   $subaddress1=$_GET['address1'];
   
        }
 if(isset($_GET['address2'])){
   $subaddress2=$_GET['address2'];
   
           }
 if(isset($_GET['city'])){
   $subcity=$_GET['city'];
   
              }
 if(isset($_GET['state'])){
   $substate=$_GET['state'];
 
                    }
 if(isset($_GET['zip'])){
   $subzip=$_GET['zip'];
   
                    }
 if(isset($_GET['country'])){
   $subcountry=$_GET['country'];
   
                       }
 if(isset($_GET['fax'])){
   $subfax=$_GET['fax'];
   
                       }
 if(isset($_GET['field1'])){
   $subfield1=$_GET['field1'];
   
                          }
 if(isset($_GET['field2'])){
   $subfield2=$_GET['field2'];
                             }
 if(isset($_GET['field3'])){
   $subfield3=$_GET['field3'];
   
                                }
 if(isset($_GET['field4'])){
   $subfield4=$_GET['field4'];
   
                                   }
 if(isset($_GET['field5'])){
   $subfield5=$_GET['field5'];
   
                                      }
 if(isset($_GET['field6'])){
   $subfield6=$_GET['field6'];
   
                                      }
 if(isset($_GET['field7'])){
   $subfield7=$_GET['field7'];
   
                                      }
 if(isset($_GET['field8'])){
   $subfield8=$_GET['field8'];
   
                                      }
 if(isset($_GET['field9'])){
   $subfield9=$_GET['field9'];
   
                                      }
 if(isset($_GET['field10'])){
   $subfield10=$_GET['field10'];
   
                                         }
 if(isset($_GET['adname'])){
   $subadname=$_GET['adname'];
   
                                            }
 if(isset($_GET['merchantname'])){
   $submerchantname=$_GET['merchantname'];
   
                                               }
 if(isset($_GET['merchanturl'])){
   $submerchanturl=$_GET['merchanturl'];
   
                                               }
 if(isset($_GET['merchantemail'])){
   $submerchantemail=$_GET['merchantemail'];
   
                                               }
 if(isset($_GET['merchantworkphone'])){
   $submerchantworkphone=$_GET['merchantworkphone'];

                                               }
 if(isset($_GET['merchantcompany'])){
   $submerchantcompany=$_GET['merchantcompany'];
   
                                                  }
 if(isset($_GET['merchantaddress'])){
   $submerchantaddress=$_GET['merchantaddress'];
   
                                                     }
 if(isset($_GET['today'])){
   $subtoday=$_GET['today'];
   
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
 $showpage=file_get_contents('invoice.htm');
} else {
 $showpage=file_get_contents('invoice.htm');
}

// String substitutions. Note: these items must be unique in the html file
//				All occurances of for instance, ---1, will be replaced
$showpage=str_replace("---1",$subname,$showpage);
$showpage=str_replace("---2",$subemail,$showpage);
$showpage=str_replace("---3",$subcompany,$showpage);
$showpage=str_replace("---4",$subworkphone,$showpage);
$showpage=str_replace("---5",$subhomephone,$showpage);
$showpage=str_replace("---6",$subaddress1,$showpage);
$showpage=str_replace("---7",$subaddress2,$showpage);
$showpage=str_replace("---8",$subcity,$showpage);
$showpage=str_replace("---9",$substate,$showpage);
$showpage=str_replace("---A",$subzip,$showpage);
$showpage=str_replace("---B",$subcountry,$showpage);
$showpage=str_replace("---C",$subfield1,$showpage);
$showpage=str_replace("---D",$subfield2,$showpage);
$showpage=str_replace("---E",$subfield3,$showpage);
$showpage=str_replace("---F",$subfield4,$showpage);
$showpage=str_replace("---G",$subfield5,$showpage);
$showpage=str_replace("---H",$subfield6,$showpage);
$showpage=str_replace("---I",$subfield7,$showpage);
$showpage=str_replace("---J",$subfield8,$showpage);
$showpage=str_replace("---K",$subfield9,$showpage);
$showpage=str_replace("---L",$subfield10,$showpage);
$showpage=str_replace("---M",$subfax,$showpage);
$showpage=str_replace("---N",$subadname,$showpage);
$showpage=str_replace("---O",$submerchantname,$showpage);
$showpage=str_replace("---P",$submerchanturl,$showpage);
$showpage=str_replace("---Q",$submerchantemail,$showpage);
$showpage=str_replace("---R",$submerchantworkphone,$showpage);
$showpage=str_replace("---S",$submerchantcompany,$showpage);
$showpage=str_replace("---T",$submerchantaddress,$showpage);
$showpage=str_replace("---U",$subtoday,$showpage);

// Display the modified web page
echo $showpage;
exit();

?>
