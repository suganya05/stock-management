import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PlusIcon from "../../../assets/icons/plus.png";
import BlackPlusIcon from "../../../assets/images/plus.svg";
import "./AddOutletModal.scss";
import Button from "../../Button";

interface FormValues {
  name: string;
  address: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
}
const initialValues: FormValues = {
  name: "",
  address: "",
  ownerName: "",
  phoneNumber: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  ownerName: Yup.string().required("Owner is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().required("Email is required"),
});

const AddOutletModal: React.FC = () => {
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
    <div className="add-outlet-modal-wrapper">
      <div className="add-outlet-modal-heading">
        <h4>Add Outlet</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="form">
            <div className="form-wrapper">
              <div className="form-flex-item">
                <div className="form-group input">
                  <label htmlFor="name">
                    <p>Name</p>
                  </label>
                  <Field type="text" id="name" name="name" placeholder="Name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="form-group input">
                  <label htmlFor="address">
                    <p>Address</p>
                  </label>
                  <Field
                    as="textarea"
                    rows={4}
                    type="address"
                    id="address"
                    name="address"
                    placeholder="Address"
                  />
                  <ErrorMessage
                    name="address"
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
                        Upload <br />
                        Logo
                      </h4>
                      <img src={PlusIcon} alt="" />
                    </div>
                  )}
                </label>
              </div>
            </div>
            <div className="flex-input">
              <div className="form-group input">
                <label htmlFor="ownerName">
                  <p>Owner Name</p>
                </label>
                <Field
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  placeholder="Owner Name"
                />
                <ErrorMessage
                  name="ownerName"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-group input">
                <label htmlFor="phoneNumber">
                  <p>Phone Number</p>
                </label>
                <Field
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error"
                />
              </div>
            </div>
            <div className="form-group input">
              <label htmlFor="email">
                <p>Email</p>
              </label>
              <Field type="email" id="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
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

export default AddOutletModal;
