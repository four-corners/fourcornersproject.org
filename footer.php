<?php $curr_lang = pll_current_language(); ?>
<footer class='footer'>
	<div class='max-width'>
		<div class='row'>

			<div class='col col-6 left'>
				<div class='col-content'>
					<div class='row'>
						<div class='col col-12 col-sm-12 col-md-6 left'>
							<?php if( $menu_items = wp_get_nav_menu_items( 'main' ) ): ?>
								<nav id="main-nav-footer">
									<ol>
										<?php foreach( $menu_items as $i => $menu_item ) {
											$menu_item_id = $menu_item->object_id;
											$trans_page_id = pll_get_post( $menu_item_id, $curr_lang );
											if( $trans_page_id ) {
												$menu_item_id = $trans_page_id;
											}
											$menu_item_page = get_post( $menu_item_id ); ?>
											<li class="menu_item">
												<a href="<?= get_permalink( $menu_item_id ) ?>"><?= $menu_item_page->post_title ?></a>
											</li>
										<?php } ?>
									</ol>
								</nav>
							<?php endif; ?>
						</div>

						<div class='col col-12 col-sm-12 col-md-6 right'>
							<?php if( $menu_items = wp_get_nav_menu_items( 'footer' ) ): ?>
								<nav id="footer-nav-footer">
									<ol>
										<?php foreach( $menu_items as $i => $menu_item ) {
											$menu_item_id = $menu_item->object_id;
											$trans_page_id = pll_get_post( $menu_item_id, $curr_lang );
											if( $trans_page_id ) {
												$menu_item_id = $trans_page_id;
											}
											$menu_item_page = get_post( $menu_item_id ); ?>
											<li class="menu_item">
												<a href="<?= get_permalink( $menu_item_id ) ?>"><?= $menu_item_page->post_title ?></a>
											</li>
										<?php } ?>
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
					<br/><br/>
					This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>.
					<br/><br/>
					<div id="lang-switch-footer">
						<ol>
							<?php
							$langs = pll_languages_list( array(
								'fields' => 'locale'
							) );
							$lang_names = pll_languages_list( array(
								'fields' => 'name'
							) );
							foreach( $langs as $index => $lang ) { ?>
								<li>
									<?php $trans_post_id = pll_get_post( $post->ID, $lang ); ?>
									<a href="<?= get_permalink( $trans_post_id ); ?>">
										<?= $lang_names[$index] ?>
									</a>
								</li>
							<?php } ?>
						</ol>
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="col col-12">
				<div class="col-content">
					
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