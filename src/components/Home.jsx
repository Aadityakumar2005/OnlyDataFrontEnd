/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import unplugged1 from "../assets/pic.jpg";
import unplugged from "../assets/pic.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState(null);
  const navigate = useNavigate();

  const fetchData = async (roll) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/data/${roll}`
      );
      setSelectedCardData(response.json);
      const data = response.data;
      navigate(`/view_data/${roll}`, { state: { data, roll } });
    } catch (error) {
      console.log("can't fetch single data", error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/allData");
        setProducts(response.data);
      } catch (error) {
        setErr(true);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const fetchImagesAndUpdateProducts = async () => {
      const updatedProducts = await Promise.all(
        products.map(async (product) => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/data/${product.roll}/image`,
              { responseType: "blob" }
            );
            const imageUrl = URL.createObjectURL(response.data);
            return { ...product, imageUrl };
          } catch (error) {
            setErr(true);
            console.error(
              "Error fetching image for product ID:",
              product.id,
              error
            );
            return { ...product, imageUrl: "placeholder-image-url" };
          }
        })
      );
      setData(updatedProducts);
    };
    fetchImagesAndUpdateProducts();
  }, [products]);

  if (err) {
    return (
      <div className="p-20 flex items-center justify-center">
        <div className="w-96 h-96 ">
          <img src={unplugged} alt="" />
        </div>
      </div>
    );
  }

  if (selectedCardData == null) {
    return (
      <div className="bg-gray-100 py-8 px-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((user) => {
            const { roll, name, imageUrl } = user;
            return (
              <>
                <div
                  className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
                  key={roll}
                >
                  <div className="h-80"><img src={imageUrl} className="w-full h-full object-cover" /></div>
                  <div className="p-4 font-serif">
                    <h2 className="text-lg font-semibold text-gray-800">
                      <p className="inline mx-4"> Name :</p> {name}
                    </h2>
                    <h2 className="text-lg font-semibold text-gray-800">
                      <p className="inline mx-4"> Roll No :</p>
                      {roll}
                    </h2>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition mx-24"
                      onClick={() => fetchData(roll)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    );
  }
};

export default Home;
