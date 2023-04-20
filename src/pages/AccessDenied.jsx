import React from "react";

import "../styles/Services.css";

const AccessDenied = () => {
  return (
    <section className="text-center ">
      <h1 className="py-2 text-danger" style={{ fontSize: 45 }}>
        Access Denied.
      </h1>
      <h5 className="pb-4">You need to be logged in to view this page</h5>
    </section>
  );
};
export default AccessDenied;
