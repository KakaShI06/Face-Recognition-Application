import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt'


class Logo extends React.Component{
	render(){
		return(
			<Tilt className="Tilt ma4 pa3 br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
			  <div className="Tilt-inner"> <img src= 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/profile/photos/8401079/original/videozed-logo_600x600_00000.png'
			   alt= "Logo" /> </div>
			</Tilt>
			)
	}

}

export default Logo;
