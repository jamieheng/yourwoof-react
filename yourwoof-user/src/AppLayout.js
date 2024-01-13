import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";

import LandingPage from "./components/mainpage/LandingPage";
import Home from "./components/mainpage/Home";
import AboutUs from "./components/mainpage/AboutUs";
import ContactUs from "./components/mainpage/ContactUs";
import { NavigateBar } from "./components/mainpage/NavigateBar";
import { SurrenderForm } from "./components/mainpage/SurrenderForm";
import { AdoptForm } from "./components/mainpage/AdoptForm";
import PetList from "./components/mainpage/PetList";
import Tracking from "./components/mainpage/Tracking";
import Footer from "./components/mainpage/Footer";

function App() {
	

	return (
		<Router>
			<Routes>
				<Route path="/Home" element={<Home />} />
				<Route path="/LandingPage" element={<LandingPage />} />
				<Route path="/AboutUs" element={<AboutUs />} />
				<Route path="/ContactUs" element={<ContactUs />} />
				<Route path="/SurrenderForm" element={<SurrenderForm />} />
				<Route path="/AdoptForm" element={<AdoptForm />} />
				<Route path="/PetList" element={<PetList />} />
				<Route path="/Tracking" element={<Tracking />} />
				<Route path="/Footer" element={<Footer />} />
			</Routes>
		</Router>
	);
}

export default App;
