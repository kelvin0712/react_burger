import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Auxx from '../../hoc/Auxx';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';


const BurgerBuilder = props => {
	// constructor(props)  {
	// 	super (props);
	// 	this.state = {...} 
	// }
	const [purchasing, setPurchasing] = useState(false)

	useEffect(()=> {
		props.onInitIngredient();
		// eslint-disable-next-line
	}, [])
 		
	

	const updatePurchaseState = (ingredients) =>  {
		const sum = Object.keys(ingredients)
		.map(iKey => {
			return ingredients[iKey]
		})
		.reduce((sum, el) => {
			return sum + el ;
		}, 0);
		return sum > 0;
	}


	const purchaseHandler = () => {
		if(props.isAuthenticated) {
			setPurchasing(true);
		} else {
			props.onSetAuthRedirectPath('/checkout');
			props.history.push('/auth');
		}
	}

	const purchaseCancelHandler = () => {
		setPurchasing(true);
	}

	const purchaseContinueHandler = () => {
		props.onInitPurchase();
		props.history.push('/checkout');
	}

		const disabledInfo = {
			...props.ings
		};
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;

		let burger = props.error ? <p>Ingredients cant be loaded</p> : <Spinner /> ;

		if(props.ings) {
		 burger = (
			<Auxx>
			<Burger ingredients = {props.ings} />
			<BuildControls
				ingredientAdded={props.onIngredientAdded}
				ingredientRemoved={props.onIngredientRemoved}
				disabled={disabledInfo} 
				purchaseable={updatePurchaseState(props.ings)}
				price = {props.price}
				ordered = {purchaseHandler}
				isAuth = {props.isAuthenticated}/>

			</Auxx>	 );

			orderSummary = <OrderSummary 
				purchaseCancel={purchaseCancelHandler}
				purchaseContinue={purchaseContinueHandler}
				ingredients={props.ings}
				price={props.price}/>; 
		} 

		//{salad: true, meat:false ...}
		return (
			<Auxx>
			<Modal show={purchasing} modalClosed={purchaseCancelHandler}>
				{orderSummary}
			</Modal>
			{burger}
			</Auxx>

		);
	
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));