import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PlusIcon from "../../assets/icons/plus.png";
import BlackPlusIcon from "../../assets/images/plus.svg";
import ArrowRight from "../../assets/icons/arrow-right.png";
import Button from "../../components/Button";
import StockList from "../StockList";
import LayoutModule from "../LayoutModal";
import PreviewChanges from "../ModalComponents/PreviewChanges";
import "./AddStock.scss";
import useStockStore from "../../context/stockStore";
import useAuthStore from "../../context/userStore";
import { IStockItem } from "../../types/types";
import useProductStore from "../../context/productStore";
import EditStock from "../ModalComponents/EditStock";
import SampleCsv from "../ModalComponents/SampleCSV";

// interface FormValues {
//   productId: string;
//   quantity: string;
// }
const AddStockColumn = ["Product ID", "Quantity"];
const initialValues: IStockItem = {
  productId: "",
  quantity: 0,
};

const validationSchema = Yup.object().shape({
  productId: Yup.string().required("Product Name is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity should be minimum 1"),
});

const AddProducts: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | undefined
  >(undefined);
  // const [date, setDate] = useState(new Date());
  const user = useAuthStore((state) => state.user);
  const {
    addStock,
    removeStock,
    updateStock,
    date,
    setDate,
    uploadCSV,
    existingStock,
  } = useStockStore();
  const { products } = useProductStore();
  const [unit, setUnit] = useState<string>();
  const [showSampleCsv, setShowSampleCsv] = useState(false);
  const showFileRef = useRef<HTMLInputElement | null>(null);

  const handleSampleCsvOpen = () => {
    setShowSampleCsv(true);
  };
  const handleSampleCsvClose = () => {
    setShowSampleCsv(false);
  };

  const handleSubmit = (values: IStockItem) => {
    console.log(values);
    addStock(user, values);
    formik.resetForm();
    setSelectedImage(undefined);
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

  useEffect(() => {
    if (formik.values.productId) {
      const selectedProduct = products.find(
        (f) => f._id === formik.values.productId
      );
      const photoUrl = selectedProduct?.photoUrl;
      const unit = selectedProduct?.unit as
        | "lt"
        | "ml"
        | "kgs"
        | "gms"
        | "nos"
        | "dozens";
      if (unit) {
        setUnit(units[unit]);
      }
      setSelectedImage(photoUrl);
    }
  }, [formik.values.productId]);

  const fetchData = async () => {
    console.log("fetching");
  };

  const handleDelete = async (id: string) => {
    removeStock(user, id);
  };

  const handleEdit = (updatedStock: IStockItem) => {
    updateStock(user, updatedStock);
  };

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadCSV(user, file);
      setShowSampleCsv(false);
    }
  };

  const handleExistingStock = async () => {
    existingStock(user);
  };
  return (
    <div className="add-product-wrapper">
      <div className="add-product-content">
        <div className="head">
          <h4>Re-Stock inventory</h4>
          <div className="btns">
            <Button
              varient="primary"
              leftIcon={<img src={BlackPlusIcon} alt="plus" />}
              onClick={handleSampleCsvOpen}
            >
              Upload csv
            </Button>
            {/* {active && (
              <LayoutModule
                handleToggle={handleCloseToggle}
                className="layout-module"
              >
                <PreviewChanges />
              </LayoutModule>
            )} */}
            {date && date.toDateString() === new Date().toDateString() && (
              <Button
                varient="secondary"
                leftIcon={<img src={PlusIcon} alt="plus" />}
                onClick={handleExistingStock}
              >
                Use Existing Stock
              </Button>
            )}
          </div>
        </div>
        <div className="form">
          <div className="flex-end-content">
            <div className="addProduct">
              <div>
                <div className="form-group name-input">
                  <label htmlFor="productName">
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
                <label htmlFor="upload-input" className="upload-label">
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
                </label>
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
      </div>
      <StockList
        date={date}
        onChange={(date) => setDate(user, date)}
        onDelete={handleDelete}
        // onEdit={(id, updatedStock) => handleEdit(id, updatedStock)}
        onEdit={(data) => handleEdit(data)}
      />
      {showSampleCsv && (
        <LayoutModule handleToggle={handleSampleCsvClose}>
          <SampleCsv
            columns={AddStockColumn}
            onPickFile={() => {
              if (showFileRef.current) {
                showFileRef.current.click();
              }
            }}
          />
          <input
            type="file"
            ref={showFileRef}
            style={{ display: "none" }}
            onChange={handleCSVUpload}
            accept=".csv"
          />
        </LayoutModule>
      )}
    </div>
  );
};

export default AddProducts;
