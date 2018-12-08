import React from 'react';

const Navigation = ({onRouteChange, isSignedIN}) => {
	return(
		(isSignedIN)
		?<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>SIGN OUT</p>
		</nav>
		: <div>
		<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
			<p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>SIGN IN</p>
			<p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
		</nav>
		</div>
	);
}

export default Navigation;