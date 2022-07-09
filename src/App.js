import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';

import { Home } from './routes/home/home';
import { SingleUser } from './components/singleUser/singleUser';
import { Navigation } from './components/navigation/navigation';
import { AddUser } from './components/addUser/addUser';
import { EditUser } from './components/editUser/editUser';
function App() {
	return (
		<Routes>
			<Route path='/' element={<Navigation />}>
				<Route index element={<Home />} />

				<Route path='user/:id' element={<EditUser />} />
				<Route path='user/add' element={<AddUser />} />
			</Route>
		</Routes>
	);
}

export default App;
