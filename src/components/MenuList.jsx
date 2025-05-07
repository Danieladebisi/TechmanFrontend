import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsColumnsGap, BsImage, BsDiagram3 } from "react-icons/bs";
import { FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";

const MenuList = () => {
  const [compareOpen, setCompareOpen] = useState(false);

  const menuItems = [
    //{ icon: <BsChatText size={20} />, text: "READ OPINIONS", path: "/opinions" },
    { icon: <BsImage size={20} />, text: "PICTURES", path: "/pictures" },
    { icon: <BsDiagram3 size={20} />, text: "RELATED", path: "/pictures" },
  ];

  return (
    <div className="list-group" style={{background: "#rgba(255, 102, 0, 0.4)" }}>
      {/* Compare Dropdown */}
      <div
        className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-decoration-none"
        onClick={() => setCompareOpen(!compareOpen)}
        style={{ cursor: "pointer", background: "rgba(236, 172, 129, 0.4)"}}
      >
        <div className="d-flex align-items-center">
          <span className="me-3 text-secondary"><BsColumnsGap size={20} /></span>
          <span className="fw-bold">COMPARE</span>
        </div>
        <FiChevronRight className={`text-warning ${compareOpen ? "rotate-90" : ""}`} />
      </div>

      {/* Dropdown Content */}
      <Collapse in={compareOpen}>
        <div>
          <Link to="/comparePhones" className="list-group-item list-group-item-action ps-5 text-decoration-none">
            Compare Phones
          </Link>
        </div>
      </Collapse>

      {/* Other Menu Items */}
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="list-group-item list-group-item-action d-flex justify-content-between align-items-center text-decoration-none"
        >
          <div className="d-flex align-items-center">
            <span className="me-3 text-secondary">{item.icon}</span>
            <span className="fw-bold">{item.text}</span>
          </div>
          <FiChevronRight className="text-warning bold" />
        </Link>
      ))}
    </div>
  );
};

export default MenuList;
