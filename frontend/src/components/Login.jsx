import React, { useState, useContext} from "react";

import ErrorMessage from "./ErrorMessage";
import { EmployeeContext } from "../context/EmployeeContext";

import logo_factored from "../logo_factored.png";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [, setToken] = useContext(EmployeeContext);

    const submitLogin = async () => {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: JSON.stringify(`grant_type=&username=${email}&password=${password}&scope=&client_id=&client_secret=`),
        };

        const response = await fetch("http://localhost:8000/api/token", requestOptions);
        const data = await response.json();

        if (!response.ok){
            setErrorMessage(data.detail);
        } else {
            setToken(data.access_token);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitLogin();
    };
    
    return (
        <section className="hero is-fullheight">
            <div className="hero-body has-text-centered">
                <div className="login">
                <img src={logo_factored} alt="" width="70%"></img>
                    <form className="box" onSubmit={handleSubmit}>
                        <div className="field">
                            <div className="control">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"
                                    required
                                />
                            </div>
                        </div>
                        <ErrorMessage message={errorMessage} />
                        <br />
                        <button className="button is-block is-fullwidth is-medium is-rounded is-primary" type="submit">
                            Login
                        </button>
                    </form>
                    <br />
                </div>
            </div>
        </section>
     );
};

export default Login;