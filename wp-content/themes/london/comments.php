<?php

/**
 * This is a modified version of wp-commments that comes with the Brian's Threaded Comments plugin.
 * Version: See briansthreadedcomments.php
 * Author: Brian Meidell
 * Author URI: http://meidell.dk/
 */ 

if ('wp-comments.php' == basename($_SERVER['SCRIPT_FILENAME']))
	die ('Please do not load this page directly. Thanks!');

include(ABSPATH . WPINC . "/version.php");

$is_new = (isset($wp_version) && $wp_version > '1.2');

if (($is_new) or ($withcomments) or ($single)) {
        if (!empty($post->post_password)) { // if there's a password
            if ($_COOKIE['wp-postpass_'.$cookiehash] != $post->post_password) {  // and it doesn't match the cookie
?>
<p><?php _e("Enter your password to view comments."); ?><p>
<?php
				return;
            }
        }

 		$comment_author = (isset($_COOKIE['comment_author_'.$cookiehash])) ? trim($_COOKIE['comment_author_'.$cookiehash]) : '';
        $comment_author_email = (isset($_COOKIE['comment_author_email_'.$cookiehash])) ? trim($_COOKIE['comment_author_email_'.$cookiehash]) : '';
 		$comment_author_url = (isset($_COOKIE['comment_author_url_'.$cookiehash])) ? trim($_COOKIE['comment_author_url_'.$cookiehash]) : '';

		if(!$tablecomments && $wpdb->comments) // this makes it work in both 1.2 and 1.3
			$tablecomments = $wpdb->comments;
			$comments = $wpdb->get_results("SELECT * FROM $tablecomments WHERE comment_post_ID = '$id' AND comment_approved = '1' ORDER BY comment_date");
?>

<!-- You can start editing here. -->

<p><?php comments_rss_link(__('<abbr title="Really Simple Syndication">RSS</abbr> feed')); ?> 
<?php if ('open' == $post->ping_status) { ?>
| <a href="<?php trackback_url()?>">Trackback <acronym title=\"Uniform Resource Identifier\">URI</acronym></a>
<?php } ?>
</p>

<?php
$GLOBALS['threaded_comments'] = array();

function write_comment(&$c, $deepest_id = -1) {
	global $btc_cutoff_level, $post;
	$threaded_comments = $GLOBALS['threaded_comments'];
	$odd = ($GLOBALS['__writeCommentDepth']%2? " odd" : "");
?>
			<div  id="div-comment-<?php echo $c->comment_ID ?>" class='comment<?php echo $odd?>'>
				<a name='comment-<?php echo $c->comment_ID ?>' id='comment-<?php echo $c->comment_ID ?>'></a>
				<div class="title">
					<img class="collapseicon" src="<?php echo get_settings('siteurl'); ?>/wp-content/plugins/briansthreadedcomments.php?image=spacer.png" onclick='collapseThread("div-comment-<?php echo $c->comment_ID ?>")' />
					<cite><?php comment_type(); ?> <?php _e('by'); ?> <?php comment_author_link() ?><a href="#comment-<?php echo $c->comment_ID ?>"></a></cite> 
					<?php 
						if(function_exists('comment_subscription_status')) { 
							if (comment_subscription_status()) { 
								echo "<img alt='Subscribed to comments via email' src='".get_settings('siteurl') ."/wp-content/plugins/briansthreadedcomments.php?image=subscribed.png' />"; 
							} 
						}
					?>
					<?php edit_comment_link(__("Edit This"), ' |'); ?>				
				</div>
				<div class='body'>
					<div class='meta'>
						<?php echo $c->comment_date ?> <?php echo $c->comment_time ?>						
					</div>					
					<div class='content'>
						<?php comment_text() ?><?php 
						if(preg_match('|<Pingback />|', $c->comment_content)) {
							echo "<small>Read the rest at ";
							echo comment_author_link();
							echo "</small>";
						}
						?>
					</div>
<?php if($GLOBALS['__writeCommentDepth'] < $btc_cutoff_level) { ?>
					<div class='reply'>
						<?php if( $post->comment_status == 'open' ) { ?>
						<?php global $user_ID; if ( get_option("comment_registration") && !$user_ID ) echo '<a href="'.
						get_option('siteurl') . 
						'/wp-login.php?redirect_to=' . get_permalink() .
						'">Log in to Reply</a>'; else { ?> 
						<a href='#' onclick='moveAddCommentBelow("div-comment-<?php echo $c->comment_ID ?>", <?php echo $c->comment_ID ?>, true); return false;'>Reply to this comment</a>
						<?php } ?>
						<?php } ?>
					</div>
<?php } else if($GLOBALS['__writeCommentDepth'] == $btc_cutoff_level) { 
?>
				<small>(Comments wont nest below this level)</small>
<?php } ?>
				</div>
<?php
		if($threaded_comments[$c->comment_ID]) {
			$id = $c->comment_ID;
			foreach($threaded_comments[$id] as $c) {
				$GLOBALS['__writeCommentDepth']++;
				if($GLOBALS['__writeCommentDepth'] == $btc_cutoff_level)
					write_comment($c, $c->comment_ID);
				else
					write_comment($c, $deepest_id);
				$GLOBALS['__writeCommentDepth']--;
			}
		}
?>
<?php if($GLOBALS['__writeCommentDepth'] == $btc_cutoff_level ) { ?>

<?php if( $post->comment_status == 'open' ) { ?>
					<div class='reply'>
						<?php global $user_ID; if ( get_option("comment_registration") && !$user_ID ) echo '<a href="'.
						get_option('siteurl') . 
						'/wp-login.php?redirect_to=' . get_permalink() .
						'">Log in to Reply</a>'; else { ?> 
						<a href='#' onclick='moveAddCommentBelow("div-comment-<?php echo $deepest_id ?>", <?php echo $deepest_id ?>, false); return false;'>Reply here</a>
						<?php } ?>
					</div>
	<?php } ?>
<?php } ?>					

			</div>
			<!-- This has to be here because of Internet Explorers plethora of layout bugs -->
			<div style="height: 1px; overflow: hidden;">&nbsp;</div>
<?php
	}// end function
?>
<h2 id="comments"><?php comments_number(__("Comments"), __("1 Comment"), __("% Comments")); ?> 
<?php if ('open' == $post->comment_status) { ?>
<a href="#postcomment" title="<?php _e("Leave a comment"); ?>">&raquo;</a>
<?php } ?>
</h2>
<div class="#commentlist">
<?php if ( $comments ) : 
	foreach($comments as $c)
	{
		$GLOBALS['threaded_comments'][$c->comment_parent][] = $c;
	}
	$GLOBALS['__writeCommentDepth'] = 0;
	if( is_array($GLOBALS['threaded_comments'][0]) ) {
		foreach($GLOBALS['threaded_comments'][0] as $comment) {
			if ( get_comment_type() == "comment" ) {
			$GLOBALS['comment'] = &$comment;
			write_comment($GLOBALS['comment']);
			}
		}
	}
?>
<?php else : ?>
	<p><?php _e('No comments yet.'); ?></p>
<?php endif; ?>
</div>
<?php if ('open' == $post->comment_status) : ?>
<?php
 // this line is WordPress' motor, do not delete it.
$comment_author = (isset($_COOKIE['comment_author_' . COOKIEHASH])) ? trim($_COOKIE['comment_author_'. COOKIEHASH]) : '';
$comment_author_email = (isset($_COOKIE['comment_author_email_'. COOKIEHASH])) ? trim($_COOKIE['comment_author_email_'. COOKIEHASH]) : '';
$comment_author_url = (isset($_COOKIE['comment_author_url_'. COOKIEHASH])) ? trim($_COOKIE['comment_author_url_'. COOKIEHASH]) : '';

?>
<div id="addcomment" class="comment">
<a id="addcommentanchor" name="addcommentanchor"></a>
<form action="<?php echo get_settings('siteurl'); ?>/<?php echo get_option('btc_customtarget'); ?>" method="post" id="commentform">
<div class="add">
	<div id="reroot" style="display: none;">
		<small><a href="#" onclick="reRoot(); return false;">
			Click here to cancel "reply".
		</a></small>
	</div>
<?php if ( $user_ID ) : ?>
<p>Logged in as <a href="<?php echo get_option("siteurl"); ?>/wp-admin/profile.php"><?php echo $user_identity; ?></a>. <a href="<?php echo get_option("siteurl"); ?>/wp-login.php?action=logout" title="Log out of this account">Logout &raquo;</a></p>
<?php else : ?>
	<small>
		<?php _e('Name'); ?> <?php if ($req) _e('(required)'); ?>
	</small>
	<div>
		<input type="text" name="author" id="author" class="textarea" value="<?php echo $comment_author; ?>" size="28" tabindex="1" />
	</div>
	<small>
		<?php _e('E-mail'); ?> <?php if ($req) _e('(required - never shown publicly)'); ?>
	</small>
	<div>
		<input type="text" name="email" id="email" value="<?php echo $comment_author_email; ?>" size="28" tabindex="2" />
	</div>
	<small>
		<?php _e('<acronym title="Uniform Resource Identifier">URI</acronym>'); ?>
	</small>
	<div>
		<input type="text" name="url" id="url" value="<?php echo $comment_author_url; ?>" size="28" tabindex="3" />	
	</div>
	<?php 
/****** Math Comment Spam Protection Plugin ******/
if ( function_exists('math_comment_spam_protection') ) { 
	$mcsp_info = math_comment_spam_protection();
?> 	<p><input type="text" name="mcspvalue" id="mcspvalue" value="" size="22" tabindex="4" />
	<label for="mcspvalue"><small>Spam protection: Sum of <?php echo $mcsp_info['operand1'] . ' + ' . $mcsp_info['operand2'] . ' ?' ?></small></label>
	<input type="hidden" name="mcspinfo" value="<?php echo $mcsp_info['result']; ?>" />
</p>
<?php } // if function_exists... ?>
<?php endif; ?>
<?php if(function_exists('comment_subscription_status')) { ?>
	<div>
		<input type="checkbox" name="subscribe" id="subscribe" value="subscribe" />
		<small>Subscribe to comments via email</small>
	</div>		
<?php } else if( function_exists('show_subscription_checkbox')) { 
	show_subscription_checkbox(); 
} ?>
	<small>
		<?php _e('Your Comment'); ?> (<a href="#" onclick="changeCommentSize(-80); return false;">smaller size</a> | <a href="#" onclick="changeCommentSize(80); return false;">larger size</a>)
	</small>
	<div style="width: 100%;">
		<textarea name="comment" id="comment" cols="60" rows="14" tabindex="4"></textarea>
	</div>
	<small>
		You may use 
		<?php echo allowed_tags();?>
		in your comment.
	</small>
	<div>
		<input type="hidden" name="comment_post_ID" value="<?php echo $post->ID; ?>" />
		<input type="hidden" name="redirect_to" value="<?php echo htmlspecialchars($_SERVER['REQUEST_URI']); ?>" />
		<input onclick="if(typeof(onAddComment) == 'function') { onAddComment(); } else { alert('ERROR:\nIt looks like the website administrator hasn\'t activated the Brians Threaded Comments plugin from the plugin page'); };" name="addcommentbutton" type="button" id="addcommentbutton" value="Add comment" tabindex="5" />
	</div>
</div>
<?php do_action('comment_form', $post->ID); ?>
</form>
</div>
<?php if( get_option('btc_separate_trackbacks') ) { ?>
<h3>Trackback responses to this post</h3>
  <ul>
  <?php foreach ($comments as $comment) : ?>
  <?php $comment_type = get_comment_type(); ?>
  <?php if($comment_type != 'comment') { ?>
  <li><?php comment_author_link() ?></li>
  <?php } ?>
  <?php endforeach; ?>
</ul>
<? } // end separate trackbacks ?>
<?php else : // Comments are closed ?>
<p><?php _e('Sorry, the comment form is closed at this time.'); ?></p>
<?php endif; ?>
<?php } ?>
