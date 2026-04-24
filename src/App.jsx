import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);

  // 🔥 IMPORTANT: your Render backend URL
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
      alert("Backend error");
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
    <div className="container">
      <h1>🏌️ Golf Draw System</h1>

      {/* ADD SCORE */}
      <div className="card">
        <h2>Add Score</h2>

        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button onClick={addScore}>Add Score</button>
      </div>

      {/* RUN DRAW */}
      <div className="card">
        <h2>Run Draw</h2>
        <button onClick={runDraw}>Run Draw</button>

        {result && (
          <div>
            <h3>Winners</h3>

            <table border="1" style={{ margin: "10px auto" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Match Count</th>
                  <th>Prize</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {result.winners.map((w) => (
                  <tr key={w.id}>
                    <td>{w.id}</td>
                    <td>{w.userId}</td>
                    <td>{w.matchCount}</td>
                    <td>{w.prize}</td>
                    <td>{w.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Draw Numbers</h3>
            <p>{result.drawNumbers.join(", ")}</p>
          </div>
        )}
      </div>

      {/* SUBSCRIPTION */}
      <div className="card">
        <h2>Subscription</h2>

        <input
          type="number"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <button onClick={subscribe}>Subscribe Monthly</button>
      </div>
    </div>
  );
}

export default App;