// src/components/BeastForm.js
import React, { useState } from 'react';
import axios from 'axios';

const BeastForm = ({ beast, onSave }) => {
  const [formData, setFormData] = useState(beast || {
    BeastName: '',
    Type: '',
    CR: '',
    Attributes: { CHA: '', CON: '', DEX: '', INT: '', STR: '', WIS: '' },
    Description: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.Attributes) {
      setFormData({
        ...formData,
        Attributes: { ...formData.Attributes, [name]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const request = beast 
      ? axios.put(`/beasts/${beast.BeastName}`, formData)
      : axios.post('/beasts', formData);

    request.then(() => {
      onSave();
      setErrorMessage(''); // Clear error message on success
    })
    .catch(error => {
      if (error.response && error.response.status === 409) {
        setErrorMessage('Beast already exists');
      } else {
        console.error('Error saving beast:', error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <input
        type="text"
        name="BeastName"
        value={formData.BeastName}
        onChange={handleChange}
        placeholder="Beast Name"
        required
      />
      <input
        type="text"
        name="Type"
        value={formData.Type}
        onChange={handleChange}
        placeholder="Type"
        required
      />
      <input
        type="text"
        name="CR"
        value={formData.CR}
        onChange={handleChange}
        placeholder="CR"
        required
      />
      <div>
        <h4>Attributes</h4>
        {Object.keys(formData.Attributes).map(attr => (
          <input
            key={attr}
            type="text"
            name={attr}
            value={formData.Attributes[attr]}
            onChange={handleChange}
            placeholder={attr}
          />
        ))}
      </div>
      <textarea
        name="Description"
        value={formData.Description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <button type="submit">{beast ? 'Update' : 'Add'} Beast</button>
    </form>
  );
};

export default BeastForm;