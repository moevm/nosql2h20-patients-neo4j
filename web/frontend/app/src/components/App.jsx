import React from "react";
import MainPage from "./MainPage";
import Navbar from "./Navbar";
import LoginAdmin from "./LoginAdmin";
import {check} from "../login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminMainPage from "./AdminMainPage";

function App() {
    let [login, setLogin] = React.useState(false);

    check().then(r => setLogin(r))

    return (
        <React.Fragment>
            <Navbar />
            <Router>
                <Switch>
                    <Route path="/" exact>
                        {login ? <AdminMainPage/> : <MainPage/>}
                    </Route> 
                    <Route path="/login" exact component={LoginAdmin}/>
                </Switch>
            </Router>
        </React.Fragment>
    );
}

export default App;