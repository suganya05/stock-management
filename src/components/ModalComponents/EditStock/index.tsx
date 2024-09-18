import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { IGetStockItem, IStockItem } from "../../../types/types";
import * as Yup from "yup";
import useProductStore from "../../../context/productStore";
import Button from "../../Button";
import ArrowRight from "../../../assets/icons/arrow-right.png";

const initialValues = {
  quantity: 0,
};

const validationSchema = Yup.object().shape({
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity should be minimum 1"),
});

interface IEditStock {
  editableData: { quantity: number; unit: string } | undefined;
  onSubmit: (updatedValue: { quantity: number }) => void;
}

const EditStock: React.FC<IEditStock> = ({ editableData, onSubmit }) => {
  const [unit, setUnit] = useState<string>();

  const handleSubmit = (values: { quantity: number }) => {
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (editableData) {
      formik.setValues({
        quantity: editableData.quantity,
      });
      setUnit(editableData.unit);
    }
  }, [editableData]);

  return (
    <div className="form">
      <div className="flex-end-content">
        <div className="addProduct">
          <div>
            <div className="form-group name-input">
              {/* <label htmlFor="productName">
                <p>Name</p>
              </label>
              <select
                id="productId"
                name="productId"
                value={formik.values.productId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="">-Select Product -</option>
                {products.map((f, i) => (
                  <option value={f._id} key={f._id}>
                    {f.name}
                  </option>
                ))}
              </select>
              {formik.touched.productId && formik.errors.productId ? (
                <div className="error">{formik.errors.productId}</div>
              ) : null} */}
            </div>
            <div className="form-group input">
              <label htmlFor="quantity">
                <p>Quantity</p>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder={unit ? unit : "unit "}
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="error">{formik.errors.quantity}</div>
              ) : null}
            </div>
          </div>
          <div className="upload-image-box">
            {/* <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-input"
                  onChange={handleImageChange}
                /> */}
            {/* <label htmlFor="upload-input" className="upload-label">
              {selectedImage ? (
                <img
                  src={selectedImage as string}
                  alt="Uploaded"
                  className="uploaded-image"
                />
              ) : (
                <div className="upload">
                  <h4>Image</h4>
                </div>
              )}
            </label> */}
          </div>
        </div>

        <div className="stock-content">
          <div className="cancel-btn">
            <h5>Cancel</h5>
          </div>
          <div>
            <Button
              varient="primary"
              type="submit"
              rightIcon={<img src={ArrowRight} alt="plus" />}
              onClick={() => formik.handleSubmit()}
            >
              Add Stock
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditStock;
