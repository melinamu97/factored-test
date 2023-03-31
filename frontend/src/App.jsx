import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Login";
import MyProfile from "./components/MyProfile";
import { EmployeeContext } from "./context/EmployeeContext";

const App = () => {
  const [, setMessage] = useState("");
  const [token] = useContext(EmployeeContext);

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch("http://localhost:8000/api", requestOptions);
      const data = await response.json();
      setMessage(data.message);
     
    } catch {
      console.log("Something went wrong")
    };
    
  };

  useEffect(() => {
    getWelcomeMessage();
  }, []);

  return (
    <>
          {
            !token ? (
              <div className="columns">
                <div className="column"></div>
                <div className="column m-5 is-two-fifths">
                    <Login />
                </div>
                <div className="column"></div>
              </div>
            ) : (
              <>
                <MyProfile />
              </>
            )
          }
    </>
  );
};

export default App;
