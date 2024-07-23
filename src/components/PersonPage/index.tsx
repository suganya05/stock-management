import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProfileImg from "../../assets/images/profile-img.jpg";
import ArrowRight from "../../assets/icons/arrow-right.png";
import PlusIcon from "../../assets/icons/plus.png";
import Layout from "../Layout";
import StockList from "../StockList";
import "./PersonPage.scss";
import Button from "../Button";

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

const PersonPage: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <Layout>
      <div className="person-page-wrapper">
        <div className="person-page-head">
          <div className="profile-img">
            <img src={ProfileImg} alt="" />
          </div>
          <div className="person">
            <h5>Person 1</h5>
          </div>
        </div>
        <div className="person-page-container">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="form-wrapper">
                <div className="part-one">
                  <h4>Add Stock</h4>
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
                  <div className="product-img-box">
                    <h4>
                      Product <br /> Image
                    </h4>
                  </div>
                  <div className="cancel-btn">
                    <h5>Cancel</h5>
                  </div>
                </div>
                <div className="part-two">
                  <Button
                    varient="secondary"
                    leftIcon={<img src={PlusIcon} alt="plus" />}
                  >
                    Use Previous Stock
                  </Button>
                  <div className="product-img-box">
                    <h4>
                      Add
                      <br />
                      CSV Stock
                    </h4>
                  </div>
                  <div className="add-stock-btn">
                    <Button
                      varient="primary"
                      type="submit"
                      rightIcon={<img src={ArrowRight} alt="plus" />}
                    >
                      Add Stock
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
          <div>
            <StockList />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PersonPage;
