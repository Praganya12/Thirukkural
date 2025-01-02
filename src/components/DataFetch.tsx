import React, { useEffect, useState } from 'react';

// Define a Post interface for the data you're fetching
interface Post {
  id: number;
  title: string;
  body: string;
}

const DataFetch = () => {
  // Type the data state as an array of Post objects
  const [data, setData] = useState<Post[]>([]); // <--- Change this line
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result: Post[] = await response.json(); // Type the result here as well
        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>Data Fetching...</h3>
      {loading ? (
        <p>Please wait...</p>
      ) : (
        <div style={{ border: "1px solid #ccc", padding: "40px" }}>
          {data.map((post, index) => {
            return (
              <div key={post.id} style={{ borderBottom: "2px solid #ccc" }}>
                <h3>
                  {index + 1} . {post.title}
                </h3>
                <p>{post.body}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DataFetch;
