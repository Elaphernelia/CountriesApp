// MUI imports
import { AppBar, IconButton } from "@mui/material"
import PublicIcon from '@mui/icons-material/Public'
import Toolbar from '@mui/material/Toolbar';
// react-router-dom components
import { NavLink } from "react-router-dom";

function NavBar({}) {
	return (
		<div className="chart-container">
			<AppBar position='static' sx={{ bgcolor: "#03182d" }}>
				<Toolbar>
					<NavLink to={"/"} key={"global"}>
						<IconButton edge='start' >
							<PublicIcon style={{ fontSize: "50px" }} className="navBar-icon"/>
						</IconButton>
					</NavLink>
					<h2>
					Look up population!
					</h2>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default NavBar;