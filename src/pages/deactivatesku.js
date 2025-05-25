// src/pages/DeactivateSKU.js
import React, { useState } from 'react';
import './deactivatesku.css';

export default function SKUDeactivation() {
  const [inputSKU, setInputSKU] = useState('');
  const [deactivatedList, setDeactivatedList] = useState([]);
  const [msg, setMsg] = useState('');

  const onDeactivate = (event) => {
    event.preventDefault();

    if (!inputSKU.trim()) return;

    const entry = {
      sku: inputSKU.trim(),
      deactivatedAt: new Date().toLocaleString(),
    };

    setDeactivatedList(prev => [...prev, entry]);
    setMsg(`SKU "${inputSKU}" successfully deactivated.`);
    setInputSKU('');
  };

  return (
    <section className="deactivate-sku-container" aria-label="SKU Deactivation Section">
      <header>
        <h2>Deactivate SKU</h2>
      </header>

      <form className="deactivate-form" onSubmit={onDeactivate} aria-describedby="confirmationMsg">
        <input
          type="text"
          aria-label="SKU ID input"
          placeholder="Enter SKU ID here"
          value={inputSKU}
          onChange={e => setInputSKU(e.target.value)}
          required
        />
        <button type="submit" aria-label="Deactivate SKU">Deactivate</button>
      </form>

      {msg && (
        <p id="confirmationMsg" className="confirmation" role="alert" tabIndex={-1}>
          {msg}
        </p>
      )}

      {deactivatedList.length > 0 && (
        <div className="deactivation-list" aria-live="polite">
          <h3>Deactivated SKUs</h3>
          <ul>
            {deactivatedList.map(({ sku, deactivatedAt }, i) => (
              <li key={`${sku}-${i}`}>
                <strong>{sku}</strong> — Deactivated at: <time dateTime={new Date(deactivatedAt).toISOString()}>{deactivatedAt}</time>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
