import ReactDOM from "react-dom";
import loaderImg from "../../assets/images/loading.gif";
import "./Loading.css";

const Loading = () => {
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loading">
        <img src={loaderImg} alt="Loading..." />{" "}
      </div>
    </div>,
    document.getElementById("loading")
  );
};

export default Loading;
