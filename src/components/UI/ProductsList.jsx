// import React from "react";
// import ProductCard from "./ProductCard";

// const ProductsList = () => {
//   return (
//     <>
//       <ProductCard />
//       <ProductCard />
//       <ProductCard />
//       <ProductCard />
//     </>
//   );
// };

// export default ProductsList;

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

const ProductsList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
          console.log(doc.id, " =>", doc.data());
        });
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
    // <>
    //   <ProductCard />
    //   <ProductCard />
    //   <ProductCard />
    //   <ProductCard />
    // </>
  );
};

export default ProductsList;
