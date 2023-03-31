import React from 'react';
import ReactDOM from 'react-dom/client';
import "bulma/css/bulma.min.css"
import App from './App';

import { EmployeeProvider } from './context/EmployeeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <EmployeeProvider>
            <App />
    </EmployeeProvider>

);