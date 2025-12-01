import { useEffect, useState } from "react";
import axios from "axios";

function DataFetcher() {
  const [postId, setPostId] = useState(1);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );

        if (isMounted) {
          setData(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Сталася помилка запиту");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [postId]);

  const handleNextPost = () => {
    setPostId((prev) => (prev < 10 ? prev + 1 : 1)); // крутимося 1–10
  };

  return (
    <section>
      <h2>DataFetcher (useEffect + axios)</h2>
      <p>
        Дані завантажуються з <code>JSONPlaceholder</code> за допомогою{" "}
        <code>axios</code>.
      </p>

      <div style={{ marginBottom: "12px" }}>
        <span>Поточний postId: {postId}</span>{" "}
        <button type="button" onClick={handleNextPost}>
          Завантажити наступний пост
        </button>
      </div>

      {isLoading && <p>Завантаження даних...</p>}

      {error && <p style={{ color: "red" }}>Помилка: {error}</p>}

      {!isLoading && !error && data && (
        <article>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </article>
      )}
    </section>
  );
}

export default DataFetcher;
