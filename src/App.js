import React from "react";
import { Route, Switch } from "react-router-dom";
import Stats from "./components/Stats";

export default function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact component={Stats} />
      </Switch>
    </React.Fragment>
  );
}
