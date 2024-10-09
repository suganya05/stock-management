import React from "react";

interface IShowPassword {
  password: string;
}

const ShowPassword: React.FC<IShowPassword> = ({ password }) => {
  return <div>New password is {password}</div>;
};

export default ShowPassword;
