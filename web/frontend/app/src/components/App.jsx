import React from "react";
import MainPage from "./MainPage";
import Navbar from "./Navbar";
import LoginAdmin from "./LoginAdmin";
import AdminMenuPage from "./AdmiMenuPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
    return (
        <React.Fragment>
            <Navbar />
            <Router>
                <Switch>
                    <Route path="/" exact component={MainPage}/>
                    <Route path="/login" exact component={LoginAdmin}/>
                    <Route path="/admin" exact component={AdminMainPage}/>
                    <Route path="/admin/menu" exact component={AdminMenuPage}/>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;