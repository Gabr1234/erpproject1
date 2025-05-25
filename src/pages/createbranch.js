import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './createbranch.css';

export default function BranchManager() {
  const [formData, setFormData] = useState({
    branchName: '',
    location: '',
    contact: '',
  });

  const [branches, setBranches] = useState([]);
  const [lastCreatedId, setLastCreatedId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBranch = (e) => {
    e.preventDefault();
    const newBranch = {
      id: uuidv4(),
      name: formData.branchName.trim(),
      location: formData.location.trim(),
      contact: formData.contact.trim(),
    };

    if (!newBranch.name || !newBranch.location || !newBranch.contact) return;

    setBranches((prev) => [...prev, newBranch]);
    setLastCreatedId(newBranch.id);
    setFormData({ branchName: '', location: '', contact: '' });
  };

  return (
    <div className="main-content">
      <section className="container" aria-label="Branch creation and list">
        <h1 className="title">Add Inventory Branch</h1>

        <form onSubmit={handleAddBranch} aria-describedby="formInstructions">
          <p id="formInstructions" style={{ marginBottom: 20, color: '#666' }}>
            Fill in the details to add a new branch.
          </p>

          {['branchName', 'location', 'contact'].map((field) => (
            <div key={field} className="form-group">
              <label htmlFor={field}>
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                placeholder={`Enter ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                value={formData[field]}
                onChange={handleInputChange}
                required
                autoComplete="off"
              />
            </div>
          ))}

          <button type="submit" className="button-submit" aria-label="Add branch">
            Add Branch
          </button>
        </form>

        {lastCreatedId && (
          <div role="alert" className="success-message">
            Branch created! <br />
            <span>
              Branch ID: <strong>{lastCreatedId}</strong>
            </span>
          </div>
        )}

        {branches.length > 0 && (
          <div className="branches-list" aria-live="polite">
            <h2>Branches</h2>
            <ul>
              {branches.map(({ id, name, location, contact }) => (
                <li key={id}>
                  <div>
                    <strong>{name}</strong>
                    <br />
                    <small className="branch-info">{location} | {contact}</small>
                  </div>
                  <span className="branch-id">ID: {id.slice(0, 8)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
