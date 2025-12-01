import "./index.css";
import DataFetcher from "./components/DataFetcher";

function App() {
  return (
    <div className="container">
      <div className="card">
        <h1>React + useEffect + axios</h1>
        <p>
          Проєкт демонструє роботу з асинхронними HTTP-запитами за допомогою{" "}
          <code>useEffect</code> та <code>axios</code>.
        </p>

        <DataFetcher />
      </div>
    </div>
  );
}

export default App;
