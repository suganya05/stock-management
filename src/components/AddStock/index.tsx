import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PlusIcon from "../../assets/icons/plus.png";
import BlackPlusIcon from "../../assets/images/plus.svg";
import ArrowRight from "../../assets/icons/arrow-right.png";
import Button from "../../components/Button";
import StockList from "../StockList";
import LayoutModule from "../LayoutModal";
import PreviewChanges from "../ModalComponents/PreviewChanges";
import "./AddStock.scss";

interface FormValues {
  productName: string;
  quantity: string;
}

const initialValues: FormValues = {
  productName: "",
  quantity: "",
};

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  quantity: Yup.string().required("Quantity is required"),
});

const AddProducts: React.FC = () => {
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

  const handleSubmit = (values: FormValues) => {
    console.log(values);
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

  const loadProducts = async () => {};

  return (
    <div className="add-product-wrapper">
      <div className="add-product-content">
        <div className="head">
          <h4>Re-Stock inventory</h4>
          <div className="btns">
            <Button
              varient="primary"
              leftIcon={<img src={BlackPlusIcon} alt="plus" />}
              onClick={handleOpenToggle}
            >
              Upload csv
            </Button>
            {active && (
              <LayoutModule
                handleToggle={handleCloseToggle}
                className="layout-module"
              >
                <PreviewChanges />
              </LayoutModule>
            )}
            <Button
              varient="secondary"
              leftIcon={<img src={PlusIcon} alt="plus" />}
            >
              Use Existing Stock
            </Button>
          </div>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="form">
              <div className="flex-end-content">
                <div className="addProduct">
                  <div>
                    <div className="form-group name-input">
                      <label htmlFor="productName">
                        <p>Name</p>
                      </label>
                      <Field as="select" id="productName" name="productName">
                        <option value="">-Select Product -</option>
                        <option value="product1">Product 1</option>
                        <option value="product2">Product 2</option>
                        <option value="product3">Product 3</option>
                      </Field>
                      <ErrorMessage
                        name="productName"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group input">
                      <label htmlFor="quantity">
                        <p>Quantity</p>
                      </label>
                      <Field
                        type="text"
                        id="quantity"
                        name="quantity"
                        placeholder="Litre"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="error"
                      />
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
                    >
                      Add Stock
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <StockList />
    </div>
  );
};

export default AddProducts;
