import dpsLogo from './assets/DPS.svg';
import './App.css';
import UserTable from './components/UserTable';

function App() {
	const users = [
		{ firstName: 'Dennis', lastName: 'Muensterer', city: 'Mainz', birthday: '1997-06-16' },
		{ firstName: 'Max', lastName: 'Mustermensch', city: 'Munich', birthday: '1999-12-31' },
		{ firstName: 'Doris', lastName: 'Becker', city: 'Munich', birthday: '1989-01-01' }
	];
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
