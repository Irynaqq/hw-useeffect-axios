import { useEffect, useState } from "react";
import axios from "axios";

function DataFetcher() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDog = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await axios.get(
        "https://dog.ceo/api/breeds/image/random"
      );

      setData(response.data);
    } catch (err) {
      setError(err.message || "Сталася помилка запиту");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <section>
      <h2>Dogs</h2>

      <button type="button" onClick={fetchDog}>
        Показати іншого песика
      </button>

      {isLoading && <p>Завантаження даних...</p>}

      {error && <p style={{ color: "red" }}>Помилка: {error}</p>}

      {!isLoading && !error && data && (
        <article>
          <img
            src={data.message}
            alt="Dog"
            style={{
              width: "300px",
              borderRadius: "16px",
              marginTop: "16px",
              boxShadow: "0 6px 14px rgba(0,0,0,0.2)",
            }}
          />
        </article>
      )}
    </section>
  );
}

export default DataFetcher;
