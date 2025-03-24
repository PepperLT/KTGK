import React, { useState } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Share } from "@capacitor/share";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState(null);

  const calculateBMI = () => {
    if (!height || !weight) return;
    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    let result = "";
    if (bmiValue < 18.5) result = "Gầy";
    else if (bmiValue < 24.9) result = "Bình thường";
    else if (bmiValue < 29.9) result = "Thừa cân";
    else result = "Béo phì";
    setStatus(result);
    sendNotification(bmiValue, result);
  };

  const sendNotification = async (bmi, status) => {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: "Kết quả BMI",
          body: `Chỉ số BMI của bạn: ${bmi} - ${status}`,
          id: 1,
        },
      ],
    });
  };

  const shareResult = async () => {
    if (!bmi) return;
    await Share.share({
      title: "Kết quả BMI",
      text: `Chỉ số BMI của tôi là ${bmi} - ${status}`,
      dialogTitle: "Chia sẻ kết quả BMI"
    });
  };

  const takePhoto = async () => {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt, // Cho phép chọn camera hoặc thư viện ảnh
      quality: 100,
    });
    setPhoto(image.webPath);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", textAlign: "center" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>Tính BMI</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>Chiều cao (cm)</label>
        <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Cân nặng (kg)</label>
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} style={{ width: "100%", padding: "8px", marginTop: "5px" }} />
      </div>
      <button onClick={calculateBMI} style={{ width: "100%", padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Tính toán BMI</button>
      {bmi && (
        <>
          <p style={{ marginTop: "15px", fontSize: "16px" }}>
            Chỉ số BMI: <strong>{bmi}</strong> - <strong>{status}</strong>
          </p>
          <button onClick={shareResult} style={{ width: "100%", padding: "10px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>Chia sẻ kết quả</button>
        </>
      )}
      <button onClick={takePhoto} style={{ width: "100%", padding: "10px", backgroundColor: "#ffc107", color: "black", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>Chụp ảnh</button>
      {photo && <img src={photo} alt="User" style={{ marginTop: "10px", width: "100%", borderRadius: "10px" }} />}
    </div>
  );
};

export default BMICalculator;
