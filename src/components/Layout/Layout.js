import React, {useState} from 'react';
import {connect} from 'react-redux';
import Auxx from '../../hoc/Auxx';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props => {
 	const [sideDrawerIsVisible, setSideDrawer] = useState(false)

	const sideDrawerCloseHandler = () => {
		setSideDrawer(false)
	}

	const sideDrawerToggleHandler = () => {
		setSideDrawer(!sideDrawerIsVisible)	
	}

		return(		
		<Auxx>
			<Toolbar 
				isAuth={props.isAuthenticated} 
				drawerToggleClicked={sideDrawerToggleHandler}/>
			<SideDrawer 
				isAuth={props.isAuthenticated}
				open = {sideDrawerIsVisible}	
				closed={sideDrawerCloseHandler}/>
			<main className= {classes.Content}>
				{props.children}
			</main>
		</Auxx>
		)
	}


const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

export default connect(mapStateToProps)(Layout);