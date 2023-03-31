import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import ErrorMessage from "./ErrorMessage";
import Header from "./Header";
import SpiderChart from "./RadarChart";
import Avvvatars from 'avvvatars-react'


const MyProfile = () => {
    const [token] = useContext(EmployeeContext);
    const [employee, setEmployee] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getEmployee = async () => {
        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
        };

        const response = await fetch("http://localhost:8000/api/MyProfile", requestOptions);
        if (!response.ok) {
            setErrorMessage("Something went wrong.");
        } else {
            const data = await response.json();
            setEmployee(data);
            setLoaded(true);
        }
    };

  useEffect(() => {
    getEmployee();
  }, [token]);
    
    return (
        <>  
            <ErrorMessage message={errorMessage} />
            <div className="columns is-centered">
                <div className="column is-three-fifths">
                    {loaded && employee ? (
                        <div className="box">
                            <div className="columns">
                                <div className="column is-half">
                                    <div className="container has-background-info-light has-text-centered content is-medium">
                                        <br />
                                        <div className="is-flex is-justify-content-center">
                                            <div className="image is-full-width is-align-self-center">
                                                <Avvvatars value={token} style="shape" size={150} />
                                            </div>
                                        </div>
                                        <br />
                                        <div className="block">
                                            <h2 className="has-text-primary">{employee.name}</h2>
                                        </div>
                                        <div className="block">
                                            <h6>{employee.position}</h6>
                                        </div>
                                        <div className="block">
                                            <p className="has-text-grey">{employee.email}</p>
                                        </div>
                                        <Header />
                                        <br />
                                    </div>
                                </div>
                                <div className="column is-half is-flex is-justify-content-center is-align-items-center">
                                    <div className="block">
                                        <SpiderChart originalData={employee.skills} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading</p>
                        )}
                </div>
            </div>
        </>
    )
};

export default MyProfile;