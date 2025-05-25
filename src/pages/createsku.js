import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './createsku.css';

export default function SKUCreation() {
  const [fields, setFields] = useState({
    itemName: '',
    skuMode: 'auto',  // 'auto' or 'manual'
    skuCode: '',
    category: '',
    subcategory: '',
    brandName: '',
  });

  const [createdSKU, setCreatedSKU] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const skuCodeFinal = fields.skuMode === 'auto'
      ? `SKU-${uuidv4().slice(0, 8).toUpperCase()}`
      : fields.skuCode;

    const newSKU = {
      id: uuidv4(),
      itemName: fields.itemName,
      skuCode: skuCodeFinal,
      category: fields.category,
      subcategory: fields.subcategory,
      brandName: fields.brandName,
    };

    setCreatedSKU(newSKU);

    setFields({
      itemName: '',
      skuMode: 'auto',
      skuCode: '',
      category: '',
      subcategory: '',
      brandName: '',
    });
  };

  return (
    <section className="sku-container">
      <h2>Create SKU </h2>
      <form className="sku-form" onSubmit={handleSubmit}>

        <label>
          Item Name
          <input
            name="itemName"
            type="text"
            value={fields.itemName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          SKU Mode
          <select name="skuMode" value={fields.skuMode} onChange={handleChange}>
            <option value="auto">Auto Generate</option>
            <option value="manual">Manual Entry</option>
          </select>
        </label>

        {fields.skuMode === 'manual' && (
          <label>
            SKU Code
            <input
              name="skuCode"
              type="text"
              value={fields.skuCode}
              onChange={handleChange}
              required
            />
          </label>
        )}

        <label>
          Category
          <input
            name="category"
            type="text"
            value={fields.category}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Subcategory
          <input
            name="subcategory"
            type="text"
            value={fields.subcategory}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Brand Name
          <input
            name="brandName"
            type="text"
            value={fields.brandName}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="button-submit">Create SKU</button>
      </form>

      {createdSKU && (
        <article className="success-message" aria-live="polite">
          <h3>SKU Created Successfully!</h3>
          <p><strong>Item:</strong> {createdSKU.itemName}</p>
          <p><strong>SKU Code:</strong> {createdSKU.skuCode}</p>
          <p><strong>Category:</strong> {createdSKU.category}</p>
          <p><strong>Subcategory:</strong> {createdSKU.subcategory}</p>
          <p><strong>Brand:</strong> {createdSKU.brandName}</p>
        </article>
      )}
    </section>
  );
}
