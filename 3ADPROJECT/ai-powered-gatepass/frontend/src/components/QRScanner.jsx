import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import api from "../api";

const QRScanner = () => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          const res = await api.post("/api/gatekeeper/scan", {
            qr_token: decodedText,
          });
          alert(res.data.message || "Gate pass verified");
        } catch (err) {
          alert("Verification failed");
        }
      },
      (error) => {
        console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(() => { });
    };
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <div id="qr-reader" style={{ width: "300px" }} />
    </div>
  );
};

export default QRScanner;
