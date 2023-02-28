import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";

const Profile = () => {
  const auth = getAuth();
  const [file, setFile] = useState(null);

  return (
    <Helmet title={"Profile"}>
      <div
        className="container-xl p-5 mt-4 mb-5"
        style={{ background: "#bccce4", borderRadius: 20 }}
      >
        <div className="row">
          <div className="col-xl-4">
            {/* <!-- Profile picture card--> */}
            <div className="card mb-4 mb-xl-0">
              <div className="card-header">Profile Picture</div>
              <div className="card-body text-center">
                {/* <!-- Profile picture image--> */}
                <img
                  className="img-account-profile rounded-circle mb-2"
                  style={{ width: "59%", height: 170 }}
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
              <div className="card-header">Account Details</div>
              <div className="card-body">
                <form>
                  <div className="row gx-3 mb-3">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputUsername">
                        Username
                      </label>
                      <input
                        className="border"
                        type="text"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1 " for="inputLocation">
                        Location
                      </label>
                      <input
                        className="border"
                        type="text"
                        placeholder="Enter your location"
                      />
                    </div>
                  </div>

                  <div className="row gx-3 mb-2">
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputBirthday">
                        Phone number
                      </label>
                      <input
                        className="border"
                        type="text"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="small mb-1" for="inputEmailAddress">
                        Email address
                      </label>
                      <input
                        className="border"
                        // value={auth.currentUser.email}
                        type="email"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div>

                  <button className="btn btn-primary" type="button">
                    Save changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Profile;
