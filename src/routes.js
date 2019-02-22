import React from "react";
import { Route } from "react-router-dom";
import Configuration from "./containers/configuration/Configuration";
import Segments from "./containers/segments/Segments";

export default [
  <Route exact path="/configuration" component={Configuration} />,
  <Route exact path="/segments" component={Segments} />
];
