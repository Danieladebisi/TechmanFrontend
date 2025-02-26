// import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import React from "react";

const Related = () => {
const relatedPhones = [
  { id: 1, name: "Samsung Galaxy A06 5G", image: "/images/a06-5g.png" },
  { id: 2, name: "Samsung Galaxy A06", image: "/images/a06.png" },
  { id: 3, name: "Motorola Moto G35", image: "/images/moto-g35.png" },
  { id: 4, name: "Samsung Galaxy F15", image: "/images/f15.png" },
  { id: 5, name: "Samsung Galaxy A16 5G", image: "/images/a16-5g.png" },
  { id: 6, name: "Samsung Galaxy F05", image: "/images/f05.png" },
  { id: 7, name: "Samsung Galaxy M15", image: "/images/m15.png" },
  { id: 8, name: "Motorola Moto G45", image: "/images/moto-g45.png" },
  { id: 9, name: "Samsung Galaxy M35", image: "/images/m35.png" },
  { id: 10, name: "Samsung Galaxy S25 Ultra", image: "/images/s25-ultra.png" },
];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Related Phones</h2>
      <ul className="mt-4">
        {relatedPhones.map((phone) => (
          <li key={phone.id} className="mb-2">
            <Link to={`/phone/${phone.id}`} className="text-blue-500 hover:underline">
              {phone.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Related;
