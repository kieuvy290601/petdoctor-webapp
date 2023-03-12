import React from "react";
import { Col } from "reactstrap";

import "../styles/CustomerRate.css";

const CustomerRates = () => {
  return (
    // <section className="customer_review">
    //   <Container>
    //     <Row>
    //       <Col lg="12" className="text-center">
    //         <h2 className="section_title" style={{ fontWeight: 700 }}>
    //           Customer Reviews
    //         </h2>
    //       </Col>
    //       <Col>
    //         <section>
    //           <div class="row text-center d-flex align-items-stretch">
    //             <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
    //               <div class="card testimonial-card">
    //                 <div
    //                   class="card-up"
    //                   style={{ backgroundColor: "#c098be" }}
    //                 ></div>
    //                 <div class="avatar mx-auto bg-white">
    //                   <img
    //                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
    //                     class="rounded-circle img-fluid"
    //                     alt=""
    //                   />
    //                 </div>
    //                 <div class="card-body">
    //                   <h4 class="mb-4">Maria Smantha</h4>
    //                   <hr />
    //                   <p class="dark-grey-text mt-4">
    //                     <i class="fas fa-quote-left pe-2"></i>Lorem ipsum dolor
    //                     sit amet eos adipisci, consectetur adipisicing elit.
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="col-md-4 mb-5 mb-md-0 d-flex align-items-stretch">
    //               <div class="card testimonial-card">
    //                 <div
    //                   class="card-up"
    //                   style={{ backgroundColor: "#939ac4" }}
    //                 ></div>
    //                 <div class="avatar mx-auto bg-white">
    //                   <img
    //                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(2).webp"
    //                     class="rounded-circle img-fluid"
    //                     alt=""
    //                   />
    //                 </div>
    //                 <div class="card-body">
    //                   <h4 class="mb-4">Lisa Cudrow</h4>
    //                   <hr />
    //                   <p class="dark-grey-text mt-4">
    //                     <i class="fas fa-quote-left pe-2"></i>Neque cupiditate
    //                     assumenda in maiores repudi mollitia architecto.
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="col-md-4 mb-0 d-flex align-items-stretch">
    //               <div class="card testimonial-card">
    //                 <div
    //                   class="card-up"
    //                   style={{ backgroundColor: "#a191c7" }}
    //                 ></div>
    //                 <div class="avatar mx-auto bg-white">
    //                   <img
    //                     src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(9).webp"
    //                     class="rounded-circle img-fluid"
    //                     alt=""
    //                   />
    //                 </div>
    //                 <div class="card-body">
    //                   <h4 class="mb-4">John Smith</h4>
    //                   <hr />
    //                   <p class="dark-grey-text mt-4">
    //                     <i class="fas fa-quote-left pe-2"></i>Delectus impedit
    //                     saepe officiis ab aliquam repellat rem unde ducimus.
    //                   </p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </section>
    //       </Col>
    //     </Row>
    //   </Container>
    // </section>
    // <section>
    <div class="container pb-5">
      <div class="row d-flex justify-content-center">
        <Col lg="12" className="text-center">
          <h2 className="section_title" style={{ fontWeight: 700 }}>
            Customer Reviews
          </h2>
        </Col>
      </div>

      <div class="row text-center">
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="card" style={{ background: "#efc7c2" }}>
            <div class="card-body py-4 mt-2">
              <div class="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
                  class="rounded-circle shadow-1-strong"
                  style={{ width: 100, height: 100 }}
                  alt=""
                />
              </div>
              <h5 class="font-weight-bold">Teresa May</h5>
              <h6 class="font-weight-bold my-3">Founder at ET Company</h6>
              <ul class="list-unstyled d-flex justify-content-center">
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-half-line"></i>
                </li>
              </ul>
              <p class="mb-2">
                <i class="fas fa-quote-left pe-2"></i>Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Quod eos id officiis hic
                tenetur quae quaerat ad velit ab hic tenetur.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-4 mb-md-0">
          <div class="card" style={{ background: "#ffe5d4" }}>
            <div class="card-body py-4 mt-2">
              <div class="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(15).webp"
                  class="rounded-circle shadow-1-strong"
                  style={{ width: 100, height: 100 }}
                  alt=""
                />
              </div>
              <h5 class="font-weight-bold">Maggie McLoan</h5>
              <h6 class="font-weight-bold my-3">Photographer at Studio LA</h6>
              <ul class="list-unstyled d-flex justify-content-center">
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
              </ul>
              <p class="mb-2">
                <i class="fas fa-quote-left pe-2"></i>Autem, totam debitis
                suscipit saepe sapiente magnam officiis quaerat necessitatibus
                odio assumenda perferendis labore laboriosam.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4 mb-0">
          <div class="card" style={{ background: "#bfd3c1" }}>
            <div class="card-body py-4 mt-2">
              <div class="d-flex justify-content-center mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(17).webp"
                  class="rounded-circle shadow-1-strong"
                  style={{ width: 100, height: 100 }}
                  alt=""
                />
              </div>
              <h5 class="font-weight-bold">Alexa Horwitz</h5>
              <h6 class="font-weight-bold my-3">Front-end Developer in NY</h6>
              <ul
                class="list-unstyled d-flex justify-content-center"
                style={{ color: "#ffa531" }}
              >
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-fill"></i>
                </li>
                <li>
                  <i class="ri-star-half-line"></i>
                </li>
              </ul>
              <p class="mb-2">
                <i class="fas fa-quote-left pe-2"></i>Cras sit amet nibh libero,
                in gravida nulla metus scelerisque ante sollicitudin commodo
                cras purus odio, vestibulum in tempus viverra turpis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRates;
