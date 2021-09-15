import React from "react";
import { Route, Switch } from "react-router-dom";
import Covid19Screen from "./routes/Covid19";
import CovidStatsScreen from "./routes/CovidStats";
import IndianStatesMapScreen from "./routes/IndianStatesMap";

export default function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Covid19Screen} />
        <Route path="/covidStats" component={CovidStatsScreen} />
        <Route path="/indianStatesMap" component={IndianStatesMapScreen} />
      </Switch>
    </React.Fragment>
  );
}
