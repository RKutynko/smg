import React from "react";
import { Switch, NavLink, Route, Redirect } from "react-router-dom";

import MyProfilePage from "./containers/MyProfilePage";
import MyProjectsPage from "./containers/MyProjectsPage";
import TimeJournalPage from "./containers/TimeJournalPage";
import OutOfOfficePage from "./containers/OutOfOfficePage";

class App extends React.Component {
  render() {
    return (
      <>
        <header>
          <img alt="SMG logo" src="/logo.png" />
          <nav>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/time-journal">Time Journal</NavLink>
            <NavLink to="/my-projects">My Projects</NavLink>
            <NavLink to="/out-of-office">Out of office</NavLink>
          </nav>
        </header>
        <main>
          <Switch>
            <Redirect from="/" exact to="/profile" />
            <Route path="/profile" component={MyProfilePage} />
            <Route path="/time-journal" component={TimeJournalPage} />
            <Route path="/my-projects" component={MyProjectsPage} />
            <Route path="/out-of-office" component={OutOfOfficePage} />
            <Route render={() => <p>This is the page you are looking for</p>} />
          </Switch>
        </main>
        <footer>iTechArt, D2G2, Ruslan</footer>
      </>
    );
  }
}

export default App;
