import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import SmallProduct from "./SmallProduct";
import Loader from "../../components/Loader";
import { Button, Label, Select, Textarea, Tabs, Card } from "flowbite-react";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="overflow-x-auto min-w-full p-4">
      <Tabs aria-label="Tabs with icons" variant="underline">
        <Tabs.Item active title="Write Review">
          <div className="max-w-xl">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-3">
                <div className="mb-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    color="purple"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </Select>
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="comment" value="Comment" />
                  </div>
                  <Textarea
                    type="text"
                    color="purple"
                    required
                    value={comment}
                    rows={4}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <Button
                  color="purple"
                  type="submit"
                  disabled={loadingProductReview}
                >
                  Submit
                </Button>
              </form>
            ) : (
              <p>
                Please <Link to="/login">sign in</Link> to write a review
              </p>
            )}
          </div>
        </Tabs.Item>
        <Tabs.Item className="" title="All Reviews">
          <section className="min-w-full">
            <div className="text-gray-700 text-sm">
              {product.reviews.length === 0 && <p>No Reviews</p>}
            </div>
            <div className="flex flex-wrap gap-4">
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="group bg-white border border-solid border-gray-300 rounded-2xl p-6 transition-all duration-500 w-96 "
                >
                  <div className="flex justify-between">
                    <strong className="text-gray-900">{review.name}</strong>
                    <p className="text-gray-600 text-sm">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4 text-gray-700 text-sm">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </section>
        </Tabs.Item>
        <Tabs.Item title="Related Products">
          <section className="flex flex-wrap gap-4">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
