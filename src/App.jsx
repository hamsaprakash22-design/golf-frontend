import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);

  // ✅ Backend URL (IMPORTANT)
  const API = "https://golf-backend-mpxh.onrender.com";

  // ✅ Add Score
  const addScore = async () => {
    try {
      const res = await axios.get(
        `${API}/api/scores/add?userId=${userId}&score=${score}&date=${date}`
      );
      alert(res.data);
    } catch (error) {
      console.error(error);
      alert("Error adding score");
    }
  };

  // ✅ Run Draw
  const runDraw = async () => {
    try {
      const res = await axios.get(`${API}/api/draw/run`);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert("Error running draw");
    }
  };

  // ✅ Subscribe
  const subscribe = async () => {
    try {
      const res = await axios.get(
        `${API}/api/subscription/subscribe?userId=${userId}&plan=monthly`
      );
      alert(res.data);
    } catch (error) {
      console.error(error);
      alert("Subscription error");
    }
  };

  return (
    <div className="container" style={{ padding: "20px" }}>
      <h1>🏌️ Golf Draw System</h1>

      {/* ✅ Add Score */}
      <div className="card">
        <h2>Add Score</h2>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <br />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <button onClick={addScore}>Add Score</button>
      </div>

      {/* ✅ Run Draw */}
      <div className="card">
        <h2>Run Draw</h2>
        <button onClick={runDraw}>Run Draw</button>

        {result && (
          <div>
            <h3>Result:</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* ✅ Subscribe */}
      <div className="card">
        <h2>Subscription</h2>
        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <button onClick={subscribe}>Subscribe Monthly</button>
      </div>
    </div>
  );
}

export default App;