import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/Auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoute } from "./privateRoute";
import { PublicRoute } from "./publicRoute";
export const AppRouter = () => {
  const {checking,uid} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
  dispatch(startChecking());
  }, [dispatch])
  if (checking) {
    return <h1> Espere ..</h1>
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute 
          exact 
          path="/Login"
           component={LoginScreen}
           isAuthenticated={!!uid}
            />
          <PrivateRoute
           exact
            path="/" 
            component={CalendarScreen} 
            isAuthenticated={!!uid}
            />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
