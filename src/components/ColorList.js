import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import EditMenu from './EditMenu';
import Message from './Message';

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
		axiosWithAuth()
			.put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
			.then((res) => {
				console.log([res.data]);
				const newColors = colors.filter((color) => color.id !== colorToEdit.id);

				updateColors([...newColors, res.data]);
				setEditing(false);
			})
			.catch((err) => {
				console.log(err);
				setError(true);
				setEditing(false);
			});
	};

	// Delete request for deleting colors.
	const deleteColor = (color) => {
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${color.id}`, color)
			.then((res) => {
				updateColors(colors.filter((item) => item.id !== Number(res.data)));
			})
			.catch((err) => {
				console.log(err);
				setError(true);
			});
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
