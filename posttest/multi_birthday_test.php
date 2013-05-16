<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <!-- <link rel="stylesheet" href="css/normalize.css"> -->
        <!-- <link rel="stylesheet" href="css/main.css"> -->
        <!-- // <script src="js/vendor/modernizr-2.6.2.min.js"></script> -->
    </head>
    <body>
    	<p>Possible solution to multi-child:</p>
    	<code>[birthday_qrf title="Quick Info Request"]Enter your information and hit "Request info!" I'll send complete details of what I offer.
(Not planning a kids birthday party? Click here to contact me directly.)[/birthday_qrf]</code>
		<p>Submit the form. The formated string will appear below.</p>


<?php

if ( isset( $_GET['extrachild'] ) && $_GET['extrachild'] > 0) {
	$child_count = $_GET['extrachild'];
} else {
	$child_count = 1;
}

if ( isset( $_POST['field12'] ) ) {
	if ( 1 == count( $_POST['field12'] ) ) {
		$field12 = trim( $_POST['field12'][0] );
	} elseif ( 2 == count( $_POST['field12'] ) ) {
		$field12 = trim( $_POST['field12'][0] ) . " and " . trim( $_POST['field12'][1] );
	} else {
		$last_item = end( $_POST['field12'] );
		reset( $_POST['field12'] );
		$child_names = "";
		foreach ( $_POST['field12'] as $child_name) {
			if ( $child_name == $last_item ) {
				$child_names .= "and " . $child_name;
			} else {
				$child_names .= $child_name . ", ";
			}
		}
	}

	echo "<p> {$child_names}{$field12} will enjoy the party. </p>";
}


?>
<div class="qrf">
	<h3>Quick Info Request</h3>
	<p>Enter your info below&hellip;</p>
	<form method="POST" action="http://guilefulmagic.com/posttest/multi_birthday_test.php">
		<fieldset>
			<label for="Name">Name</label>
			<input name="Name" id="Name" type="text" />
		</fieldset>
		<fieldset>
			<label for="Email1">Email</label>
			<input name="Email1" id="Email1" type="email" />
		</fieldset>
		<fieldset>
			<table>
				<thead>
					<tr>
						<th>Child's Name</th>
						<th>Child's Gender</th>
						<th>+/-</th>
					</tr>
				</thead>
				<tfoot>
					<tr>
						<td>Child's Name</td>
						<td>Child's Gender</td>
						<td>+/-</td>
					</tr>
				</tfoot>
				<tbody>
					<?php
					$cco = $child_count;
					while ($child_count > 0) {
						$plus_one = $cco + 1;
						$minus_one = $cco -1;
						?>
				<tr>
					<td><input type="text" name="field12[]" id="field12_<?php echo $child_count; ?>" /></td>
					<td>
						<ul>
							<li><label><input type="radio" name="field14_<?php echo $child_count; ?>" />Boy</label></li>
							<li><label><input type="radio" name="field14_<?php echo $child_count; ?>" />Girl</label></li>
						</ul>
					</td>
					<?php

					if (1 == $child_count) {
						?><td><a href="?extrachild=<?php echo $plus_one; ?>">+</a></td><?php
					} else {
						?><td><a href="?extrachild=<?php echo $minus_one; ?>">-</a></td><?php
					}

					?>
				</tr>
						<?php
						unset($plus_one);
						unset($minus_one);
						$child_count--;
					} ?>
					
				</tbody>
			</table>
			<button>Get Info</button>
		</fieldset>
	</form>
</div>
</body>
</html>