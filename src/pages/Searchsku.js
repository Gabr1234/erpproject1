// src/pages/Search.js
import React, { useState } from 'react';
import './Searchsku.css';

export default function SKUFinder() {
  const [query, setQuery] = useState('');
  const [foundItems, setFoundItems] = useState([]);

  // بيانات تجريبية يمكن تبديلها ببيانات حقيقية
  const inventory = [
    { sku: 'SKU123', name: 'Item A', category: 'Electronics' },
    { sku: 'SKU456', name: 'Item B', category: 'Clothing' },
    { sku: 'SKU789', name: 'Item C', category: 'Electronics' },
  ];

  const onSearch = (event) => {
    event.preventDefault();

    const loweredQuery = query.trim().toLowerCase();

    const filteredItems = inventory.filter(({ sku, name, category }) =>
      sku.toLowerCase().includes(loweredQuery) ||
      name.toLowerCase().includes(loweredQuery) ||
      category.toLowerCase().includes(loweredQuery)
    );

    setFoundItems(filteredItems);
  };

  return (
    <main className="search-container">
      <h2>Search SKU Items</h2>

      <form onSubmit={onSearch} role="search" aria-label="SKU Search Form">
        <input
          type="search"
          placeholder="Search SKU, Name, or Category"
          value={query}
          onChange={e => setQuery(e.target.value)}
          aria-label="Search input"
          required
        />
        <button type="submit" aria-label="Start Search">Search</button>
      </form>

      {foundItems.length > 0 ? (
        <section className="results" aria-live="polite">
          <h3>Results Found:</h3>
          <ul>
            {foundItems.map(({ sku, name, category }) => (
              <li key={sku}>
                <strong>{name}</strong> — Category: {category} — SKU: {sku}
              </li>
            ))}
          </ul>
        </section>
      ) : (
        query && <p>No matching items found for "{query}".</p>
      )}
    </main>
  );
}
