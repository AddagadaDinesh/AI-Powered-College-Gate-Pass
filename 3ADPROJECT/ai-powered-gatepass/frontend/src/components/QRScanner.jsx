import React, { useState } from "react";
import QrReader from "react-qr-reader"; // v2 works with React 17

const QRScanner = () => {
  const [scanResult, setScanResult] = useState("No result");

  const handleScan = (data) => {
    if (data) {
      setScanResult(data);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>Scanned Result: {scanResult}</p>
    </div>
  );
};

export default QRScanner;
