// import React, { useState, useEffect } from "react";
// import { db } from "../firebase.config";


// const ReviewForm = ({ productId }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     db.auth().onAuthStateChanged((user) => {
//       setUser(user);
//     });
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     db
//       .firestore()
//       .collection("reviews")
//       .add({
//         productId,
//         userId: user.uid,
//         rating,
//         comment,
//         createdAt: db.firestore.FieldValue.serverTimestamp(),
//       })
//       .then(() => {
//         setRating(0);
//         setComment("");
//       });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Rating:
//         <input
//           type="number"
//           min="1"
//           max="5"
//           value={rating}
//           onChange={(e) => setRating(Number(e.target.value))}
//         />
//       </label>
//       <label>
//         Comment:
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//         />
//       </label>
//       <button type="submit">Submit Review</button>
//     </form>
//   );
// };

// const ReviewList = ({ productId }) => {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     db
//       .firestore()
//       .collection("reviews")
//       .where("productId", "==", productId)
//       .orderBy("createdAt", "desc")
//       .onSnapshot((querySnapshot) => {
//         const newReviews = [];
//         querySnapshot.forEach((doc) => {
//           newReviews.push({ id: doc.id, ...doc.data() });
//         });
//         setReviews(newReviews);
//       });
//   }, [productId]);

//   return (
//     <ul>
//       {reviews.map((review) => (
//         <li key={review.id}>
//           <p>{review.rating} stars</p>
//           <p>{review.comment}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// const ProductPage = ({ productId }) => {
//   return (
//     <div>
//       <h1>Product Page</h1>
//       <ReviewForm productId={productId} />
//       <ReviewList productId={productId} />
//     </div>
//   );
// };

// export default ProductPage;


import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";


const RatingReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(null);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add new review to Firestore
    await db.collection("reviews").add({
      productId,
      rating,
      review,
      createdAt: new Date(),
    });

    // Clear form inputs
    setRating(null);
    setReview("");

    // Update reviews state
    fetchReviews();
  };

  const fetchReviews = async () => {
    // Fetch all reviews for this product from Firestore
    const querySnapshot = await db
      .collection("reviews")
      .where("productId", "==", productId)
      .orderBy("createdAt", "desc")
      .get();

    // Map each review to a plain object and add to reviews state
    const reviewsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(reviewsData);
  };

  useEffect(() => {
    // Fetch reviews for this product on component mount
    fetchReviews();
  }, []);

  return (
    <div>
      <h2>Product Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.review}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h3>Add a review</h3>
        <div>
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(parseInt(e.target.value))}
          >
            <option value="">Select a rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RatingReviewForm;
