import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { AddNewProductForm, IProduct } from "../../../types/types";
import { useFormik } from "formik";
import * as Yup from "yup";
import RupeeImg from "../../../assets/icons/Rupee.png";
import PlusIcon from "../../../assets/icons/plus.png";
import Button from "../../Button";
import ArrowRight from "../../../assets/icons/arrow-right.png";
import { User } from "firebase/auth";
import { uploadImageToFirebase } from "../../../helpers/firebase";

interface IEditModel {
  productData?: Partial<IProduct>;
  onSubmit: (id: string, updatedProduct: IProduct) => void;
  errorStatus: string | undefined;
}

const EditProductModel: React.FC<IEditModel> = ({
  productData,
  onSubmit,
  errorStatus,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productData)
      formik.setValues({
        name: productData.name,
        unit: productData.unit,
        actualPrice: productData.actualPrice,
        retailPrice: productData.retailPrice,
        photoUrl: productData.photoUrl,
      });
  }, [productData]);

  const initialValues: Partial<IProduct> = {
    name: "",
    unit: "",
    actualPrice: 0,
    retailPrice: 0,
    photoUrl: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    unit: Yup.string().required("Unit Of Mesurment is required"),
    actualPrice: Yup.string().required("? Price per unit"),
    retailPrice: Yup.string().required("Retail Price is required"),
    imgUrl: Yup.string().optional(),
  });

  const handleSubmit = (values: any) => {
    if (productData && productData._id) onSubmit(productData._id, values);
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
      const reader = new FileReader();
      setIsUploading(true);
      const imgUrl = await uploadImageToFirebase(file);
      formik.setFieldValue("photoUrl", imgUrl);
      reader.readAsDataURL(file);
      setIsUploading(false);
    }
  };

  return (
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
                id="unit"
                name="unit"
                value={formik.values.unit}
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
              {formik.touched.unit && formik.errors.unit ? (
                <div className="error">{formik.errors.unit}</div>
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
                    id="actualPrice"
                    name="actualPrice"
                    placeholder="Rs"
                    value={formik.values.actualPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.actualPrice && formik.errors.actualPrice ? (
                  <div className="error">{formik.errors.actualPrice}</div>
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
              {isUploading ? (
                <div className="upload">
                  <h4>
                    Uploding <br />
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
              onClick={(e) => {
                e.preventDefault();
                formik.handleSubmit();
              }}
            >
              Update product
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProductModel;
