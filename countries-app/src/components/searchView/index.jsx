// Custom components
import BarChart from "../barChart";
import SearchInput from "../searchInput";
// MUI imports
import Stack from '@mui/material/Stack';

function SearchView({title, handleSearchChange, barCharData, barCharConfig}) {
	return (
		<div style={{marginRight: '1em', marginLeft: '1em'}}>
			{/* Change direction depending on screen size to make it more responsive */}
			<Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mt: 3, mb : 2 }} alignItems="center"> 
				<h1>{title}</h1>
				<SearchInput handleOnChange={handleSearchChange}/>
			</Stack>
			<BarChart chartData={barCharData} chartConfig={barCharConfig}/>
		</div>
	);
};

export default SearchView;