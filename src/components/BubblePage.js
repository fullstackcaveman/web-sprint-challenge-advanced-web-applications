import React, { useEffect, useState } from 'react';

import Bubbles from './Bubbles';
import ColorList from './ColorList';
import { axiosAuthCall } from './utils/useApi';

const BubblePage = () => {
	const [colorList, setColorList] = useState([]);

	useEffect(() => {
		// Make an axios call to retrieve all color data and push to state on mounting.

		axiosAuthCall('get', 'colors', setColorList);
	}, []);

	return (
		<>
			<ColorList colors={colorList} updateColors={setColorList} />
			<Bubbles colors={colorList} />
		</>
	);
};

export default BubblePage;
