// Assets imports
import errorImg from "../../assets/error.jpg";

function Error({}) {
	return (
		<div id="noshow">
			<h1>Oops! We couldn't fetch the data!</h1>
			<img id="errImg" src={errorImg} alt="errorImg"/>
		</div>
	);
};

export default Error;