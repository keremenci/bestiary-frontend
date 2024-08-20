// src/App.js
import React from 'react';
import BeastList from './components/BeastList';
import BeastForm from './components/BeastForm';
import axios from 'axios';

import './App.css';

const App = () => {
  const handleDelete = (beastName) => {
    axios.delete(`/beasts/${beastName}`)
      .then(() => window.location.reload())
      .catch(error => console.error('Error deleting beast:', error));
  };

  const handleSave = () => {
    window.location.reload();
  };

  return (
    <div>
      <h1>Bestiary</h1>
      <BeastList onDelete={handleDelete} />
      <BeastForm onSave={handleSave} />
    </div>
  );
};

export default App;