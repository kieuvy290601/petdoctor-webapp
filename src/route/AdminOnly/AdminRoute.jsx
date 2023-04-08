import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userRole = useSelector(selectUserRole);

  if (userRole === "admin") {
    return children;
  } else {
    return (
      <section className="text-center ">
        <h1 className="py-2 text-danger" style={{fontSize: 45}}>Access Denied.</h1>
        <p className="pb-4">This page is for admins only</p>
        <Link to="/home">
        <button className="btn btn-primary">&#8592; Back to Home</button>
        </Link>
      </section>
    );
  }
};
export const AdminLink = ({ children }) => {
  const userRole = useSelector(selectUserRole);

  if (userRole === "admin") {
    return children;
  } else {
    return null;
  }
};

export default AdminRoute;
