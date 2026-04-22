import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userId, setUserId] = useState("");
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState(null);

  const API = "http://localhost:8081";

  const addScore = async () => {
    const res = await axios.get(
      `${API}/api/scores/add?userId=${userId}&score=${score}&date=${date}`
    );
    alert(res.data);
  };

  const runDraw = async () => {
    const res = await axios.get(`${API}/api/draw/run`);
    setResult(res.data);
  };

  const subscribe = async () => {
    const res = await axios.get(
      `${API}/api/subscription/subscribe?userId=${userId}&plan=monthly`
    );
    alert(res.data);
  };

  return (
    <div className="container">
      <h1>🏌️ Golf Draw System</h1>

      <div className="card">
        <h2>Add Score</h2>
        <input placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
        <input placeholder="Score" onChange={(e) => setScore(e.target.value)} />
        <input placeholder="Date (YYYY-MM-DD)" onChange={(e) => setDate(e.target.value)} />
        <button onClick={addScore}>Add Score</button>
      </div>

      <div className="card">
        <h2>Subscription</h2>
        <button onClick={subscribe}>Subscribe</button>
      </div>

      <div className="card">
        <h2>Run Draw</h2>
        <button onClick={runDraw}>Run Draw</button>

        {result && (
          <div className="result">
            <h3>Draw Numbers</h3>
            <p>{result.drawNumbers.join(", ")}</p>

            <h3>Winners</h3>
            {result.winners.map((w) => (
  <div key={w.id} className="winner-card">
    <p><strong>User ID:</strong> {w.userId}</p>
    <p><strong>Matches:</strong> {w.matchCount}</p>
    <p><strong>Prize:</strong> ₹{w.prize}</p>
    <p><strong>Status:</strong> {w.status}</p>
  </div>
))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;