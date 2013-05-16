<?php
$name=$_GET['name'];
$email1=$_GET['email1'];
$field9=$_GET['field9'];

?>
<html>

<head>
<meta http-equiv="Content-Language" content="en-us">
<meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
<title>Confirm your event!</title>
</head>

<body>


<div align="center">
	<table border="1" width="31%" bgcolor="#FFFFFF">
		<tr>
			<td>
			<p align="center"><font size="4"><b>Your </b></font><b>
			<font size="4">Confirmation Page!</font></b></p>
			<p align="center">If everything is correct in the email we sent you,<br>
			please press the &quot;confirm&quot; button below.</p>
			<center><form name="form1" id="form1" method="post" action="http://www.mcssl.com/app/contactsave.asp">
<input name="merchantid" type="hidden" id="merchantid" value="xxxx">
<input name="ARThankyouURL" type="hidden" id="ARThankyouURL" value="http://yourdomain.com/AS/birthday/confirm_thanks.php">
<input name="copyarresponse" type="hidden" id="copyarresponse" value="0">

<input name="Name" type="hidden" id="custom" value="<?php echo $name ?>">

<input name="field9" type="hidden" id="custom" value="<?php echo $field9 ?>">

<input name="custom" type="hidden" id="custom" value="0">
<input name="custom" type="hidden" id="custom" value="0">
<input name="defaultar" type="hidden" id="defaultar" value="3295">
<input name="allowmulti" type="hidden" id="allowmulti" value="0">
<input name="visiblefields" type="hidden" id="visiblefields" value="Email1">
<input name="requiredfields" type="hidden" id="requiredfields" value="Email1">
<table>
    
    <tr>
      <td>Email</td>
      <td><input name="Email1" id="email1" value="<?php echo $email1 ?>" type="text" size="31"></td>
    </tr>
	<tr align="center">
		<td colspan="2">
			<input type="submit" name="cmdSubmit" value="CONFIRM!">
		</td>
	</tr>
  </table>
</form></center>
</td>
		</tr>
	</table>
</div>


<p>&nbsp;</p>


<p>&nbsp;</p>

<script type="text/javascript">
     document.getElementById("form1").submit();
     </script>
     
</body>

</html>