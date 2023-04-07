import { Routes, Route } from "react-router-dom";

import SignUp from "./SignUp";
import Login from "./Login";
import Navbar from "./Navbar";
import Booking from "./Booking";
import ErrorPage from "./ErrorPage";
import Cards from "./Movies";
import View from "./View";
import About from "./About";
import { useState } from "react";
import Admin from "./Admin";
import AdminPanel from "./AdminPanel";
import Payment from "./Payment";
import BookedTicket from "./BookedTicket";
import Protected from "./Protected";
import MyBookings from "./MyBookings";

function App() {
  const [keys, setKeys] = useState(true);

  // this useState is used to show a userName on logout button
  const [name, setName] = useState("");

  return (
    <div className="Main">
      <Navbar keys={keys} setKeys={setKeys} name={name} />
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route path="/" element={<SignUp setKeys={setKeys} />} />
        <Route
          path="/logIn"
          element={<Login keys={keys} setKeys={setKeys} setName={setName} />}
        />
        <Route path="/admin" element={<Admin setName={setName} />} />

        {/* here i used a protected route..if user not logged in then user cannot access thease routes*/}

        <Route element={<Protected />}>
          <Route path="/booking" element={<Booking />} />
          <Route path="/movie" element={<Cards />} />
          <Route path="/movie/:title" element={<View />} />
          <Route path="/movie/:title/:seatBookig" element={<About />} />
          <Route path="adminPanel" element={<AdminPanel setKeys={setKeys} />} />
          <Route
            path="/movie/:title/:seatBookig/:payment"
            element={<Payment />}
          />
          <Route path="/BookedTicket" element={<BookedTicket />} />
          <Route path="/myBookings" element={<MyBookings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
