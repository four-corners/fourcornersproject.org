import React from 'react';

const CreatorForm = () => (
	<form className="rjsf">
		<div className="form-group field field-object">
			<fieldset>
				<div className="form-group field field-object">
					<fieldset>
						<legend id="root_context__title">Image Context</legend>
						<p id="root_context__description" className="field-description">Provide context to your image by adding photographs made before and after the event depicted, a video of the scene, or a comparative image, such as one made in the same place before or a photograph of the same person in another circumstance.</p>
						<div className="form-group field field-string">
							<label className="control-label" htmlFor="root_context_story">Story</label>
							<textarea id="root_context_story" className="form-control" placeholder="" rows="5">
							</textarea>
						</div>
						<div className="form-group field field-array">
							<fieldset className="field field-array field-array-of-object">
								<legend id="root_context_media__title">Media</legend>
								<div className="row array-item-list">
								</div>
								<div className="row">
									<p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
										<button type="button" className="btn btn-info btn-add col-xs-12" tabIndex="0">
										<i className="glyphicon glyphicon-plus">
										</i>
										</button>
									</p>
								</div>
							</fieldset>
						</div>
					</fieldset>
				</div>
				<div className="form-group field field-object">
					<fieldset>
						<legend id="root_links__title">Related Links</legend>
						<div className="form-group field field-array">
							<fieldset className="field field-array field-array-of-object">
								<legend id="root_links_links__title">Links</legend>
								<p id="root_links_links__description" className="field-description">Include links here to websites that contain an accompanying article, related video, historical explanation, or any other contextualizing information; you can also link to the photographer’s website or that of an agency or publication.</p>
								<div className="row array-item-list">
								</div>
								<div className="row">
									<p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
										<button type="button" className="btn btn-info btn-add col-xs-12" tabIndex="0">
										<i className="glyphicon glyphicon-plus">
										</i>
										</button>
									</p>
								</div>
							</fieldset>
						</div>
					</fieldset>
				</div>
				<div className="form-group field field-object">
					<fieldset>
						<legend id="root_backstory__title">Backstory</legend>
						<p id="root_backstory__description" className="field-description">Here you can include a longer backstory explaining the circumstances in which the photograph was made, including the photographer's perspective or the points of view of the subject of the photograph, that of a witness to the event depicted or any other person with important contextualizing information to share. </p>
						<div className="form-group field field-string">
							<label className="control-label" htmlFor="root_backstory_story">Story</label>
							<p id="root_backstory_story__description" className="field-description">Here you can describe in text what was going on behind the scenes that is not obvious in the photograph itself, or include the point of view of the subject or a witness.</p>
							<input className="form-control" id="root_backstory_story" label="Story" placeholder="" type="text" defaultValue=""/>
						</div>
						<div className="form-group field field-array">
							<fieldset className="field field-array field-array-of-object">
								<legend id="root_backstory_media__title">Media</legend>
								<div className="row array-item-list">
								</div>
								<div className="row">
									<p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
										<button type="button" className="btn btn-info btn-add col-xs-12" tabIndex="0">
										<i className="glyphicon glyphicon-plus">
										</i>
										</button>
									</p>
								</div>
							</fieldset>
						</div>
					</fieldset>
				</div>
				<div className="form-group field field-object">
					<fieldset>
						<legend id="root_copyright__title">Copyright &amp; Licensing</legend>
						<div className="form-group field field-string">
							<label className="control-label" htmlFor="root_copyright_caption">Caption</label>
							<textarea id="root_copyright_caption" className="form-control" placeholder="" rows="5"></textarea>
						</div>
						<div className="form-group field field-string">
							<label className="control-label" htmlFor="root_copyright_credit">Credit</label>
							<input className="form-control" id="root_copyright_credit" label="Credit" placeholder="" type="text" defaultValue=""/>
						</div>
						<div className="form-group field field-string">
							<label className="control-label" htmlFor="root_copyright_copyright">Copyright</label>
							<select id="root_copyright_copyright" className="form-control">
								<option value=""></option>
								<option value="All rights reserved">All rights reserved</option>
								<option value="Attribution CC BY">Attribution CC BY</option>
								<option value="Attribution - ShareAlike CC BY - SA">Attribution - ShareAlike CC BY - SA</option>
								<option value="Attribution - NoDerivs CC BY - ND">Attribution - NoDerivs CC BY - ND</option>
								<option value="Attribution - NonCommercial CC BY - NC">Attribution - NonCommercial CC BY - NC</option>
								<option value="Attribution - NonCommercial - ShareAlike CC BY - NC - SA">Attribution - NonCommercial - ShareAlike CC BY - NC - SA</option>
								<option value="Attribution - NonCommercial - NoDerivs CC BY - NC - ND">Attribution - NonCommercial - NoDerivs CC BY - NC - ND</option>
							</select>
						</div>
						<div className="form-group field field-string">
							<label className="control-label" htmlFor="root_copyright_ethics">Code of Ethics</label>
							<select id="root_copyright_ethics" className="form-control">
								<option value=""></option>
								<option value="Photojournalist: While all photography is interpretive, as a photojournalist my photographs are meant to respect the visible facts of the situations I depict. I do not add or subtract elements to or from my photographs.">Photojournalist: While all photography is interpretive, as a photojournalist my photographs are meant to respect the visible facts of the situations I depict. I do not add or subtract elements to or from my photographs.</option>
								<option value="Fine Art Photographer: As a fine art photographer, I may alter my images in pursuit of my own artistic vision. ">Fine Art Photographer: As a fine art photographer, I may alter my images in pursuit of my own artistic vision. </option>
								<option value="Associated Press: As a staff member of Associated Press, I abide by AP’s ethics code.">Associated Press: As a staff member of Associated Press, I abide by AP’s ethics code.</option>
								<option value="UNICEF: While on assignment for UNICEF, I abide by UNICEF’s ethics code. I do not show the faces of children who are HIV-positive or who have been child soldiers.">UNICEF: While on assignment for UNICEF, I abide by UNICEF’s ethics code. I do not show the faces of children who are HIV-positive or who have been child soldiers.</option>
								<option value="Wildlife Photographer: As a wildlife photographer, all my photographs depict animals in the wild unless otherwise specified.">Wildlife Photographer: As a wildlife photographer, all my photographs depict animals in the wild unless otherwise specified.</option>
								<option value="Fashion Photographer: As a fashion photographer, I do not photograph underweight models whose Body Mass Index is lower than that established by as healthy by authorities.">Fashion Photographer: As a fashion photographer, I do not photograph underweight models whose Body Mass Index is lower than that established by as healthy by authorities.</option>
								<option value="Sports Photographer: As a sports photographer, I do not re-stage events.">Sports Photographer: As a sports photographer, I do not re-stage events.</option>
							</select>
						</div>
					</fieldset>
				</div>
			</fieldset>
		</div>
		<button type="submit" hidden=""></button>
		<button type="button" className="btn">Add content in another language</button>
	</form>
);

export default CreatorForm;