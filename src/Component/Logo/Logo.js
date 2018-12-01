import React from 'react';
import Tilt from 'react-tilt';
import brain from './Logo.png';
import './Logo.css';

const Logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 120, width: 120 }} >
				 <div className="Tilt-inner"> 
				 	<img src={brain} alt= 'logo' style={{ paddingTop:'5px', height: 100, width: 100 }}/>
				 </div>
			</Tilt>
		</div>
	);
}

export default Logo;