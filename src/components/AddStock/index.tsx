import React from "react";
import PlusIcon from "../../assets/icons/plus.png";
import ArrowRight from "../../assets/icons/arrow-right.png";
import Button from "../../components/Button";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddStock.scss";
import StockList from "../StockList";

interface FormValues {
  productName: string;
  quantity: string;
  wholesalePrice: string;
  retailPrice: string;
}

const initialValues: FormValues = {
  productName: "",
  quantity: "",
  wholesalePrice: "",
  retailPrice: "",
};

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product Name is required"),
  quantity: Yup.string().required("Quantity is required"),
  wholesalePrice: Yup.string().required("WholesalePrice is required"),
  retailPrice: Yup.string().required("Retail Price is required"),
});

const AddProducts: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <div className="add-product-wrapper">
      <div className="add-product-content">
        <div className="head">
          <h4>Add Products</h4>
          <div>
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
                  <div className="flex-content">
                    <div className="form-group input">
                      <label htmlFor="wholesalePrice">
                        <p>Wholesale Price</p>
                      </label>
                      <Field
                        type="text"
                        id="wholesalePrice"
                        name="wholesalePrice"
                        placeholder="Rs"
                      />
                      <ErrorMessage
                        name="wholesalePrice"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group input">
                      <label htmlFor="retailPrice">
                        <p>Retail Price</p>
                      </label>
                      <Field
                        type="text"
                        id="retailPrice"
                        name="retailPrice"
                        placeholder="Rs"
                      />
                      <ErrorMessage
                        name="retailPrice"
                        component="div"
                        className="error"
                      />
                    </div>
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
