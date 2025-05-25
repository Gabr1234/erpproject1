import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import CreateBranch from './pages/createbranch';
import CreateSKU from './pages/createsku';
import SKUSearch from './pages/Searchsku';
import DeactivateSKU from './pages/deactivatesku';
import BarcodeQRIntegration from './pages/Barcode';

import './App.css';

const Home = () => (
  <div className="main-content">
    <h1>Inventory branch Setup</h1>
    <p>Welcome to the Inventory branch setup.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      {/* Sidebar Navigation */}
      <nav className="main-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          HomePage
        </NavLink>
        <NavLink to="/create-branch" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Create Branch
        </NavLink>
        <NavLink to="/create-sku" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Create SKU
        </NavLink>
        <NavLink to="/search-sku" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Search SKU
        </NavLink>
        <NavLink to="/deactivate-sku" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Deactivate SKU
        </NavLink>
        <NavLink to="/barcode-qr" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Barcode/QR 
        </NavLink>
      </nav>

      {/* Main Content Routes */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-branch" element={<CreateBranch />} />
          <Route path="/create-sku" element={<CreateSKU />} />
          <Route path="/search-sku" element={<SKUSearch />} />
          <Route path="/deactivate-sku" element={<DeactivateSKU />} />
          <Route path="/barcode-qr" element={<BarcodeQRIntegration />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
