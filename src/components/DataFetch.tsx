// import React, { useEffect, useState } from 'react'

// const DataFetch = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch("https://jsonplaceholder.typicode.com/posts");
//                 const result = await response.json();
//                 setData(result);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();    
//     }, []);
//     return (
//         <div>
//             <h3>
//                 Data Fetching...
//             </h3>
//             {loading ? (<p>Please wait...</p>) : <div style={{border: "1px solid #ccc", padding: "40px"}}>
//                 {data.map((post, index) => {
//                     return <div key={post.id} style={{borderBottom: "2px solid #ccc"}}>
//                         <h3> {index + 1} . {post.title}</h3>
//                         <p>{post.body}</p>
//                     </div>
//                 })}
//             </div>}
//         </div>
//     )
// }

// export default DataFetch
