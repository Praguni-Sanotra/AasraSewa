import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const FaceVerify = () => {
  const webcamRef = useRef(null);
  const [storedImage, setStoredImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const videoConstraints = {
    width: 350,
    height: 350,
    facingMode: 'user',
  };

  // Base64 to Blob converter
  const base64toBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // Capture reference image
  const captureStoredFace = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setStoredImage(imageSrc);
      setResult('');
    }
  };

  // Verify captured face
  const verifyFace = async () => {
    if (!storedImage) {
      alert('Please capture the reference face first.');
      return;
    }

    const verifyImage = webcamRef.current.getScreenshot();
    if (!verifyImage) {
      alert('Failed to capture verification image.');
      return;
    }

    const blob1 = base64toBlob(storedImage);
    const blob2 = base64toBlob(verifyImage);

    const formData = new FormData();
    formData.append('image1', blob1, 'image1.png');
    formData.append('image2', blob2, 'image2.png');

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL;
      console.log("API URL:", API_URL);

      const response = await axios.post(`${API_URL}/api/face/verify`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { match, distance } = response.data;
      setResult(
        match
          ? `✅ Face Match! (Distance: ${distance})`
          : `❌ Not a Match (Distance: ${distance})`
      );
    } catch (error) {
      console.error("❌ Axios Error:", error);
      setResult('⚠️ Error verifying face. Check backend or network.');
    } finally {
      setLoading(false);
    }
  };

  // Optional: ping backend on load
  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;
    console.log("Checking backend at:", API_URL);
    axios.get(`${API_URL}/api/face/ping`)
      .then(res => console.log("✅ Backend reachable:", res.data))
      .catch(err => console.error("❌ Backend not reachable:", err.message));
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Face Verification</h2>
      <Webcam
        audio={false}
        height={350}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
        videoConstraints={videoConstraints}
        mirrored
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={captureStoredFace} disabled={loading}>
          📸 Capture Reference
        </button>
        <button onClick={verifyFace} disabled={loading} style={{ marginLeft: '10px' }}>
          🔍 Verify Face
        </button>
      </div>
      {loading && <p>Verifying...</p>}
      {result && (
        <p style={{ marginTop: '10px' }}>
          <strong>{result}</strong>
        </p>
      )}
      {storedImage && (
        <div style={{ marginTop: '20px' }}>
          <p>Reference Face:</p>
          <img src={storedImage} alt="Stored" width={150} />
        </div>
      )}
    </div>
  );
};

export default FaceVerify;
