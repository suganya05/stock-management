import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PlusIcon from "../../assets/icons/plus.png";
import BlackPlusIcon from "../../assets/images/plus.svg";
import ArrowRight from "../../assets/icons/arrow-right.png";
import Button from "../../components/Button";
import StockList from "../StockList";
import LayoutModule from "../LayoutModal";
import "./AddStock.scss";
import useStockStore from "../../context/stockStore";
import useAuthStore from "../../context/userStore";
import { IStatus, IStockItem } from "../../types/types";
import useProductStore from "../../context/productStore";
import SampleCsv from "../ModalComponents/SampleCSV";
import { toast } from "react-toastify";
import { TostPromiseOption } from "../../constants/Toast";
import { Exception } from "sass";

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
  const user = useAuthStore((state) => state.user);
  const { addStock, removeStock, updateStock, uploadCSV, fetchStocks } =
    useStockStore();
  const { products } = useProductStore();
  const [unit, setUnit] = useState<string>();
  const [showSampleCsv, setShowSampleCsv] = useState(false);
  const showFileRef = useRef<HTMLInputElement | null>(null);
  const [sampleData, setSampleData] = useState<any[]>([]);

  const handleSampleCsvOpen = () => {
    fetchSampleData();
    setShowSampleCsv(true);
  };
  const handleSampleCsvClose = () => {
    setShowSampleCsv(false);
    setSampleData([]);
  };

  const handleSubmit = (values: IStockItem) => {
    toast.promise(
      async () => {
        const result = await addStock(user, values);
        if (result.type !== "sucess") {
          throw new Error(
            JSON.stringify({ type: result.type, data: result.data } as IStatus)
          );
        }
        setSelectedImage(undefined);
        formik.resetForm();
        return { type: result.type, data: result.data } as IStatus;
      },
      {
        pending: "Creating stock",
        success: {
          render({ data }) {
            return `${data.data}`;
          },
        },
        error: {
          render({ data }) {
            let errorMessage = "An unknown error occurred";
            try {
              //@ts-ignore
              const parsedError = JSON.parse(data.message); // Extract the JSON object
              errorMessage =
                parsedError.data || parsedError.type || errorMessage;
            } catch (parseError) {
              console.error("Error parsing error message:", parseError);
            }
            return `${errorMessage}`;
          },
        },
      }
    );
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

  const handleDelete = async (id: string) => {
    const res = await removeStock(user, id);
    if (res.type !== "sucess") {
      toast(res.data, TostPromiseOption);
    }
  };

  const handleEdit = async (updatedStock: IStockItem) => {
    const result = await updateStock(user, updatedStock);
    if (result.type !== "sucess") {
      toast(result.data, TostPromiseOption);
    }
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

  useEffect(() => {
    fetchStocks(user);
  }, []);

  const fetchSampleData = async () => {
    const samplePrd = [];
    for (const product of products) {
      samplePrd.push({
        "Product ID": product._id,
        "Product Name": product.name,
        Quantity: 0,
      });
    }
    setSampleData(samplePrd);
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
              <div className="cancel-btn"></div>
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
      <StockList onDelete={handleDelete} onEdit={(data) => handleEdit(data)} />
      {showSampleCsv && (
        <LayoutModule handleToggle={handleSampleCsvClose}>
          <SampleCsv
            columns={AddStockColumn}
            onPickFile={() => {
              if (showFileRef.current) {
                showFileRef.current.click();
              }
            }}
            onSampleDownload={sampleData}
            sampleFileName="Stock"
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
