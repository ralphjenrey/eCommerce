import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const Explore = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/product-list');
        console.log(response.data);

        const uniqueData = response.data.filter((item, index, self) =>
          index === self.findIndex((t) => t.id === item.id)
        );

        setData(uniqueData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const items = data.map((item) => {
    return { ...item, qty: 1 };
  });

  const categories = [
    "Samsung",
    "Asus",
    "Nokia",
    "Xiaomi",
    "Google",
    "Motorola",
    "Sony",
    "Oneplus",
    "Apple",
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const resetFilter = () => {
    setSelectedCategory(null);
  };

  const filteredItems = selectedCategory
    ? items.filter((item) => item.id.toLowerCase().includes(selectedCategory.toLowerCase()))
    : items;

  return (
    <div className="flex">
      <div>
        <div className="flex flex-col items-start gap-2 p-4">
          <p className="text-lg font-semibold mb-2 text-white">Filter by Category:</p>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={`text-sm p-2 rounded-md bg-slate-200 hover:bg-slate-300  ${
                selectedCategory === category ? 'bg-blue-500' : 'dark:bg-[#404040]'
              } dark:hover:bg-[#505050] text-black dark:text-white`}
            >
              {category}
            </button>
          ))}
          <button
            onClick={resetFilter}
            className="text-sm p-2 rounded-md bg-slate-200 hover:bg-slate-300 dark:bg-[#404040] dark:hover:bg-[#505050] text-black dark:text-white"
          >
            Remove Filter
          </button>
        </div>
      </div>
      <div className="w-full min-h-fit p-10 md:p-20 grid grid-cols-1 gap-y-6 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 mx-auto ">
        {filteredItems.map((shoe, idx) => (
          <Card key={shoe.id} shoe={shoe} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
