import { Bounce, Flip, ToastOptions } from "react-toastify";

export const TostPromiseOption: ToastOptions = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Flip,
  progressStyle : {
    background : '#ffbb64'
  }
};
