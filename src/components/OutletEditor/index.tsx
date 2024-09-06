import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import PlusIcon from "../../assets/icons/plus.png";
import BlackPlusIcon from "../../assets/images/plus.svg";
import "./OuletEditor.scss";
import Button from "../Button";
import { IOutlet } from "../../types/types";
import { uploadImageToFirebase } from "../AddStock/NewProduct/NewProduct";

const validationSchema = Yup.object().shape({
  outletName: Yup.string().required("Name is required"),
  ownerName: Yup.string().required("Owner is required"),
  address: Yup.string().required("Address is required"),
  email: Yup.string().required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  photoUrl: Yup.string().optional(),
});

interface IOutletEditor {
  onSubmit: (data: IOutlet) => void;
  selectedId: string;
  data: IOutlet[];
  error?: string | undefined;
}

const OutletEditor: React.FC<IOutletEditor> = ({
  onSubmit,
  error,
  selectedId,
  data,
}) => {
  const [isBtnDisabled, setBtnDisabled] = useState(false);
  const [outlet, setOutlet] = useState<IOutlet>();

  useEffect(() => {
    if (data) {
      const filteredOutlet = data.find((d) => d._id == selectedId);
      setOutlet(filteredOutlet);
      console.log("i am ");
      formik.setValues({
        outletName: filteredOutlet ? filteredOutlet.outletName : "",
        ownerName: filteredOutlet ? filteredOutlet.ownerName : "",
        address: filteredOutlet ? filteredOutlet.address : "",
        email: filteredOutlet ? filteredOutlet.email : "",
        phoneNumber: filteredOutlet ? filteredOutlet.phoneNumber : "",
        photoUrl: filteredOutlet ? filteredOutlet.photoUrl : undefined,
      });
    }
    console.log("i am running");
  }, [selectedId]);

  const handleSubmit = (values: IOutlet) => {
    console.log(values);
    onSubmit(values);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      setBtnDisabled(true);
      const imgUrl = await uploadImageToFirebase(file);
      formik.setFieldValue("photoUrl", imgUrl);
      setBtnDisabled(false);
    }
  };

  const initialValues: IOutlet = {
    outletName: outlet ? outlet.outletName : "",
    ownerName: outlet ? outlet.ownerName : "",
    address: outlet ? outlet.address : "",
    email: outlet ? outlet.email : "",
    phoneNumber: outlet ? outlet.phoneNumber : "",
    photoUrl: outlet ? outlet.photoUrl : undefined,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <div className="add-outlet-modal-wrapper">
      <div className="add-outlet-modal-heading">
        <h4>Edit Outlet</h4>
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
                value={formik.values.outletName}
                onChange={formik.handleChange("outletName")}
                onBlur={formik.handleBlur("outletName")}
              />
              {formik.touched.outletName && formik.errors.outletName ? (
                <div className="error">{formik.errors.outletName}</div>
              ) : null}
            </div>
            <div className="form-group input">
              <label htmlFor="address">
                <p>Address</p>
              </label>
              <textarea
                rows={4}
                id="address"
                name="address"
                placeholder="Address"
                value={formik.values.address}
                onChange={formik.handleChange("address")}
                onBlur={formik.handleBlur("addess")}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="error">{formik.errors.address}</div>
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
              {formik.values.photoUrl ? (
                <img
                  src={formik.values.photoUrl as string}
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
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              placeholder="Owner Name"
              value={formik.values.ownerName}
              onChange={formik.handleChange("ownerName")}
              onBlur={formik.handleBlur("ownerName")}
            />
            {formik.touched.ownerName && formik.errors.ownerName ? (
              <div className="error">{formik.errors.ownerName}</div>
            ) : null}
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
        {error && <div className="error">{error}</div>}
        <div className="add-btn">
          <Button
            varient="primary"
            leftIcon={<img src={BlackPlusIcon} alt="plus" />}
            disabled={isBtnDisabled}
            onClick={() => formik.handleSubmit()}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OutletEditor;
