import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PlusIcon from "../../../assets/icons/plus.png";
import BlackPlusIcon from "../../../assets/images/plus.svg";
import Button from "../../Button";
import "./AddSalesRepresentative.scss";
import { ISalesPerson } from "../../../types/types";
import { uploadImageToFirebase } from "../../AddStock/NewProduct/NewProduct";

const initialValues: ISalesPerson = {
  name: "",
  email: "",
  photoUrl: undefined,
  phoneNumber: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format") // Validates for a proper email format
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone Number must be 10 digits") // Ensures the phone number is exactly 10 digits
    .required("Phone Number is required"),
  photoUrl: Yup.string().optional(),
});

interface IAddSalesRepresentative {
  onSubmit: (data: ISalesPerson) => void;
  error: string | undefined;
}

const AddSalesRepresentative: React.FC<IAddSalesRepresentative> = ({
  onSubmit,
  error,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = (values: ISalesPerson) => {
    console.log(values);
    onSubmit(values);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUploading(true);
      const imgUrl = await uploadImageToFirebase(file);
      formik.setFieldValue("photoUrl", imgUrl);
      setUploading(false);
    }
  };

  return (
    <div className="add-sales-representative-wrapper">
      <div className="add-sales-representative-head">
        <h4>Add Sales Representative</h4>
      </div>
      <div className="form">
        <div className="form-wrapper">
          <div className="form-flex-item">
            <div className="form-group input">
              <label htmlFor="name">
                <p>Name</p>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={formik.values.name}
                onChange={formik.handleChange("name")}
                onBlur={formik.handleBlur("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="form-group input">
              <label htmlFor="email">
                <p>Email</p>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
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
              {uploading ? (
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
                    Photo
                  </h4>
                  <img src={PlusIcon} alt="" />
                </div>
              )}
            </label>
          </div>
        </div>
        <div className="form-group input">
          <label htmlFor="phoneNumber">
            <p>Phone Number</p>
          </label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange("phoneNumber")}
            onBlur={formik.handleBlur("phoneNumber")}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="error">{formik.errors.phoneNumber}</div>
          ) : null}
        </div>
        {error && <div className="error">{error}</div>}
        <div className="add-btn">
          <Button
            varient="primary"
            leftIcon={<img src={BlackPlusIcon} alt="plus" />}
            onClick={() => formik.handleSubmit()}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSalesRepresentative;
