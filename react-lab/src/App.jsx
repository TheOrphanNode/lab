import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="container">
      <div className="card">
        <span className="badge">React 18 + Vite</span>
        <h1>⚛️ React Lab</h1>
        <p className="subtitle">Deneysel React bileşenlerin ve çalışmaların için temiz başlangıç noktası.</p>
        
        <div className="counter-box">
          <button onClick={() => setCount((prev) => prev + 1)}>
            Sayaç: {count}
          </button>
          <button className="reset-btn" onClick={() => setCount(0)}>
            Sıfırla
          </button>
        </div>

        <p className="read-the-docs">
          Düzenlemek için <code>src/App.jsx</code> dosyasını açabilirsin.
        </p>
      </div>
    </div>
  )
}

export default App
