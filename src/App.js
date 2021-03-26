import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import './styles.scss';

const initialFormValues = {
	username: '',
	password: '',
};

function App() {
	const [formValues, setFormValues] = useState(initialFormValues);

	const inputChange = (name, value) => {
		setFormValues({ ...formValues, [name]: value });
	};

	return (
		<Router>
			<div className='App'>
				<Route exact path='/' component={Login}>
					<Login values={formValues} change={inputChange} />
				</Route>
			</div>
		</Router>
	);
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
