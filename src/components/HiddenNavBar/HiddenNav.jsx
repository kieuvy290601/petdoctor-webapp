import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/slices/authSlice"

const AfterLoggedIn = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) {
    return children;
  }
  return null;
};

export const AfterLoggedOut = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (!isLoggedIn) {
    return children;
  }
  return null;
};

export default AfterLoggedIn;
