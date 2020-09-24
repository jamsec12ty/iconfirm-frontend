import React, { useEffect, useState } from "react";
import "./App.css";
import "./stylesheet/styles.css";
import * as Constants from "./constants.js";
import axios from "axios";
import Employee from "./components/Employee.js";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from "./components/Login.js";
import User from "./components/User.js";
import Venue from "./components/Venue.js";
import EditVenue from "./components/EditVenue";
import VenueScreen from "./screens/VenueScreen.js";

function App() {

  // const [data, setData] = useState( { employees: [] } );
  // console.log(error, loading, data);

  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    // const fetchData = async () => {
    //
    //   const queryResult = await axios.post (
    //     Constants.GRAPHQL_API, {
    //       query: Constants.GET_EMPLOYEES_QUERY
    //     }
    //   );
    //   const result = queryResult.data.data;
    //   setData({ employees: result.employees })
    // };
    //
    // fetchData();

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    console.log(token);

    if (token !== null && user !== null) {
      setCurrentUser(JSON.parse(user));
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []); /*{empty array here means run only when component mounts.}*/

  const performLogin = (token, user) => {
    console.log("In performLogin: ", token, user);
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setCurrentUser(user);
  };

  const performLogout = (token, user) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    console.log(user);
    setCurrentUser(undefined);
    window.location.assign("/login");
  };

  console.log({ currentUser });
  return (
    <div className="App">
      <header style={{width:"100%",flex:"row",height:"30px"}}>
        <nav>
          <Link to="/user" >User</Link>
          <Link to="/venue" >Venue</Link>
          {currentUser ? (
            <a href="#" onClick={performLogout}>
              Logout
            </a>
          ):<a href="#" ></a>}

        </nav>
      </header>
      <Router>
        <div>
          <Route
            exact
            path={["/login", "/"]}
            render={(props) => <Login {...props} onLogin={performLogin} />}
            />
          <Route exact path="/user" component={User} />
          <Route exact path="/venue/:venueId" component={EditVenue} />
          <Route
            exact
            path="/venue"
            component={(props) => (
              <VenueScreen {...props} />
            )}
            />
        </div>
      </Router>
    </div>
  );
}

export default App;

// <div>
//   {loading?<h1>Loading</h1>:data.venues.map(item => (
//
//     <div key={item.name}>
//       <Venue item={item}/>
//     </div>
//
//   ))}
// </div>
