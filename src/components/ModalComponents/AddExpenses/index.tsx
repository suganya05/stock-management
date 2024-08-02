import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./AddExpenses.scss";
import Button from "../../Button";

interface IAddExpenses {
  newExpenses: string;
}

const initialValues: IAddExpenses = {
  newExpenses: "",
};

const validationSchema = Yup.object().shape({
  newExpenses: Yup.string().required("New Expenses is required"),
});

const AddExpenses: React.FC = () => {
  const handleSubmit = (values: IAddExpenses) => {
    console.log(values);
  };

  return (
    <div className="add-expenses-wrapper">
      <div className="add-expenses-head">
        <h4>Add Expenses</h4>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form-wrapper">
          <div className="name">
            <Field
              type="text"
              id="newExpenses"
              name="newExpenses"
              placeholder="New expenses"
            />
            <ErrorMessage
              name="newExpenses"
              component="div"
              className="error"
            />
          </div>
          <div className="add-expenses-btn">
            <Button varient="primary">Add expenses</Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default AddExpenses;
