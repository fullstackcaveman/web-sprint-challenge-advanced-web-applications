import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from './Message';
// import Loader from '../elements/Loader';

const Login = (props) => {
	const { values, change } = props;
	const [error, setError] = useState('');

	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		const valueToUse = type === 'checkbox' ? checked : value;
		change(name, valueToUse);
	};

	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route

	const loginHandler = (e) => {
		e.preventDefault();

		console.log(values);

		axios
			.post('http://localhost:5000/api/login', values)
			.then((res) => {
				localStorage.setItem('token', res.data.payload);
				window.location.href = '/bubble-page';
			})
			.catch((err) => {
				setError(err.response.data.error);
				console.log(err.response.data.error);
			});
	};

	useEffect(() => {
		// make a post request to retrieve a token from the api
		// when you have handled the token, navigate to the BubblePage route
	});

	const avatarStyle = { backgroundColor: '#ffee58', marginBottom: 10 };

	const inputStyle = {
		margin: '5px auto',
	};

	const paperStyle = {
		padding: 20,
		height: 'auto',
		width: 250,
		margin: '20px auto',
	};

	const submitBtnStyle = {
		marginTop: '10px',
		marginBottom: '20px',
		backgroundColor: '#ffee58',

		color: 'rgb(3, 53, 50)',
		fontFamily: 'Impact, sans-serif',
		fontSize: '1rem',
	};

	const newUserBtnStyle = {
		backgroundColor: 'transparent',

		color: 'grey',
		fontFamily: 'Impact, sans-serif',
		fontSize: '1rem',
		cursor: 'pointer',
	};

	return (
		<>
			<Grid className='add-user'>
				<Paper elevation={10} style={paperStyle}>
					<Grid align='center'>
						<Avatar style={avatarStyle} />
						<Typography variant='h5' id='add-user-h2'>
							Sign In
						</Typography>
					</Grid>
					{error && <Message message={error} />}
					<form onSubmit={loginHandler}>
						<TextField
							style={inputStyle}
							label='Username'
							placeholder='Enter User Username'
							variant='outlined'
							size='small'
							fullWidth
							required
							name='username'
							value={values.username}
							onChange={onChange}
						/>

						<TextField
							style={inputStyle}
							label='Password'
							placeholder='Enter Password'
							variant='outlined'
							size='small'
							fullWidth
							required
							name='password'
							type='password'
							value={values.password}
							onChange={onChange}
						/>

						<Button
							style={submitBtnStyle}
							type='submit'
							color='primary'
							variant='contained'
							fullWidth
						>
							SIGN IN
						</Button>
					</form>
					<Grid align='center'>
						{/* <Link
							to={
								redirect
									? `/users/register?redirect=${redirect}`
									: '/users/register'
							}
							style={newUserBtnStyle}
						>
							New User? Register
						</Link> */}
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.

// const submitHandler = (e) => {
// 	e.preventDefault();
// 	dispatch(login(email, password));
// };
