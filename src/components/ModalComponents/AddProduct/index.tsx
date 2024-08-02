import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import BlackPlusIcon from "../../../assets/images/plus.svg";
import Button from "../../Button";
import "./AddProduct.scss";

interface FormValues {
  name: string;
  quantity: string;
}

const initialValues: FormValues = {
  name: "",
  quantity: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product Name is required"),
  quantity: Yup.string().required("Quantity is required"),
});

const AddProduct: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
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
  return (
    <div className="add-product-container">
      <div className="add-product-head">
        <h4>Add Product</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="form-container">
            <div className="form">
              <div className="form-wrapper">
                <div className="form-group name-input">
                  <label htmlFor="name">
                    <p>Name</p>
                  </label>
                  <Field as="select" id="name" name="name">
                    <option value="">-Select Product -</option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                    <option value="product3">Product 3</option>
                  </Field>
                  <ErrorMessage name="name" component="div" className="error" />
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
                      <h4>
                        Product <br />
                        Image
                      </h4>
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="total-text">
              <p>Total avail : 86 litre</p>
            </div>
            <div className="add-btn">
              <Button
                varient="primary"
                leftIcon={<img src={BlackPlusIcon} alt="plus" />}
              >
                Add
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddProduct;
