// src/components/BeastList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BeastList = ({ onDelete }) => {
  const [beasts, setBeasts] = useState([]);

  useEffect(() => {
    axios.get('/beasts')
      .then(response => setBeasts(response.data || [])) // Default to an empty array if null
      .catch(error => {
        console.error('Error fetching beasts:', error);
        setBeasts([]); // Set to an empty array on error
      });
  }, []);

  const [editingBeast, setEditingBeast] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleEditClick = (beast) => {
    setEditingBeast(beast.BeastName);
    setEditFormData(beast);
  };

  const handleCancelClick = () => {
    setEditingBeast(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name in editFormData.Attributes) {
      setEditFormData({
        ...editFormData,
        Attributes: { ...editFormData.Attributes, [name]: value }
      });
    } else {
      setEditFormData({ ...editFormData, [name]: value });
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`/beasts/${editFormData.BeastName}`, editFormData)
      .then(() => {
        setEditingBeast(null);
        window.location.reload();
      })
      .catch(error => console.error('Error updating beast:', error));
  };

  return (
    <div>
      <h2>Beasts</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>CR</th>
            <th>Attributes</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {beasts.length > 0 ? (
            beasts.map(beast => (
              <tr key={beast.BeastName}>
                {editingBeast === beast.BeastName ? (
                  <>
                    <td>{beast.BeastName}</td>
                    <td>
                      <input
                        type="text"
                        name="Type"
                        value={editFormData.Type}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="CR"
                        value={editFormData.CR}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      {Object.keys(editFormData.Attributes).map(attr => (
                        <input
                          key={attr}
                          type="text"
                          name={attr}
                          value={editFormData.Attributes[attr]}
                          onChange={handleEditChange}
                          placeholder={attr}
                        />
                      ))}
                    </td>
                    <td>
                      <textarea
                        name="Description"
                        value={editFormData.Description}
                        onChange={handleEditChange}
                        required
                      />
                    </td>
                    <td>
                      <button onClick={handleEditSubmit}>Save</button>
                      <button onClick={handleCancelClick}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{beast.BeastName}</td>
                    <td>{beast.Type}</td>
                    <td>{beast.CR}</td>
                    <td>
                      {Object.entries(beast.Attributes).map(([key, value]) => (
                        <div key={key}>{key}: {value}</div>
                      ))}
                    </td>
                    <td>{beast.Description}</td>
                    <td>
                      <button onClick={() => handleEditClick(beast)}>Edit</button>
                      <button onClick={() => onDelete(beast.BeastName)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No beasts available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BeastList;