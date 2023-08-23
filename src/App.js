import React, { useState } from "react";
import Form from "./components/Form.js";
import Header from "./components/Header.js";
import Table from "./components/Table.js";

function App() {
	const [yearlyData, setYearlyData] = useState([]);
	const [currentSavings, setCurrentSavings] = useState(0);
	const calculateHandler = (userInput) => {
		userInput.preventDefault();
		let currentSavings = +userInput.target["current-savings"].value;
		setCurrentSavings(currentSavings);
		const yearlyContribution = +userInput.target["yearly-contribution"].value;
		const expectedReturn = +userInput.target["expected-return"].value / 100;
		const duration = +userInput.target["duration"].value;

		const newYearlyData = [];
		for (let i = 0; i < duration; i++) {
			const yearlyInterest = currentSavings * expectedReturn;
			currentSavings += yearlyInterest + yearlyContribution;
			newYearlyData.push({
				id: i + 1,
				year: i + 1,
				yearlyInterest: yearlyInterest,
				savingsEndOfYear: currentSavings,
				yearlyContribution: yearlyContribution,
			});
		}
		setYearlyData(newYearlyData);
	};

	const resetForm = () => {
		setYearlyData([]);
	};

	return (
		<>
			<Header />
			<Form onReset={resetForm} onFormSubmit={calculateHandler} />
			{yearlyData.length === 0 ? (
				<p style={{ textAlign: "center" }}>No Data available</p>
			) : (
				<Table initialInvestment={currentSavings} yearlyData={yearlyData} />
			)}
		</>
	);
}

export default App;
