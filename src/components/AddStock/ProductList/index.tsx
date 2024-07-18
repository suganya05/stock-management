import React from "react";
import ImgOne from "../../../assets/images/img-1.jpg";
import EditIcon from "../../../assets/images/edit.png";
import DeleteIcon from "../../../assets/images/delete.png";
import "./ProductList.scss";

const ProductList: React.FC = () => {
  return (
    <div className="product-list-wrapper">
      <div className="product-list-content">
        <div className="head">
          <h4>All Product List</h4>
        </div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>
                  <span>Name</span>
                </th>
                <th>
                  <span>Image</span>
                </th>
                <th>
                  <span>Unit</span>
                </th>
                <th>
                  <span>Edit</span>
                </th>
                <th>
                  <span>Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, i) => (
                <tr key={i.toString()} style={{ cursor: "pointer" }}>
                  <td>
                    <span>Nandini Milk 1 Litre</span>
                  </td>
                  <td>
                    <div className="img-box">
                      <img src={ImgOne} alt="" />
                    </div>
                  </td>
                  <td>
                    <span>Litre</span>
                  </td>
                  <td>
                    <div className="edit-icon">
                      <img src={EditIcon} alt="" />
                    </div>
                  </td>
                  <td>
                    <div className="delete-icon">
                      <img src={DeleteIcon} alt="" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
