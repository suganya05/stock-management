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
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProduct,
  parseAndUploadCSV,
  uploadImageToFirebase,
} from "./NewProduct";
import { AddNewProductForm, IProduct } from "../../../types/types";
import EditProductModel from "../../ModalComponents/EditProduct";

const initialValues: AddNewProductForm = {
  name: "",
  unitOfMesurment: "",
  wholesalePrice: "",
  retailPrice: "",
  imgUrl: undefined,
};

const CSVColumns = ["Product Name", "Wholesale Price", "Retail Price", "Unit"];

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  unitOfMesurment: Yup.string().required("Unit Of Mesurment is required"),
  wholesalePrice: Yup.string().required("? Price per unit"),
  retailPrice: Yup.string().required("Retail Price is required"),
  imgUrl: Yup.string().optional(),
});

const NewProducts: React.FC = () => {
  // const [selectedImage, setSelectedImage] = useState<
  //   string | ArrayBuffer | null
  // >(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [errorStatus, setErrorStatus] = useState<string>();
  const [showSampleCSV, setSampleCSV] = useState<boolean>(false);
  // const [showChanges, setShowChanges] = useState<boolean>(false);
  const [showEditor, setEditor] = useState<boolean>(false);
  const [productToEdit, setProductToEdit] = useState<IProduct>();
  const showFileRef = useRef<HTMLInputElement | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [editError, setEditError] = useState<string>();

  useEffect(() => {
    handleGetProducts(page, limit);
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleOpenToggle = () => {
    setSampleCSV(true);
  };

  const handleCloseToggle = () => {
    setSampleCSV(false);
  };

  const handleCloseChanges = () => {};

  const handleCloseEditor = () => {
    setEditor(false);
  };

  const resetProdList = async () => {
    try {
      setProducts([]);
      setPage(1);
      setHasMore(true);

      const data = await getProduct(user, 1, limit);
      if (data.length < limit) {
        setHasMore(false);
      }
      setProducts(data);
    } catch (error) {
      console.error("Error resetting product list:", error);
    }
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        // reader.onloadend = () => {
        //   setSelectedImage(reader.result);
        // };
        setIsUploading(true);
        setDisabled(true);
        const imgUrl = await uploadImageToFirebase(file);
        formik.setFieldValue("imgUrl", imgUrl);
        reader.readAsDataURL(file);
        setIsUploading(false);
        setDisabled(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateProduct = async (values: AddNewProductForm) => {
    try {
      await createProduct(user, values);
      formik.resetForm();
      resetProdList();
    } catch (error) {
      console.log(error);
      setErrorStatus("Error occurred");
    }
  };

  const handleGetProducts = async (page: number, limit: number) => {
    try {
      const data = await getProduct(user, page, limit);
      if (data.length < limit) {
        setHasMore(false);
      }
      setProducts((prevProducts) => [...prevProducts, ...data]);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductDelete = async (id: string) => {
    try {
      await deleteProduct(user, id);
      console.log("Product deleted successfully");
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const handleCSVUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await parseAndUploadCSV(user, file);
      setSampleCSV(false);
      resetProdList();
    }
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasMore
    )
      return;

    setPage((prevPage) => prevPage + 1);
  };

  const onEditPress = async (
    id: string,
    updatedProductData: AddNewProductForm
  ) => {
    try {
      await editProduct(user, id, updatedProductData);
      resetProdList();
      setEditor(false);
    } catch (error) {
      setEditError("Error occured");
      console.log("Error editing product:", error);
    }
  };

  const handleProductEdit = (id: string) => {
    const prod = products.find((product) => product._id === id);
    if (prod) {
      setProductToEdit(prod);
      setEditor(true);
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
                    id="unitOfMesurment"
                    name="unitOfMesurment"
                    value={formik.values.unitOfMesurment}
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
                  {formik.touched.unitOfMesurment &&
                  formik.errors.unitOfMesurment ? (
                    <div className="error">{formik.errors.unitOfMesurment}</div>
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
                        id="wholesalePrice"
                        name="wholesalePrice"
                        placeholder="Rs"
                        value={formik.values.wholesalePrice}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    {formik.touched.wholesalePrice &&
                    formik.errors.wholesalePrice ? (
                      <div className="error">
                        {formik.errors.wholesalePrice}
                      </div>
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
                  ) : formik.values.imgUrl ? (
                    <img
                      src={formik.values.imgUrl}
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
        {hasMore && (
          <Button
            varient="secondary"
            onClick={handleLoadMore}
            disabled={disabled}
          >
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
