import React from 'react';
import './InputForm.css';

const InputForm = ({onInputChange, onSubmit, value}) => {
	return(
		<div>
			<p className='f2' >{'Facial Recognition App'}</p>
			<div className='center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 center w-70' 
					type='text' 
					placeholder='Enter the image URL' 
					onChange={onInputChange} 
					value={value}/>
					<button className='f4 w-30 grow link ph3 pv2 white bg-light-purple center' 
					onClick={onSubmit}
					>Detect</button>
				</div>
			</div>
		</div>
	);
}

export default InputForm;