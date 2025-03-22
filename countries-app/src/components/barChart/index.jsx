// Imports to show the chart -> Chart isn't explicitly called but needed to show the chart
import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

function BarChart({chartData, chartConfig}) {
	return (
		// Make the size of the BarChart 70% of the viewable screen's height
		<div style={{height: "70vh"}}>
			<Bar data={chartData} options={chartConfig}/>
		</div>
	);
};

export default BarChart;