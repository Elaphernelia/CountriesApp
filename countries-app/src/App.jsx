import { useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
// react-router components for dynamic routing
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// Importing custom stuff from our project
// Constants
import { CONTINENTS, COLOURS } from "./constants/continents";
// Views
import ContinentalView from "./pages/continental";
import GlobalView from "./pages/global";
// Components
import NavBar from "./components/navBar"
import Error from "./components/error";
import Load from "./components/load";
// Contexts
import { CountriesContext } from "./context"
// css
import './App.css'
// Hooks
import { useCountries } from "./hooks/useCountries";

function CountriesApp() {
	
	// We create a react query to fetch the data, loading and error states already come with it (neat!)
	const { fetchGlobalData } = useCountries();
	const { data, error: isError, isLoading } = useQuery({
		queryKey: ['globalData'], 
		queryFn: ()=> fetchGlobalData()
	});

	// Setting page scroll to 0 when changing the route
	const { pathname } = useLocation();
	useEffect(() => {
		document.documentElement.scrollTop = 0;
		document.scrollingElement.scrollTop = 0;
	}, [pathname]);

	// Creating navigation routes for each continental view
	const getContinentalRoutes = () =>
		CONTINENTS.map((cont) => {
			return <Route 
			exact 
			path={"/" + cont.toLowerCase().replace(/\s+/g, '_')} 
			element={<ContinentalView continent={cont} barColour={COLOURS[cont.toLowerCase().replace(/\s+/g, '_')]}/>} 
			key={cont} />;
		});

	// Stuff that we will render onto the page
	if (isError) {
		return (
			<Error/>
		);
	}
	if (isLoading){
		return (
			<Load/>
		);
	}
	return (
		<>
			<NavBar/>
			<CountriesContext.Provider value={data}>
				<Routes> 
					{getContinentalRoutes()}
					{<Route path="/global" element={<GlobalView />} /> /* {Adding the global path to possible navigation routes} */} 
					{<Route path="*" element={<Navigate to="/global" />} /* 
					{Setting the global route as the default route, if anything other than a continental route is searched for, e.g. "/thing", we'll go to this view} *//>}
				</Routes>
			</CountriesContext.Provider>
		</>
	)
}

export default CountriesApp
