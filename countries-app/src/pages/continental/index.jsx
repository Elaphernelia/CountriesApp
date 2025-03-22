import { useState, useEffect } from "react";
// Custom components
import SearchView from "../../components/searchView";
// Custom context
import { CountriesContext } from "../../context";
import { useContext } from "react";

export default function ContinentalView({continent, barColour}) {

	// Grabbing the countries data from the API using our Context
	const countries = useContext(CountriesContext);

	// Setting up our useStates
	const [filteredCountries, setFilteredCountries] = useState([]); // filteredCountries is an array which contains all data from countries that exist in continent "continent"
	const [barCharData, setBarCharData] = useState({ 
		labels: [],
		datasets: [
			{
				label: "Population",
				backgroundColor: barColour,
				borderColor: barColour,
				data: [],
			},
		],
	}) // barCharData is an object we will send to the barChart component as a prop which contains shown data and information

	// Setting up our useEffects
	useEffect(() => {
		if (filteredCountries){
			setBarCharData({ 
				labels: filteredCountries.map((country) => {
					return country.name.common
				}),
				datasets: [
					{
						label: "Population",
						backgroundColor: barColour,
						borderColor: barColour,
						data: filteredCountries.map((country) => {
							return country.population
						}),
					},
				],
			})
		}
	}, [filteredCountries]); // Will only be called when filteredCountries value is changed -> shows all countries at first before filtering

	useEffect(() => {
		if (countries){
			setFilteredCountries(countries.filter((country) => { // We only pick out countries corresponding to the continent "continent"
				return country['continents'].includes(continent)
			}))
		}
		
	}, [countries]); // Will be called when countries (data fetched from the API) changes, so basically at the beggining
	
	// Here we handle the searching
	const handleSearchChange = ((e) => {
		const searchValue = e.target.value;
		let modifiedCountries = filteredCountries;
		
		if (searchValue){
			let auxModifiedCountries = [];
			filteredCountries.forEach((country) => {
				// 1st option: Search by minimum -> e.g. "200000000" in South America would show Brazil (212559409)
				if (country.population >= searchValue){
					auxModifiedCountries.push(country)
				}
				// 2nd option: Search by substring of value -> e.g. "97" in Europe would show Belgium (11555997) and Hungary (9749763) -> LEAVE ONLY THIS IF UNCOMMENTED TO TRY IT OUT!
				// if (country.population.toString().includes(searchValue.toString())){
				// 	auxModifiedCountries.push(country)
				// }
				// // 3rd option: Search by exact value -> e.g. "30" in Antarctica would only show South Georgia -> LEAVE ONLY THIS IF UNCOMMENTED TO TRY IT OUT!
				// if (country.population == searchValue){
				// 	auxModifiedCountries.push(country)
				// }
			});
			modifiedCountries = auxModifiedCountries;
		}

		setBarCharData({
			labels: modifiedCountries.map((country) => {
				return country.name.common
			}),
			datasets: [
				{
					label: "Population",
					backgroundColor: barColour,
					borderColor: barColour,
					data: modifiedCountries.map((country) => {
						return country.population
					}),
				},
			],
		});
	});
	
	// Stuff that we will render onto the page
	return (
		<SearchView title={continent} handleSearchChange={handleSearchChange} barCharData={barCharData} barCharConfig={{
			maintainAspectRatio: false,
			responsive:true,
			plugins: {
				legend:{
					position: 'top',
				},
			},
			scales:{
				x: {
					display: false
				}
			}
		}}/>
	);
}
