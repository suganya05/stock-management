import React, { useState } from "react";
import PlusIcon from "../../../assets/icons/plus.png";
import ArrowRight from "../../../assets/icons/arrow-right.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../Button";
import StockList from "../../StockList";
import "./OutletList.scss";

interface FormValues {
  name: string;
  address: string;
  ownerName: string;
  retailPrice: string;
}

const initialValues: FormValues = {
  name: "",
  address: "",
  ownerName: "",
  retailPrice: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  ownerName: Yup.string().required("Owner Name is required"),
  retailPrice: Yup.string().required("Retail Price is required"),
});

const OutletList: React.FC = () => {
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
    <div className="outlet-list-wrapper">
      <div className="outlet-list-content">
        <div className="head">
          <h4>Add Outlet</h4>
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
                <div className="addProduct">
                  <div>
                    <div className="form-group name-input">
                      <label htmlFor="name">
                        <p>Name</p>
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group address">
                      <label htmlFor="address">
                        <p>Address</p>
                      </label>
                      <Field
                        as="textarea"
                        id="address"
                        name="address"
                        placeholder="Address"
                        rows={3}
                        cols={38}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="form-group owner-name">
                      <label htmlFor="ownerName">
                        <p>Owner name</p>
                      </label>
                      <Field
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        placeholder="Owner name"
                      />
                      <ErrorMessage
                        name="ownerName"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="flex-content">
                      <div className="form-group retail-price">
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
                      <div className="upload-box">
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
                                Logo
                              </h4>
                              <img src={PlusIcon} alt="Plus Icon" />
                            </div>
                          )}
                        </label>
                      </div>
                      {/* <div className="form-group input">
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
                      </div> */}
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
                            CSV
                          </h4>
                          <img src={PlusIcon} alt="Plus Icon" />
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

export default OutletList;
