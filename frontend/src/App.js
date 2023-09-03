import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots/AllSpots";
import SpotDetails from "./components/SpotDetails/SpotDetails";
import SpotForm from "./components/SpotCreator/SpotForm";
import ManageSpots from "./components/ManageSpots/ManageSpots";
import SpotEditForm from "./components/SpotEditForm/SpotEditForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <div id="gray-bar"></div>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllSpots />
          </Route>
          <Route exact path="/spots/new">
            <SpotForm />
          </Route>
          <Route exact path="/spots/current">
            <ManageSpots />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <SpotEditForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
