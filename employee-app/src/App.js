import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './Home';

function App() {
  return (
    <>
      <Routes>
        <Route >
          <Route index element={<Home />} />
          {/* <Route path="/createRes" element={<CreateRestaurantDataset />} /> */}
          {/* <Route path="/createHotel" element={<CreateHotelDataset />} />
          <Route path="/result" element={<Results />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
