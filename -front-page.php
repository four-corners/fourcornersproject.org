<?php
/**
 * The home template file
 *
 * @package WordPress
 * @subpackage Four Corners
 * @since Four Corners 1.0
 */
get_header();
if( have_posts() ): 
	while ( have_posts() ): the_post(); ?>
		<div id="page">
			<main id="home">
				<section id="home-intro">
					<div class="max-width">
						<div class="row">
							<div class="col col-12">
								<h2><?= get_bloginfo( 'description' ); ?></h2>
							</div>
							<div class="col col-12 col-lg-6 left">
								<div class="col-content">
									<div class="content-block">
										<?php echo the_content(); ?>
									</div>
								
								</div>
							</div>

							<div class="col col-12 col-lg-6 right">
								<div class="col-content">
									<div class="content-block">
										<img id="corners-preview" src="<?= get_stylesheet_directory_uri(); ?>/assets/images/corners.svg"/>
									</div>
								</div>
							</div>

							<div class="col col-12">
								<div class="content-block">
									<h3>Are you a photographer or publisher?</h3>
									<h2 class="prompt-link">
										<a href="<?= get_local_link( 'create' ); ?>"><u>Try it out!</u></a>
									</h2>
								</div>
							</div>

						</div>
					</div>
				</section>
				<section id="home-about">
					<div class="max-width">
						<div class="row">

							<div class="col col-12 col-md-6 left">
								<div class="col-content">
									<h3>The <strong>Four Corners Project</strong> is meant to <strong>increase the authorship and authority</strong> of the photographer and the photograph itself by providing a fixed template to add context to each of the four corners of the image. By clicking on each of the corners, the interested reader is able to find out more about what is referenced by the photograph.</h3>
								</div>
							</div>

							<div class="col col-12 col-md-6 right">
								<div class="col-content">
									<h3>The platform is free and open source. <strong>It is the first major advance in contextualizing the photograph since the caption.</strong> It is also the first time that a photographer can immediately inform the reader of his or her own code of ethics as an image-maker.</h3>
								</div>
							</div>

						</div>
					</div>
				</section>

				<section id="corners">
					<div class="max-width">
						<div class="row corner-blocks">

							<div class="col col-6 col-sm-6 col-lg-3">
								<div class="col-content">

									<div class="content-block corner-block">
										<h2 class="corner-title" id="authorship">
											<div><?= pll__( 'Authorship' ) ?></div>
										</h2>

										<div class="corner-desc">
											<?= get_field( 'home_authorship_desc' ) ?>
										</div>
									</div>

								</div>
							</div>

							<div class="col col-6 col-sm-6 col-lg-3">
								<div class="col-content">

									<div class="content-block corner-block">
										<h2 class="corner-title" id="backstory">
											<div><?= pll__( 'Backstory' ) ?></div>
										</h2>

										<div class="corner-desc">
											<?= get_field( 'home_backstory_desc' ) ?>
										</div>
									</div>

								</div>
							</div>

							<div class="col col-6 col-sm-6 col-lg-3">
								<div class="col-content">

									<div class="content-block corner-block">
										<h2 class="corner-title" id="imagery">
											<div><?= pll__( 'Related imagery' ) ?></div>
										</h2>

										<div class="corner-desc">
											<?= get_field( 'home_imagery_desc' ) ?>
										</div>
									</div>

								</div>
							</div>

							<div class="col col-6 col-sm-6 col-lg-3">
								<div class="col-content">

									<div class="content-block corner-block">
										<h2 class="corner-title" id="links">
											<div><?= pll__( 'Links' ) ?></div>
										</h2>

										<div class="corner-desc">
											<?= get_field( 'home_links_desc' ) ?>
										</div>
									</div>

								</div>
							</div>

						</div>
					</div>
				</section>

				<section id="intro-end">
					<div class="max-width">
						<div class="row">

							<div class="col col-12 col-lg-6 left">
								<div class="col-content">
									<div class="content-block">
										<h3>Want to learn more?</h3>
										<h2 class="prompt-link">
											<a href="<?= get_local_link( 'how' ); ?>"><u>Learn how it works</u></a>
										</h2>
									</div>
								</div>
							</div>

							<div class="col col-12 col-lg-6 left">
								<div class="col-content">
									<div class="content-block">
										<h3>Want to see it in action?</h3>
										<h2 class="prompt-link">
											<a href="<?= get_local_link( 'gallery' ); ?>"><u>View the gallery</u></a>
										</h2>
									</div>
								</div>
							</div>

						</div>
					</div>
				</section>

			</main>
		</div>
<?php
	endwhile;
endif;
wp_footer(); ?>