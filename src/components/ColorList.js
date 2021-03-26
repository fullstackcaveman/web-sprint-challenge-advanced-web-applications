import React, { useState } from 'react';
import EditMenu from './EditMenu';
import Message from './Message';
import { axiosAuthCall } from './utils/useApi';

const initialColor = {
	color: '',
	code: { hex: '' },
};

const ColorList = ({ colors, updateColors }) => {
	const [editing, setEditing] = useState(false);
	const [colorToEdit, setColorToEdit] = useState(initialColor);
	const [error, setError] = useState(false);

	const editColor = (color) => {
		setEditing(true);
		setColorToEdit(color);
	};

	// Put request for saving colors
	const saveEdit = (e) => {
		e.preventDefault();

		axiosAuthCall(
			'put',
			`${colorToEdit.id}`,
			updateColors,
			colorToEdit,
			colors,
			setEditing,
			setError
		);
	};

	// Delete request for deleting colors.
	const deleteColor = (color) => {
		axiosAuthCall(
			'delete',
			`${color.id}`,
			updateColors,
			color,
			colors,
			setError
		);
	};

	return (
		<div className='colors-wrap'>
			<p>colors</p>
			<ul>
				{colors.map((color) => (
					<li key={color.color} onClick={() => editColor(color)}>
						<span>
							<span
								className='delete'
								onClick={(e) => {
									e.stopPropagation();
									deleteColor(color);
								}}
							>
								x
							</span>{' '}
							{color.color}
						</span>
						<div
							className='color-box'
							style={{ backgroundColor: color.code.hex }}
						/>
					</li>
				))}
				{error && <Message message='User must be logged in to do that.' />}
				{error && <a href='http://localhost:3000/login'>Click Here To Login</a>}
			</ul>
			{editing && (
				<EditMenu
					colorToEdit={colorToEdit}
					saveEdit={saveEdit}
					setColorToEdit={setColorToEdit}
					setEditing={setEditing}
					error={error}
				/>
			)}
		</div>
	);
};

export default ColorList;
