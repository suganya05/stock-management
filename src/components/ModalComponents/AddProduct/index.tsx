import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import BlackPlusIcon from "../../../assets/images/plus.svg";
import Button from "../../Button";
import "./AddProduct.scss";
import useProductStore from "../../../context/productStore";
import useStockStore from "../../../context/stockStore";
import useAuthStore from "../../../context/userStore";
import { IStockItem } from "../../../types/types";

// interface IProduct {
//   name: string;
//   quantity: string;
// }

const initialValues: IStockItem = {
  productId: "",
  quantity: 0,
};

const validationSchema = Yup.object().shape({
  productId: Yup.string().required("Product Name is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Minimum stock amount is 1"),
});

interface IAddProduct {
  onSubmit: (values: IStockItem) => void;
}

const AddProduct: React.FC<IAddProduct> = ({ onSubmit }) => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | undefined
  >();
  const [unit, setUnit] = useState<string>();
  const [avail, setAvail] = useState<number | string>();
  const [pendingStock, setPendingStock] = useState<number | string>();

  const { user } = useAuthStore();
  const { products } = useProductStore();
  const { stocks } = useStockStore();

  const handleSubmit = (values: IStockItem) => {
    console.log(values);
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const units = {
    lt: "Litre",
    ml: "Milli Litre",
    kgs: "Kilo",
    gms: "Gram",
    nos: "No(s)",
    dozens: "Dozens",
  };

  const getUnit = (unit: any) => {
    //@ts-ignore
    return units[unit] ? units[unit] : "Unit";
  };

  const handleOnProdChange = async (id: string) => {
    if (formik.values.productId !== "") {
      const prod = products.find((f) => f._id === formik.values.productId);
      if (prod) {
        setSelectedImage(prod.photoUrl);
        setUnit(getUnit(prod.unit));
      }

      // const stock = await getStockForDay(user, new Date());

      if (stocks) {
        const selectedStock = stocks.stocks?.find(
          (f) => f.productId._id === formik.values.productId
        );
        if (!selectedStock) {
          setAvail("Out of stock");
          setPendingStock("Out of stock");
        } else {
          setAvail(selectedStock?.quantity);
          setPendingStock(selectedStock?.quantity);
        }
      }
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const quantity = parseFloat(e.target.value);

    if (avail !== "Out of stock" && !isNaN(quantity)) {
      const newPendingStock = parseFloat(avail as string) - quantity;
      setPendingStock(
        newPendingStock >= 0 ? newPendingStock : "Insufficient stock"
      );
    } else {
      setPendingStock(avail);
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
                <p>Quantity</p>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder={unit ? unit : "Unit"}
                value={formik.values.quantity}
                onChange={handleQuantityChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quantity && formik.errors.quantity ? (
                <div className="error">{formik.errors.quantity}</div>
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
        {avail && (
          <div className="total-text">
            <p>
              Total avail : {avail} {avail !== "Out of stock" ? unit : null}
            </p>
          </div>
        )}
        {pendingStock !== undefined && formik.values.quantity && (
          <div className="total-text">
            <p>
              Pending stock after entry: {pendingStock}{" "}
              {pendingStock !== "Insufficient stock" &&
              pendingStock !== "Out of stock"
                ? unit
                : null}
            </p>
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

export default AddProduct;
