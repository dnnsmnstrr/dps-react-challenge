import { useState, useEffect } from 'react';
import dpsLogo from './assets/DPS.svg';
import './App.css';
import UserTable from './components/UserTable';

function App() {
	const [users, setUsers] = useState([]);
	async function loadData() {
		const response = await fetch('https://dummyjson.com/users');
		const data = await response.json();
		setUsers(data.users);
	}
	useEffect(() => {
		loadData();
	}, []);
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<UserTable users={users} />
			</div>
		</>
	);
}

export default App;
