// MUI imports
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

function SearchInput({handleOnChange}) {
	return (
		<TextField
			label="Search population"
			id="search-input"
			sx={{ mt: 3, mb: 3, width: '30ch' }}
			type="number"
			onChange={handleOnChange}
			color="#03182d"
			slotProps={{
				input: {
					startAdornment: <InputAdornment position="start">
					<SearchIcon />
					</InputAdornment>,
				},
				htmlInput: {
					min: 0
				},
			}}
		/>
	);
};

export default SearchInput;