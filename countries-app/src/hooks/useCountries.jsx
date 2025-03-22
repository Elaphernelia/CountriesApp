import axios from 'axios';

export const useCountries = () => {
	
	// We only need to call one endpoint from the restcountries API. If there was an endpoint where we could search by continent we could use that for the continental views
	const fetchGlobalData = async () => {
		const { data } = await axios.get('https://restcountries.com/v3.1/all?fields=name,continents,population,cca2');
		return data;
	};

	return {
		fetchGlobalData,
	}
}