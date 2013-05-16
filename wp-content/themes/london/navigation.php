<?php if (is_index()) : ?>

<div class="navigation">
	<span class="previous"><?php previous_post_link('&laquo; %link') ?></span>
	<span class="next"><?php next_post_link('%link &raquo;') ?></span>
</div>
<div class="clear"></div>

<?php else : ?>

<div class="navigation">
	<div class="previous"><?php next_posts_link('&larr; Previous Entries') ?></div>
	<div class="next"><?php previous_posts_link('Next Entries &rarr;') ?></div>
</div>
<div class="clear"></div>

<?php endif; ?>