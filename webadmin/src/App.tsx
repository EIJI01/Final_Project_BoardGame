import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/Test")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  }, []);

  return (
    <div>
      {data.map((item, i) => (
        <div key={i} style={{ color: "black", fontSize: "2rem", fontWeight: "bold" }}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default App;
