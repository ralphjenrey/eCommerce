import React, { useState, useEffect } from "react";
import PreviewCard from "../components/PreviewCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const Preview = (props) => {
  const { id } = useParams();
  const [shoeData, setShoeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/product-list`);
        setShoeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  // Filter the data based on the id
  const shoe = shoeData.find(item => item.id == id);

  return (
    <div className="">
      <PreviewCard shoe={shoe} id={id} />
    </div>
  );
};

export default Preview;
