import React from 'react';
import BuilderPage from './pages/BuilderPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  // Simple hash-based navigation for demo purposes
  const hash = window.location.hash.substring(1);
  
  return (
    <div className="App">
      {hash === 'settings' ? (
        <SettingsPage />
      ) : (
        <BuilderPage />
      )}
    </div>
  );
}

export default App;
