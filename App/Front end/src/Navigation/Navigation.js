
import React from 'react';
import './Navigation.css'

class Navigation extends React.Component{
	render(){
		return(
			<div className= "Navigation nav">
				{
					this.props.position === 'home' ?
					<p 
					onClick= {() => this.props.onPositionChange('signin')}
					className='f3 link dim black underline pa2 pointer'>Sign Out 
					</p>
					:  
					<p 
					className='f2 black center pa2 '>WELCOME 
					</p>
				}
			</div>	
		)}
}

export default Navigation;