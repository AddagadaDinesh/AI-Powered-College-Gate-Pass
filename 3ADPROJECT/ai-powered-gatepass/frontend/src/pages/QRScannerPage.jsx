import React from "react";
import QRScanner from "../components/QRScanner"; // make sure the path is correct

const QRScannerPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>QR Scanner Page</h1>
      <QRScanner />
    </div>
  );
};

export default QRScannerPage;
