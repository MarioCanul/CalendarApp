import React from "react";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom";
import { LoginScreen } from "../components/Auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
export const AppRouter = () => {
  return (
    
      <Router>
          <div>
        <Switch>
        <Route exact path="/Login" component={LoginScreen}/>
        <Route exact path="/" component={CalendarScreen}/>
        <Redirect to='/'/>
        </Switch>
        </div>
      </Router>
   
  );
};
