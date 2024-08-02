import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ArrowRight from "../../../assets/icons/arrow-right.png";
import PlusIcon from "../../../assets/icons/plus.png";
import RupeeImg from "../../../assets/icons/Rupee.png";
import Button from "../../Button";
import PreviewChanges from "../../ModalComponents/PreviewChanges";
import LayoutModule from "../../LayoutModal";
import "./NewProduct.scss";
import AllProductList from "../../AllProductList";

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

  const handleSubmit = (values: AddNewProductForm) => {
    console.log(values);
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="new-products-form">
              <div className="new-product-form-group">
                <div>
                  <div className="name">
                    <label htmlFor="name">
                      <p>Name</p>
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Product name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="unitOfMesurment">
                    <label htmlFor="unitOfMesurment">
                      <p>Unit Of Mesurment</p>
                    </label>
                    <Field
                      as="select"
                      id="unitOfMesurment"
                      name="unitOfMesurment"
                    >
                      <option value="">Litre</option>
                      <option value="product1">Product 1</option>
                      <option value="product2">Product 2</option>
                      <option value="product3">Product 3</option>
                    </Field>
                    <ErrorMessage
                      name="unitOfMesurment"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="flex-input">
                    <div className="Wholesale-input">
                      <label htmlFor="wholesalePrice">
                        <p>Wholesale Price</p>
                      </label>
                      <div className="rupee-input">
                        <img src={RupeeImg} alt="" />
                        <Field
                          type="text"
                          id="wholesalePrice"
                          name="wholesalePrice"
                          placeholder="Rs"
                        />
                      </div>
                      <ErrorMessage
                        name="wholesalePrice"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="Wholesale-input">
                      <label htmlFor="retailPrice">
                        <p>Retail Price</p>
                      </label>
                      <div className="rupee-input">
                        <img src={RupeeImg} alt="" />
                        <Field
                          type="text"
                          id="retailPrice"
                          name="retailPrice"
                          placeholder="Rs"
                        />
                      </div>
                      <ErrorMessage
                        name="retailPrice"
                        component="div"
                        className="error"
                      />
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
            </Form>
          )}
        </Formik>
      </div>
      <AllProductList />
    </div>
  );
};

export default NewProducts;
