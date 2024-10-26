import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import BlackPlusIcon from "../../../assets/images/plus.svg";
import Button from "../../Button";
import useProductStore from "../../../context/productStore";
import useStockStore from "../../../context/stockStore";
import useAuthStore from "../../../context/userStore";
import { IStockItem } from "../../../types/types";
import { addCustomPricing } from "../../../helpers/customPricing";

// interface IProduct {
//   name: string;
//   quantity: string;
// }

const initialValues = {
  productId: "",
  price: 0,
};

const validationSchema = Yup.object().shape({
  productId: Yup.string().required("Product Name is required"),
  price: Yup.number()
    .required("Quantity is required")
    .min(1, "Minimum stock amount is 1"),
});

interface IAddProduct {
  selectedId: string;
  onSubmit: (values: IStockItem) => void;
}

const AddCustomProduct: React.FC<IAddProduct> = ({ selectedId, onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | undefined
  >();
  const [unit, setUnit] = useState<string>();
  const { user } = useAuthStore();
  const { products } = useProductStore();
  const [pricing, setPricing] = useState<{
    wholeSale: number | undefined;
    retail: number | undefined;
  }>();

  const handleSubmit = async (values: any) => {
    console.log(values);
    if (selectedId) {
      await addCustomPricing(user, selectedId, values.productId, values.price);
    }
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleOnProdChange = async (id: string) => {
    if (formik.values.productId !== "") {
      const prod = products.find((f) => f._id === formik.values.productId);
      if (prod) {
        setSelectedImage(prod.photoUrl);
      }
      if (prod) {
        setPricing({
          wholeSale: prod.actualPrice,
          retail: prod.retailPrice,
        });
      }
    }
  };

  useEffect(() => {
    handleOnProdChange(formik.values.productId);
  }, [formik.values.productId]);

  return (
    <div className="add-product-container">
      <div className="add-product-head">
        <h4>Add Product</h4>
      </div>
      <div className="form-container">
        <div className="form">
          <div className="form-wrapper">
            <div className="form-group name-input">
              <label htmlFor="name">
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
                {products.map((f) => (
                  <option value={f._id} key={f._id}>
                    {f.name}
                  </option>
                ))}
              </select>
              {formik.touched.productId && formik.errors.productId ? (
                <div className="error">{formik.errors.productId}</div>
              ) : null}
            </div>
            <div className="form-group input">
              <label htmlFor="quantity">
                <p>New Price</p>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder={unit ? unit : "Unit"}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.price && formik.errors.price ? (
                <div className="error">{formik.errors.price}</div>
              ) : null}
            </div>
          </div>
          <div className="upload-image-box">
            <label htmlFor="upload-input" className="upload-label">
              {selectedImage ? (
                <img
                  src={selectedImage as string}
                  alt="Product Img"
                  className="uploaded-image"
                />
              ) : (
                <div className="upload">
                  <h4>
                    Product <br />
                    Image
                  </h4>
                </div>
              )}
            </label>
          </div>
        </div>
        {pricing && (
          <div className="total-text">
            <p>Wholesale price : {pricing?.wholeSale}</p>
          </div>
        )}
        {pricing && (
          <div className="total-text">
            <p>Retail Price : {pricing?.retail}</p>
          </div>
        )}
        <div className="add-btn">
          <Button
            varient="primary"
            leftIcon={<img src={BlackPlusIcon} alt="plus" />}
            onClick={() => formik.handleSubmit()}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomProduct;
