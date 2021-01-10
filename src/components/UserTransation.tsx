import React, { useState } from "react";
import { SingleTransation } from "../pages/Account";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa";

interface Props {
  transation: SingleTransation;
}

const UserTransation: React.FC<Props> = ({ transation }) => {
  const [showTable, setShowTable] = useState<boolean>(false);

  const { products, date } = transation;

  const total = products.reduce((total, item) => {
    return (total += item.total);
  }, 0);
  
  return (
    <div className="transation">
      <div className="transation-inner">
        <button
          className={`transation-btn ${showTable && "showTable"} `}
          onClick={() => setShowTable((e) => !e)}
        >
          <FaArrowDown />
        </button>
        <h2 className="transation-date">{date}</h2>
        <h2 className="transation-total">{total}$</h2>
      </div>
      <div className={`transation__table-wrapper ${showTable && "showTable"} `}>
        <table>
          <thead>
            <tr>
              <th>name</th>
              <th>quantity</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`product/${prod.id}`}>{prod.name}</Link>
                  </td>
                  <td>{prod.amount}</td>
                  <td>{prod.total}$</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTransation;
