import React, { useContext } from "react";

import { EmployeeContext } from "../context/EmployeeContext";

const Header = ({ title }) => {
  const [token, setToken] = useContext(EmployeeContext);

  const handleLogout = () => {
    setToken(null);
    localStorage.setItem("EmployeeViewerToken", token);
  };

  return (
    <div className="has-text-centered m-6">
      {token && (
        <button className="button is-primary is-rounded" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;