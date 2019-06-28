import React, {useState, useEffect} from 'react';
import Auxx from '../Auxx';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return props => {
		const[error, setError] = useState(null);

	
			const reqInterceptor = axios.interceptors.response.use(req => {
				setError(null);
				return req;
			});
			const resInterceptor = axios.interceptors.response.use(res => res, err => {
				setError(err);
			});
		

		useEffect(() => {
			return () => {
				axios.interceptors.request.eject(reqInterceptor);
				axios.interceptors.response.eject(reqInterceptor);
			}
		}, [reqInterceptor, resInterceptor])

		const errorConfirmHandler = () => {
			setError(null)
		} 
	
			return (
			<Auxx>
			<Modal show={error}
				   modalClosed	={errorConfirmHandler}	>
				{error ? error.message : null}
			</Modal>
			<WrappedComponent {...props} />
			</Auxx>
				);
		}
	
}

export default withErrorHandler;