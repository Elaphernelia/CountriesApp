import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Custom constants
import { CONTINENTS, COLOURS } from "../../constants/continents";
// Custom components
import SearchView from "../../components/searchView";
// Custom context
import { CountriesContext } from "../../context";
import { useContext } from "react";

export default function GlobalView() {
	// Grabbing the countries data from the API using our Context
	const countries = useContext(CountriesContext);

	// Navigation hook
	const navigate = useNavigate();

	// Setting up our useStates
	const [populationArray, setPopulationArray] = useState([]); // populationArray is an array which contains all population values. We use this for filtering and simplifying data
	const [barCharData, setBarCharData] = useState({ // barCharData is an object we will send to the barChart component as a prop which contains shown data and information
		labels: CONTINENTS,
		datasets: [
			{
				label: "Population",
				backgroundColor: COLOURS[0],
				borderColor: COLOURS[0],
				data: CONTINENTS.map((c) => {
					return 0
				}),
			},
		],
	});
	const [barCharConfig, setBarCharConfig] = useState({ // barCharConfig is an object we will send to the barChart component as a prop which contains custom styling/funcitonality
		maintainAspectRatio: false,
		responsive:true,
		plugins: {
			legend:{
				position: 'top',
			},
		}
	});

	// Setting up our useEffects
	useEffect(() => {
		setBarCharData({
			labels: CONTINENTS,
			datasets: [
				{
					label: "Population",
					backgroundColor: CONTINENTS.map((cont) => {
						return COLOURS[cont.toLowerCase().replace(/\s+/g, '_')];
					}),
					borderColor: CONTINENTS.map((cont) => {
						return COLOURS[cont.toLowerCase().replace(/\s+/g, '_')];
					}),
					data: populationArray,
				},
			],
		})

		setBarCharConfig({
			onClick: (event, elements) => {
				if (elements.length > 0) { 
					const index = elements[0].index; 
					const label = CONTINENTS[index]; 
					navigate("/" + label.toLowerCase().replace(/\s+/g, '_'));
				}
			},
			maintainAspectRatio: false,
			responsive:true,
			plugins: {
				legend:{
					position: 'top',
				},
			}
		})
	}, [populationArray]); // Will only be called when populationArray value is changed -> shows all continents at first before filtering

	useEffect(() => {
		if (countries){
			setPopulationArray(CONTINENTS.map(populationSum))
		}
		
	}, [countries]); // Will be called when countries (data fetched from the API) changes, so basically at the beggining

	// This function returns the total population of a specific continent
	function populationSum(continent) {
		const filteredCountries = countries.filter((country) => { // We only pick out countries corresponding to the continent "continent"
			return country['continents'].includes(continent)
		});
		const populationsArray = filteredCountries.map(country => country.population) // An array containing populations of each country in that continent
		let populationValue = 0
		let a = populationsArray.reduce( // We basically do a sumatory of everything in populationsArray
			(accumulator, currentValue) => accumulator + currentValue,
			populationValue,
		)
		return populationsArray.reduce( // We basically do a sumatory of everything in populationsArray
			(accumulator, currentValue) => accumulator + currentValue,
			populationValue,
		)
	}
	
	// Here we handle the searching
	const handleSearchChange = ((e) => {
		const searchValue = e.target.value;
		let modifiedLabels = CONTINENTS;
		
		if (searchValue){
			let auxModifiedLabels = [];
			CONTINENTS.forEach((label, index) => {
				// 1st option: Search by minimum -> e.g. "800000000" would show Europe (841383255) Africa (1362092235) and Asia (4747386228)
				if (populationArray[index] >= searchValue){
					auxModifiedLabels.push(label)
				}
				// // 2nd option: Search by substring of value -> e.g. "13" would show Europe (841383255) and Africa (1362092235) -> LEAVE ONLY THIS IF UNCOMMENTED TO TRY IT OUT!
				// if (populationArray[index].toString().includes(searchValue.toString())){
				// 	auxModifiedLabels.push(label)
				// }
				// // 3rd option: Search by exact value -> e.g. "1430" would only show Antarctica -> LEAVE ONLY THIS IF UNCOMMENTED TO TRY IT OUT!
				// if (populationArray[index] == searchValue){
				// 	auxModifiedLabels.push(label)
				// }
			});
			modifiedLabels = auxModifiedLabels;
		}

		modifyShownData(modifiedLabels);
	});

	const modifyShownData = (continents) => {
		const continentsIndexArray = continents.map(cont => CONTINENTS.indexOf(cont)) // We create a new "real index" array that corresponds to the indexes in CONTINENTS:
		/* 
		For example, if CONTINENTS = ['Africa','Antarctica','Asia','Europe','North America','Oceania','South America'] and the prop "continents" = ['Europe', 'Oceania'],
		continentsIndexArray will be [3, 5]. This is so we can set up the navigation functionality in the onClick event correctly, and, when clicking on the 'Europe' bar,
		it will call navigate("/europe")
		*/
		setBarCharConfig({
			onClick: (event, elements) => {
				if (elements.length > 0) { 
					const index = elements[0].index; 
					const label = CONTINENTS[continentsIndexArray[index]]; 
					navigate("/" + label.toLowerCase().replace(/\s+/g, '_'));
				}
			},
			maintainAspectRatio: false,
			responsive:true,
			plugins: {
				legend:{
					position: 'top',
				},
			}
		})

		setBarCharData({
			labels: continents,
			datasets: [
				{
					label: "Population",
					backgroundColor: continents.map((cont) => {
						return COLOURS[cont.toLowerCase().replace(/\s+/g, '_')];
					}),
					borderColor: continents.map((cont) => {
						return COLOURS[cont.toLowerCase().replace(/\s+/g, '_')];
					}),
					data: continents.map(populationSum),
				},
			],
		});
	};
	
	// Stuff that we will render onto the page
	return (
		<SearchView title="Global data" handleSearchChange={handleSearchChange} barCharData={barCharData} barCharConfig={barCharConfig}/>
	);
}
