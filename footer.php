<footer class='footer'>
	<div class='max-width'>
		<div class='row'>

			<div class='col col-6 left'>
				<div class='col-content'>
					<div class='row'>
						<div class='col col-12 col-sm-12 col-md-6 left'>
							<?php if( $menu_items = wp_get_nav_menu_items( 'main' ) ): ?>
								<nav>
									<ol>
										<?php foreach( $menu_items as $i => $menu_item ) {
											echo '<li class="menu_item">';
												echo '<a href="'.$menu_item->url.'">'.$menu_item->title.'</a>';
											echo '</li>';
										} ?>
									</ol>
								</nav>
							<?php endif; ?>
						</div>

						<div class='col col-12 col-sm-12 col-md-6 right'>
							<?php if( $menu_items = wp_get_nav_menu_items( 'footer' ) ): ?>
								<nav>
									<ol>
										<?php foreach( $menu_items as $i => $menu_item ) {
											echo '<li class="menu_item">';
												echo '<a href="'.$menu_item->url.'">'.$menu_item->title.'</a>';
											echo '</li>';
										} ?>
									</ol>
								</nav>
							<?php endif; ?>
						</div>
					</div>
				</div>
			</div>

			<div class='col col-6 right'>
				<div class='col-content'>
					The <strong>Four Corners Project</strong> is free and open source. You can view the source code and contribute on <a href="https://github.com/four-corners/four-corners.js" target="_blank">GitHub</a>.
					<!-- <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">
						<img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc/4.0/88x31.png" />
					</a> -->
					<br /><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
				</div>
			</div>
		</div>
	</div>
</footer>
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-55531055-4"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-55531055-4');
</script>
<?php wp_footer(); ?>
</body>
</html>