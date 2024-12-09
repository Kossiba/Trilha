import { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    // Acessa a câmera
    navigator.mediaDevices
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
      // Limpa o recurso da câmera ao desmontar o componente
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (canvasRef.current && videoRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

        // Tenta detectar o QR code
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setQrCode(code.data);
          console.log("QR Code detectado:", code.data);
        }
      }
    }, 500); // Tenta ler o QR code a cada 500ms

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {qrCode && <p>QR Code detectado: {qrCode}</p>}
    </div>
  );
};

export default QRCodeScanner;
