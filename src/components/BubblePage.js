import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../helpers/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);

	useEffect(() => {
		// Make an axios call to retrieve all color data and push to state on mounting.
		axiosWithAuth()
			.get('http://localhost:5000/api/colors')
			.then((res) => {
				// Set colorList to response data
				setColorList(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
