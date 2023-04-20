import React, { useState } from "react";
import { useSelector } from "react-redux";
import Helmet from "../components/Helmet/Helmet";
import "../styles/Profile.css";

const profileLinks = [
  { to: "/profile", text: "Personal Information" },
  { to: "/address", text: "Address" },
];

const Profile = () => {
  const [file, setFile] = useState(null);
  const email = useSelector((state) => state.auth.email);
  const username = useSelector((state) => state.auth.userName);
  const [showOptions, setShowOptions] = useState(false);

  const handleEditClick = () => {
    setShowOptions(!showOptions);
  };

  return (
    <Helmet title={"Profile"}>
      <div style={{ backgroundColor: "#d6e3e7" }}>
        <div className="container-xl p-5 ">
          <div className="row">
            <div className="col-xl-4">
              {/* <!-- Profile picture card--> */}
              <div className="card mb-4 mb-xl-0">
                <div className="card-header">Profile Picture</div>
                <div className="card-body text-center">
                  {/* <!-- Profile picture image--> */}
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    style={{ width: "58%", height: "50%" }}
                    src="https://i.pinimg.com/736x/d0/7e/bb/d07ebbf54c2c1cdf370a13324afaa073.jpg"
                    alt=""
                  />
                  {/* <!-- Profile picture help block--> */}
                  <div className="small font-italic text-muted mb-4">
                    JPG or PNG no larger than 5 MB
                  </div>
                  {/* <!-- Profile picture upload button--> */}
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(e) => setFile(e.target.files[0])}
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              {/* <!-- Account details card--> */}
              <div className="card mb-4">
                <div className="card-header d-flex">
                  <h6>Account Details</h6>
                  <i
                    class="ri-more-2-fill"
                    onClick={handleEditClick}
                    style={{
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    {showOptions && (
                      <div className="options">
                        <div>Edit</div>
                      </div>
                    )}
                  </i>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row gx-3 mb-3">
                      <div className="col-md-6">
                        <label className="small mb-1" for="inputUsername">
                          Username
                        </label>
                        <input
                          className="border"
                          disabled
                          type="text"
                          value={username}
                          placeholder="Enter your username"
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1 " for="inputLocation">
                          Location
                        </label>
                        <input className="border" type="text" disabled />
                      </div>
                    </div>

                    <div className="row gx-3 mb-2">
                      <div className="col-md-6">
                        <label className="small mb-1" for="inputBirthday">
                          Phone number
                        </label>
                        <input className="border" type="text" disabled />
                      </div>
                      <div className="col-md-6">
                        <label className="small mb-1" for="inputEmailAddress">
                          Email address
                        </label>
                        <input
                          className="border"
                          disabled
                          value={email}
                          type="email"
                        />
                      </div>
                    </div>

                    {/* <button className="btn btn-primary" type="button">
                      Save changes
                    </button> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Profile;
