import React from 'react';
import './app.css';

const App = ({children}) => {
    return (
      <div className="container-fluid app">
        {children}
      </div>
    )
};
export default App;
