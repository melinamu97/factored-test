import React, { createContext, useEffect, useState } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = (props) => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const fetchEmployee = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };

      const response = await fetch("/api/MyProfile", requestOptions);

      if (!response.ok) {
        setToken(null);
      }
      localStorage.setItem("EmployeeViewerToken", token);
    };
    fetchEmployee();
  }, [token]);

  return (
    <EmployeeContext.Provider value={[token, setToken]}>
      {props.children}
    </EmployeeContext.Provider>
  );
};
