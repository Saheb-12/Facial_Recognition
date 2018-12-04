import React from 'react';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({ email : event.target.value });
	}

	onNameChange = (event) => {
		this.setState({ name : event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ password : event.target.value });
	}

	onRegister = () => {
		fetch('http://localhost:3003/register',{
			method: 'post',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.name,
				email: this.state.email,
				password: this.state.password
			})
		})
		.then(response => response.json())
		.then(data => {
			if(data.id){
				this.props.onLoadUser(data);
				this.props.onRouteChange('home');
			}
		}).catch(err => console.log(err, "Error in Register.js"));
	}

	render() {
		return(
			<article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center h-100 pagecenter">
				<main className="pa4 black-80">
				  <div className="measure ">
				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw6 ph0 mh0">Register</legend>
				      <div className="mt3 ">
				        <label className="db fw6 lh-copy f6" htmlFor="user-name">Name</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="text" 
					        name="user-name"  
					        id="user-name" 
					        onChange={this.onNameChange}/>
				      </div>
				      <div className="mt3 ">
				        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
				        <input 
					        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="email" 
					        name="email-address"  
					        id="email-address" 
					        onChange={this.onEmailChange}
				        />
				      </div>
				      <div className="mv3 ">
				        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
				        <input 
					        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        type="password" 
					        name="password"  
					        id="password" 
					        onChange={this.onPasswordChange}
				        />
				      </div>
				    </fieldset>
				    <div className="">
				      <input 
				      onClick={this.onRegister}
				      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
				      type="submit" 
				      value="Register" />
				    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default Register;