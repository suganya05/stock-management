import React from "react";
import Button from "../../Button";
import "./Employees.scss";

const data = [
  {
    title: "Person 1",
  },
  {
    title: "Person 2",
  },
  {
    title: "Person 3",
  },
  {
    title: "Person 4",
  },
  {
    title: "Person 5",
  },
  {
    title: "Person 6",
  },
  {
    title: "Person 7",
  },
  {
    title: "Person 8",
  },
];

const Employees: React.FC = () => {
  return (
    <div className="employees-wrapper">
      <div className="employees-head">
        <h4>EMPLOYEES</h4>
      </div>
      <div className="employees-container">
        {data.map((f, index) => {
          return (
            <div key={index} className="employees-content">
              <p>{f.title}</p>
              <div className="dots"></div>
            </div>
          );
        })}
      </div>
      <div className="add-employee">
        <Button varient="primary">Add Employee</Button>
      </div>
    </div>
  );
};

export default Employees;
