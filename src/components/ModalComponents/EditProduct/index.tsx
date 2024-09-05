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
import {
  editProduct,
  uploadImageToFirebase,
} from "../../AddStock/NewProduct/NewProduct";
import { User } from "firebase/auth";

interface IEditModel {
  productData?: IProduct;
  onSubmit: (id: string, updatedProduct: AddNewProductForm) => void;
  errorStatus: string | undefined;
}

const EditProductModel: React.FC<IEditModel> = ({
  productData,
  onSubmit,
  errorStatus,
}) => {
  const [selectedImage, setSelectedImage] = useState<
    string | ArrayBuffer | null
  >(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (productData)
      formik.setValues({
        name: productData.name,
        unitOfMesurment: productData.unit,
        wholesalePrice: productData.actualPrice.toString(),
        retailPrice: productData.retailPrice.toString(),
        imgUrl: productData.photoUrl,
      });
  }, [productData]);

  const initialValues: AddNewProductForm = {
    name: "",
    unitOfMesurment: "",
    wholesalePrice: "",
    retailPrice: "",
    imgUrl: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    unitOfMesurment: Yup.string().required("Unit Of Mesurment is required"),
    wholesalePrice: Yup.string().required("? Price per unit"),
    retailPrice: Yup.string().required("Retail Price is required"),
    imgUrl: Yup.string().optional(),
  });

  const handleSubmit = (values: any) => {
    if (productData) onSubmit(productData._id, values);
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
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      setIsUploading(true);
      const imgUrl = await uploadImageToFirebase(file);
      formik.setFieldValue("imgUrl", imgUrl);
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
                id="unitOfMesurment"
                name="unitOfMesurment"
                value={formik.values.unitOfMesurment}
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
              {formik.touched.unitOfMesurment &&
              formik.errors.unitOfMesurment ? (
                <div className="error">{formik.errors.unitOfMesurment}</div>
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
                    id="wholesalePrice"
                    name="wholesalePrice"
                    placeholder="Rs"
                    value={formik.values.wholesalePrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.wholesalePrice &&
                formik.errors.wholesalePrice ? (
                  <div className="error">{formik.errors.wholesalePrice}</div>
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
              ) : formik.values.imgUrl ? (
                <img
                  src={formik.values.imgUrl}
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
