import React, { useEffect, useRef, useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormik,
  FastField,
} from "formik";
import * as Yup from "yup";
import ArrowRight from "../../../assets/icons/arrow-right.png";
import PlusIcon from "../../../assets/icons/plus.png";
import RupeeImg from "../../../assets/icons/Rupee.png";
import Button from "../../Button";
import PreviewChanges from "../../ModalComponents/PreviewChanges";
import LayoutModule from "../../LayoutModal";
import "./NewProduct.scss";
import AllProductList from "../../AllProductList";
import useAuthStore from "../../../context/userStore";
import SampleCsv from "../../ModalComponents/SampleCSV";
import { IProduct } from "../../../types/types";
import EditProductModel from "../../ModalComponents/EditProduct";
import useProductStore from "../../../context/productStore";
import { uploadImageToFirebase } from "../../../helpers/firebase";

const initialValues: Partial<IProduct> = {
  name: "",
  unit: "",
  actualPrice: 0,
  retailPrice: 0,
  photoUrl: undefined,
};

const CSVColumns = ["Product Name", "Wholesale Price", "Retail Price", "Unit"];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  unit: Yup.string().required("Unit Of Mesurment is required"),
  actualPrice: Yup.number().required("? Price per unit").min(1),
  retailPrice: Yup.number().required("Retail Price is required").min(1),
  photoUrl: Yup.string().optional(),
});

const NewProducts: React.FC = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const user = useAuthStore((state) => state.user);
  const [errorStatus, setErrorStatus] = useState<string>();
  const [showSampleCSV, setSampleCSV] = useState<boolean>(false);
  const [showEditor, setEditor] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<Partial<IProduct>>();
  const showFileRef = useRef<HTMLInputElement | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [editError, setEditError] = useState<string>();
  const { products, updateProduct, removeProduct, addProduct, uploadCSV } =
    useProductStore();

  const handleOpenToggle = () => {
    setSampleCSV(true);
  };

  const handleCloseToggle = () => {
    setSampleCSV(false);
  };

  const handleCloseEditor = () => {
    setEditor(false);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        setIsUploading(true);
        setDisabled(true);
        const imgUrl = await uploadImageToFirebase(file);
        formik.setFieldValue("photoUrl", imgUrl);
        reader.readAsDataURL(file);
        setIsUploading(false);
        setDisabled(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (values: Partial<IProduct>) => {
    try {
      addProduct(user, values);
      formik.setValues(initialValues);
    } catch (error) {
      // handle error
    }
  };

  const handleProductDelete = async (id: string | undefined) => {
    try {
      if (id) {
        removeProduct(user, id);
      } else {
        console.log("id not found");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onEditPress = async (id: string, updatedProductData: IProduct) => {
    try {
      console.log("asda", id, updatedProductData);
      updateProduct(user, id, updatedProductData);
      setEditor(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleProductEdit = (id: string | undefined) => {
    const prod = products.find((product) => product._id === id);
    setProductToEdit(prod);
    setEditor(true);
  };

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadCSV(user, file);
      setSampleCSV(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleCreateProduct,
  });
  return (
    <div className="new-products-wrapper">
      <div className="new-products-content">
        <div className="head">
          <h4>Add New Products</h4>
          <Button
            varient="secondary"
            leftIcon={<img src={PlusIcon} alt="plus" />}
            onClick={handleOpenToggle}
          >
            Upload CSV
          </Button>
          {showSampleCSV && (
            <LayoutModule
              handleToggle={handleCloseToggle}
              className="layout-module"
            >
              <SampleCsv
                onPickFile={() => {
                  if (showFileRef.current) {
                    showFileRef.current.click();
                  }
                }}
                columns={CSVColumns}
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
          {/* {showChanges && (
            <LayoutModule
              handleToggle={handleCloseChanges}
              className="layout-module"
            >
              <PreviewChanges />
            </LayoutModule>
          )} */}
          {showEditor && (
            <LayoutModule
              handleToggle={handleCloseEditor}
              className="layout-module"
            >
              <EditProductModel
                errorStatus={editError}
                productData={productToEdit}
                onSubmit={(id, updatedProds) => onEditPress(id, updatedProds)}
              />
            </LayoutModule>
          )}
        </div>
        <div>
          <form className="new-products-form">
            <div className="new-product-form-group">
              <div>
                <div className="name">
                  <label htmlFor="name">
                    <p>Name</p>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Product name"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="error">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="unitOfMesurment">
                  <label htmlFor="unitOfMesurment">
                    <p>Unit Of Mesurment</p>
                  </label>
                  <select
                    id="unit"
                    name="unit"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Measurements</option>
                    <option value="lt">Litre</option>
                    <option value="ml">Milli Litre</option>
                    <option value="kgs">Kilogram</option>
                    <option value="gms">Grams</option>
                    <option value="nos">No(s)</option>
                    <option value="dozens">Dozens</option>
                  </select>
                  {formik.touched.unit && formik.errors.unit ? (
                    <div className="error">{formik.errors.unit}</div>
                  ) : null}
                </div>
                <div className="flex-input">
                  <div className="Wholesale-input">
                    <label htmlFor="wholesalePrice">
                      <p>Wholesale Price</p>
                    </label>
                    <div className="rupee-input">
                      <img src={RupeeImg} alt="" />
                      <input
                        type="text"
                        id="actualPrice"
                        name="actualPrice"
                        placeholder="Rs"
                        value={formik.values.actualPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.actualPrice && formik.errors.actualPrice ? (
                      <div className="error">{formik.errors.actualPrice}</div>
                    ) : null}
                  </div>
                  <div className="Wholesale-input">
                    <label htmlFor="retailPrice">
                      <p>Retail Price</p>
                    </label>
                    <div className="rupee-input">
                      <img src={RupeeImg} alt="" />
                      <input
                        type="text"
                        id="retailPrice"
                        name="retailPrice"
                        placeholder="Rs"
                        value={formik.values.retailPrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.retailPrice && formik.errors.retailPrice ? (
                      <div className="error">{formik.errors.retailPrice}</div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="upload-image-box">
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-input"
                  onChange={handleImageChange}
                />
                <label htmlFor="upload-input" className="upload-label">
                  {isUploading ? (
                    <div className="upload">
                      <h4>
                        Uploading <br />
                        Please wait
                      </h4>
                    </div>
                  ) : formik.values.photoUrl ? (
                    <img
                      src={formik.values.photoUrl}
                      alt="Uploaded"
                      className="uploaded-image"
                    />
                  ) : (
                    <div className="upload">
                      <h4>
                        Upload <br />
                        Image
                      </h4>
                      <img src={PlusIcon} alt="Plus Icon" />
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="error">{errorStatus}</div>
            <div className="product-content">
              <div className="cancel-btn">
                <h5>Cancel</h5>
              </div>
              <div className="add-product-btn">
                <Button
                  varient="primary"
                  type="submit"
                  rightIcon={<img src={ArrowRight} alt="plus" />}
                  onClick={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                  }}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="right-container">
        <AllProductList
          prodList={products}
          onDelete={handleProductDelete}
          onEdit={handleProductEdit}
        />
      </div>
    </div>
  );
};

export default NewProducts;
