import React from 'react';

const FaceBox = ({boxes}) => {
	return (
			<div>
				{
		    		boxes.map((face, id) => {
						return(
							<div key={id} className='bounding-box' style={{top: face.top, left: face.left, bottom: face.bottom, right: face.right}}>
							</div>
						);
					})
		    	}
			</div>
	);
}

export default FaceBox;