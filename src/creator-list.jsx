// External dependencies
import React from 'react';
import { Link } from 'react-router-dom';

class CreatorList extends React.Component {

	renderCreators() {
		return this.props.creators.map((creator, i) => {
			return (
				<div className='col-md-4 card-outer' key={i}>
					<div className='card'>
						<div className='img-outer'>
							<Link to={'creators/' + creator.slug}>
								<img className='card-img-top' src={creator.featured_image_src ? creator.featured_image_src : ''} alt='Featured Image' />
							</Link>
						</div>
						<div className='card-body'>
							<h4 className='card-title'><Link to={'creators/' + creator.slug}>{creator.title.rendered}</Link></h4>
							<p className='card-text'><small className='text-muted'>{creator.author_name} &ndash; {creator.published_date}</small></p>
							<p dangerouslySetInnerHTML={{ __html: creator.excerpt.rendered }} />
						</div>
					</div>
				</div>
			)
		});
	}

	renderEmpty() {
		return <h1>LOADING</h1>;
	}

	render() {
		if (!this.props.creators) {
			return null;
		}

		return (
			<div className='creators-container'>
				{this.props.creators.length ?
					this.renderCreators() :
					this.renderEmpty()
				}
			</div>
		);
	}
}

export default CreatorList;