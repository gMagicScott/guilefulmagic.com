<?php get_header(); ?>


<div id="content">

<h1>Search Results</h1>
<div><br /></div>

<ul>
<?php if (have_posts()) : while (have_posts()) : the_post();  ?>
	<li><a title="Permalink to this post" href="<?php echo get_permalink(); ?>"><?php the_title(); ?></a></li>

<?php endwhile; endif; ?>
<?php if (!have_posts()) { echo('<li>No results to show.</li>'); } ?>
</ul>
	</div>
		
<?php get_sidebar(); ?>
	
</div>

<!-- The main column ends  -->

<?php get_footer(); ?>

