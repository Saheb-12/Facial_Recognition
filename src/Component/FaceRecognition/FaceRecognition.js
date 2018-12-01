import React from 'react';
import './FaceRecognition.css';
import FaceBox from './FaceBox.js';

const FaceRecognition = ({imageUrl, boxes}) => {
	return(
			<div className='center ma'>
	            <div className='absolute mt2'>
	                <img id='imageSource' alt='' src={imageUrl}  width='700px' height= 'auto' />
	            	<FaceBox boxes={boxes} />
	            </div>
			</div>
	);
}

export default FaceRecognition;