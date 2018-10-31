import React from 'react';
import Form from 'react-jsonschema-form';

import i18n from './i18n.jsx';
import Schema from './schema.jsx';

let placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';

class Embed extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      imgSrc: placeholderSrc,
      position: 'static',
    };
    this.inputRef = React.createRef();
    this.colInnerRef = React.createRef();
    this.embedderRef = React.createRef();
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll);
  }

  componentDidUpdate(prevProps) {
    // if (this.props.imgSrc !== prevProps.imgSrc) {
    // }
  }

  onImageLoad(e) {
    // console.log('Image Loaded');
    // this.setState({ imageLoaded: 'loaded' });
  }

  onImageError(e) {
    // console.log('Image Failed'); 
    // this.setState({ imageLoaded: 'failed' });
  }


  onChange(formEvent) {
    console.log('changed');
    let imgSrc = formEvent.target.value;
    let pseudoImg = new Image();
    pseudoImg.onload = () => {
      console.log('Pseudo Image Loaded');
      this.setState({
        imgSrc: imgSrc,
        imageLoaded: true
      });
    //   // that.children.props.src = imgSrc;
    }
    pseudoImg.onerror = () => {
      console.log('Pseudo Image Failed');
      this.setState({
        imgSrc: placeholderSrc,
        imageLoaded: false
      });
    //   // that.children.props.src = '';
    }
    pseudoImg.src = imgSrc;
  }


  onSubmit(e) {
    console.log('Submit', e);
  }

  onError(e) {
    console.log('Error', e);
  }

  onScroll(e) {
    let embedder = this.embedderRef.current;
    let colInner = this.colInnerRef.current;
    // console.log(embedder);
    // console.log(window.pageYOffset, colInner.offsetParent.offsetTop);
    // if (window.pageYOffset >= colInner.offsetParent.offsetTop) {
    //   embedder.classList.add('sticky')
    // } else {
    //   embedder.classList.remove('sticky');
    // }
    // navbar.offsetTop
    // this.setState({ position: 'sticky' });
  }

  render() {
    return(
      <div className='col-inner' ref={this.colInnerRef}>
        <div id='embedder' className={this.state.position} ref={this.embedderRef}>
          <div id='embed' className='card'>
            <img
              src={this.state.imgSrc}
              onLoad={this.onImageLoad.bind(this)}
              onError={this.onImageError.bind(this)}
            />
            <div data-id='backstory' className='corner tl'></div>
            <div data-id='copyright' className='corner tr'></div>
            <div data-id='media' className='corner br'></div>
            <div data-id='links' className='corner bl'></div>
            <div id='backstory' className='cornerContent'></div>
            <div id='copyright' className='cornerContent'></div>
            <div id='media' className='cornerContent'></div>
            <div id='links' className='cornerContent'></div>
          </div>
          <div className='card'>
            <form className='image'>
              <input name='imageSrc'
                className='form-control'
                onChange={this.onChange.bind(this)}
                onSubmit={this.onChange.bind(this)}
                onError={this.onError.bind(this)}
                ref={this.inputRef} />
              <input
                readOnly={true}
                className='form-control'
                value='https://d2w9rnfcy7mm78.cloudfront.net/1380519/original_68cb6b97fa36bad871fb18352de81972.jpeg'/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Embed;