import { axiosWithAuth } from '../../helpers/axiosWithAuth';

export const axiosAuthCall = (method, endPoint, cb, payload, array) => {
	if (method === 'get') {
		axiosWithAuth()
			.get(`http://localhost:5000/api/${endPoint}`)
			.then((res) => {
				cb(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	} else if (method === 'delete') {
		axiosWithAuth()
			.delete(`http://localhost:5000/api/colors/${endPoint}`, payload)
			.then((res) => {
				cb(array.filter((item) => item.id !== Number(res.data)));
			})
			.catch((err) => {
				console.log(err)`setError(true)`;
			});
	}
};
