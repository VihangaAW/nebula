import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App, Dashboard } from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter, Route } from "react-router-dom";
//import { Dashboard} from './App'

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route path="/" exact component={App} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
