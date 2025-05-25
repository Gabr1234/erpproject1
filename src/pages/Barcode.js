import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrReader } from 'react-qr-reader';
import './Barcode.css';

export default function BarcodeQRIntegration() {
  const [inputValue, setInputValue] = useState('');
  const [scannedData, setScannedData] = useState('');

  const onScan = (result) => {
    if (result) setScannedData(result);
  };

  const onError = (err) => {
    console.warn('Error during QR scan:', err);
  };

  return (
    <div className="main-content">
      <main className="barcode-container" role="main" aria-label="Barcode and QR Code Manager">
        <header>
          <h1>Barcode & QR Code </h1>
        </header>

        {/* QR Code Generator Section */}
        <section className="section" aria-labelledby="generate-title">
          <h2 id="generate-title" className="section-title">QR Code Generator</h2>
          <input
            type="text"
            className="input-field"
            placeholder="Enter SKU or Product ID"
            aria-label="Input for QR code generation"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.trimStart())}
            autoComplete="off"
          />
          <div className="qr-display" aria-live="polite" aria-atomic="true">
            {inputValue ? <QRCodeSVG value={inputValue} size={180} /> : <p>Enter text to generate QR code.</p>}
          </div>
        </section>

        {/* QR Code Scanner Section */}
        <section className="section" aria-labelledby="scan-title">
          <h2 id="scan-title" className="section-title">QR Code Scanner</h2>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (result) onScan(result.text);
              if (error) onError(error);
            }}
            style={{ width: '100%' }}
            scanDelay={250}
          />
          {scannedData && (
            <div className="scan-result" role="status" aria-live="polite">
              <strong>Scanned Result:</strong> {scannedData}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
