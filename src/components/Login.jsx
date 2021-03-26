import React, { useState } from 'react';
import axios from 'axios';

import {
	Avatar,
	Button,
	Grid,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import Message from './Message';

const Login = (props) => {
	const { values, change } = props;
	const [error, setError] = useState('');

	const onChange = (e) => {
		const { name, value, type, checked } = e.target;
		const valueToUse = type === 'checkbox' ? checked : value;
		change(name, valueToUse);
	};

	const loginHandler = (e) => {
		e.preventDefault();

		// make a post request to retrieve a token from the api
		axios
			.post('http://localhost:5000/api/login', values)
			.then((res) => {
				// If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
				localStorage.setItem('token', res.data.payload);
				// when you have handled the token, navigate to the BubblePage route
				window.location.href = '/bubble-page';
			})
			.catch((err) => {
				// Directions - If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
				// Changed error response in handlers.js to match above
				setError(err.response.data.error);
				console.log(err.response.data.error);
			});
	};

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

					{/* 1. Build a form containing a username and password field. */}
					{/* 3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY. */}
					<form onSubmit={loginHandler}>
						<TextField
							style={inputStyle}
							label='username'
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
							label='password'
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
				</Paper>
			</Grid>
		</>
	);
};

export default Login;
