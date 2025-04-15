import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import { MyContext } from "../App";
import { addData, fetchDataFromApi } from "../api";

const Reviews = (props) => {
  const [reviews, setReviews] = useState({
    image: "",
    userName: "",
    review: "",
    rating: 1,
    userId: "",
    productId: "",
  });

  const [reviewsData, setReviewsData] = useState("");
  const [reviewscount, setReviewsCount] = useState(0);
  const context = useContext(MyContext);

  useEffect(() => {
    setReviews(() => ({
      ...reviews,
      image: context?.userData?.avatar,
      userName: context?.userData?.name,
      userId: context?.userData?._id,
      productId: props?.productId,
    }));

    getReviews();
  }, [context?.userData, props]);

  const onChangeInput = (e) => {
    setReviews(() => ({
      ...reviews,
      review: e.target.value,
    }));
  };

  const addReview = (e) => {
    e.preventDefault();

    if (reviews?.review !== "") {
      addData(
        `/api/user/addReview?token=${localStorage.getItem("accesstoken")}`,
        reviews
      ).then((res) => {
        if (res?.error !== false) {
          context.openAlertBox("success", "Review Added successfully");
          setReviews(() => ({
            ...reviews,
            review: "",
            rating: 1,
          }));
          getReviews();
        }
      });
    } else {
      context.openAlertBox("error", "Please add review");
    }
  };

  const getReviews = () => {
    fetchDataFromApi(`/api/user/getReview?productId=${props?.productId}`).then(
      (res) => {
        if (res?.error === false) {
          setReviewsData(res?.reviews);
          props.setReviewsCount(res.reviews.length);
        }
      }
    );
  };

  return (
    <div className="w-full productReviewsConteainer">
      <h2 className="text-[18px]">Customer Reviews</h2>

      {reviewsData?.length !== 0 && (
        <div className="reviewScroll  w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5">
          {reviewsData?.map((review, index) => {
            return (
              <div className="review w-full pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] flex items-center justify-between">
                <div className="info w-[60%] flex items-center gap-3">
                  <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                    <img src={review?.image} alt="user" className="w-full" />
                  </div>
                  <div className="w-[80%]">
                    <h4 className="text-[16px]">{review?.userName}</h4>
                    <h5 className="text-[13px] mb-0">
                      {review?.createdAt?.split("T")[0]}{" "}
                    </h5>
                    <p className="mt-0 mb-0">{review?.review}</p>
                  </div>
                </div>
                <Rating name="size-small" defaultValue={review?.rating} />
              </div>
            );
          })}
        </div>
      )}

      <br />
      <div className="reviewForm bg-[#fafafa] p-4">
        <h2 className="text-[18px]">Add a Review</h2>
        <form className="w-full mt-5" onSubmit={addReview}>
          <TextField
            id="outlined-multiline-static"
            label="Write a review"
            multiline
            rows={5}
            onChange={onChangeInput}
            name="review"
            value={reviews.review}
            className="w-full"
          />

          <Rating
            name="size-small"
            defaultValue={1}
            className="mt-5"
            value={reviews.rating}
            onChange={(e, newvalue) => {
              setReviews(() => ({
                ...reviews,
                rating: newvalue,
              }));
            }}
          />
          <div className="flex items-center mt-4">
            <Button type="submit" className="btn-org">
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
