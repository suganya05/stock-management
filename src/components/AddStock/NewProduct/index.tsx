import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import ArrowRight from "../../../assets/icons/arrow-right.png";
import PlusIcon from "../../../assets/icons/plus.png";
import RupeeImg from "../../../assets/icons/Rupee.png";
import Button from "../../Button";
import PreviewChanges from "../../ModalComponents/PreviewChanges";
import LayoutModule from "../../LayoutModal";
import "./NewProduct.scss";
import AllProductList from "../../AllProductList";
import { backend_url } from "../../../constants/backend";
import axios from "axios";
import useAuthStore from "../../../context/userStore";

interface AddNewProductForm {
  name: string;
  unitOfMesurment: string;
  wholesalePrice: string;
  retailPrice: string;
}

const initialValues: AddNewProductForm = {
  name: "",
  unitOfMesurment: "",
  wholesalePrice: "",
  retailPrice: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  unitOfMesurment: Yup.string().required("Unit Of Mesurment is required"),
  wholesalePrice: Yup.string().required("? Price per unit"),
  retailPrice: Yup.string().required("Retail Price is required"),
});

const NewProducts: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [active, setIsActive] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [errorStatus, setErrorStatus] = useState<string>();

  useEffect(() => {
    getProducts(page, limit);
  }, [page]);

  const handleOpenToggle = () => {
    setIsActive(true);
  };

  const handleCloseToggle = () => {
    setIsActive(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (values: AddNewProductForm) => {
    try {
      const url = `${backend_url}admin/products`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };
      const ProductData = {
        name: values.name,
        unit: values.unitOfMesurment,
        actualPrice: parseInt(values.wholesalePrice),
        retailPrice: parseInt(values.retailPrice),
      };
      const res = await axios.post(url, ProductData, { headers });

      if (res.status === 201) {
        console.log("Successfully created product");
        formik.setValues({
          name: "",
          unitOfMesurment: "",
          wholesalePrice: "",
          retailPrice: "",
        });

        setProducts([]);
        setPage(1);
        setHasMore(true);
      } else {
        console.log("Error occurred while creating the product");
      }
    } catch (error) {
      console.log(error);
      setErrorStatus("Error occurred");
    }
  };

  let callCount = 0;
  const getProducts = async (page: number, limit: number) => {
    callCount++;
    console.log(`getProducts called ${callCount} time(s)`);
    try {
      const url = `${backend_url}admin/products/${page}/${limit}`;
      const idToken = await user?.getIdToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      };
      const response = await axios.get(url, { headers });
      console.log(response.data);

      if (response.data.length < limit) {
        setHasMore(false);
      }

      setProducts((prevProducts) => [...prevProducts, ...response.data]);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleProductDelete = async (id: string) => {
    try {
      const url = `${backend_url}admin/products/${id}`;
      const idToken = await user?.getIdToken();
      const headers = {
        Authorization: `Bearer ${idToken}`,
      };

      const response = await axios.delete(url, { headers });

      if (response.status === 200) {
        console.log("Product deleted successfully");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
      } else {
        console.error("Error occurred while deleting the product");
      }
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };
  const editProduct = async (
    id: string,
    updatedProductData: AddNewProductForm
  ) => {
    try {
      const url = `${backend_url}admin/products/${id}`;
      const idToken = await user?.getIdToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      };

      const ProductData = {
        name: updatedProductData.name,
        unit: updatedProductData.unitOfMesurment,
        actualPrice: parseInt(updatedProductData.wholesalePrice),
        retailPrice: parseInt(updatedProductData.retailPrice),
      };

      const response = await axios.put(url, ProductData, { headers });

      if (response.status === 200) {
        console.log("Product edited successfully");
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === id ? { ...product, ...ProductData } : product
          )
        );
      } else {
        console.error("Error occurred while editing the product");
      }
    } catch (error) {
      console.log("Error editing product:", error);
    }
  };

  const handleProductEdit = (id: string) => {
    const productToEdit = products.find((product) => product._id === id);
    // if (productToEdit) {
    //   formik.setValues({
    //     name: productToEdit.name,
    //     unitOfMesurment: productToEdit.unit,
    //     wholesalePrice: productToEdit.actualPrice,
    //     retailPrice: productToEdit.retailPrice,
    //   });
    // }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleAddProduct,
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
          {active && (
            <LayoutModule
              handleToggle={handleCloseToggle}
              className="layout-module"
            >
              <PreviewChanges />
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
                  {selectedImage ? (
                    <img
                      src={selectedImage as string}
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
          <Button varient="secondary" onClick={handleLoadMore}>
            Load More
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
