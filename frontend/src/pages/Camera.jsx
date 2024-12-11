import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import jsQR from "jsqr";

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Acessar a câmera
    navigator.mediaDevicesF
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error("Erro ao acessar a câmera:", err);
      });

    return () => {
      // Limpa os recursos da câmera ao desmontar o componente
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Verificar QR Code a cada intervalo
    const interval = setInterval(() => {
      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Detecta QR Code
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setQrCode(code.data);
          navigate("/CardDetails", { state: { qrCodeData: code.data } });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {qrCode && <p>QR Code detectado: {qrCode}</p>}
    </div>
  );
};

export default QRCodeScanner;
