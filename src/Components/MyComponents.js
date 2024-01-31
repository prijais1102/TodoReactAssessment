import React, { useEffect, useState } from 'react';
import axios from 'axios';
 
function MyComponents() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:21384/api/User/GetAll');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
 
    fetchData();
  },[]);
 
  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
<div>
      {data ? (
<ul>
          {data.map((item) => (
        <li>{item.firstName}</li> 
        
          ))}
</ul>
      ) : (
<div>No data available</div>
      )}
</div>
  );
}
 
export default MyComponents;