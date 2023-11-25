import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increaseQty } from "../redux/slices/CartSlice";
import toast from "react-hot-toast";
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import { Link } from "react-router-dom";

const Card = ({ shoe }) => {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  // console.log(shoe);
  const img = shoe.img;
  const price = shoe.price;
  const desc = shoe.name;
  const id = shoe.id;

  const dispatch = useDispatch();

  const add = () => {
    // Check if the item with the same ID already exists in the cart
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      // If it exists, dispatch an action to increase its quantity
      dispatch(increaseQty(id));
      toast.success("Added to cart");
    } else {
      // If it doesn't exist, dispatch an action to add it to the cart
      dispatch(addToCart(shoe));
      toast.success("Added to cart");
    }
  };

  const handlePreview = () => {
    // Perform any actions you need before navigating, if necessary
    // Use React Router's history to navigate to the specified URL
    navigate(`/preview/${id}`);
  };

  // const remove = (itemIdx) => {
  //   dispatch(removeFromCart(itemIdx));
  //   toast.error("Removed item from cart");
  // };

  return (
    <div>
      <div className="w-[300px] h-[420px] shadow-sm rounded-2xl p-4 bg-slate-50 dark:bg-[#ffffff] dark:hover:bg-[#ECECEC] dark:text-black dark:outline-none dark:border-none border border-slate-100 outline outline-slate-100  hover:shadow-2xl relative">
        <div className=" flex flex-col gap-6">
          <div onClick={handlePreview} style={{ cursor: 'pointer' }}>
            <img
              src={img}
              width={300}
              height={300}
              alt="shoe"
              className="mx-auto h-[250px] w-auto"
            />
             <div className="absolute bg-slate-600 dark:bg-slate-800 dark:font-semibold text-white text-xs p-1 top-2 right-2 rounded-md animate-pulse">
                <AspectRatioIcon />
              </div>
          </div>

          <p className="text-base font-medium max-h-[96px] overflow-y-hidden">
            {desc}
          </p>

          <div className="flex  items-center justify-between">
           
              <button
                onClick={add}
                className="bg-black dark:bg-slate-800 dark:hover:bg-black text-white p-2 rounded-md text-sm "
              >
                Add to Cart
              </button>
            <span className="text-xl font-semibold">  ₱ {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
