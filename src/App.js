import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';
import './styles.scss';
import BubblePage from './components/BubblePage';

const initialFormValues = {
	username: '',
	password: '',
};

const initialLoggedIn = false;

function App() {
	const [formValues, setFormValues] = useState(initialFormValues);
	const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

	const inputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsLoggedIn(true);
		}
	}, [isLoggedIn]);

	return (
		<Router>
			<div className='App'>
				<Route exact path='/'>
					{isLoggedIn ? (
						<Redirect to='/bubble-page' />
					) : (
						<Login values={formValues} change={inputChange} />
					)}
				</Route>
				<Route exact path='/login'>
					{isLoggedIn ? (
						<Redirect to='/bubble-page' />
					) : (
						<Login values={formValues} change={inputChange} />
					)}
				</Route>
				{/* Render BubblePage as a PrivateRoute */}
				<PrivateRoute exact path='/bubble-page' component={BubblePage} />
			</div>
		</Router>
	);
}

export default App;
