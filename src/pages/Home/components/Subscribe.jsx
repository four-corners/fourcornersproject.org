import React from 'react';

const Subscribe = ({ formUrl, label }) => {

	return(
		<div id='mc_embed_signup' className='subscribe-form'>
			<form action={formUrl} method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' className='validate' target='_blank' noValidate>
				<label htmlFor='mce-EMAIL'>{label}</label>
				<div className='fields-group'>
					<input type='email' name='EMAIL' className='required email form-elem' id='mce-EMAIL' placeholder='email@example.org'/>
					<div id='mce-responses' className='clear'>
						<div className='response' id='mce-error-response' style={{display: 'none'}}></div>
						<div className='response' id='mce-success-response' style={{display: 'none'}}></div>
					</div>   
					<div style={{position: 'absolute', left: '-5000px'}} aria-hidden='true'>
						<input type='text' name='b_a117064f3864003f8ca77acf1_fffda28ae6' tabIndex='-1'/>
					</div>
					<input type='submit' value='' name='subscribe' id='mc-embedded-subscribe' className='button'/>
				</div>
			</form>
		</div>
	);
}

export default Subscribe