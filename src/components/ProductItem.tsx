import { useState } from "react";
import "./ProductItem.scss";
import { ProductType } from "../faker/fakerData";
import { ratingBox } from "./ratingBox";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

interface ProductItemType {
  product: ProductType;
}

const ProductItem = ({ product }: ProductItemType) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showViewProduct, setShowViewProduct] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="product_item">
      <div className="product_img_container">
        <div className="wishlist_icon_container">
          {isInWishlist ? (
            <AiFillHeart
              color="red"
              onClick={() => setIsInWishlist((prev) => !prev)}
            />
          ) : (
            <AiOutlineHeart
              color="white"
              onClick={() => setIsInWishlist((prev) => !prev)}
            />
          )}
        </div>
        <img
          className="product_img"
          src={product.productImg}
          alt="product_img"
          onMouseOver={() => setShowViewProduct(true)}
          onMouseOut={() => setShowViewProduct(false)}
        />
        {showViewProduct && (
          <div
            onMouseOver={() => setShowViewProduct(true)}
            onMouseOut={() => setShowViewProduct(false)}
            className="view_product"
            onClick={() => navigate("/")}
          >
            View Product
          </div>
        )}
      </div>
      <p>{product.productName}</p>
      <p>
        <span className="org_price">Rs. {product.productOrgPrice} </span>
        <span className="dis_price">Rs. {product.productDisPrice} </span>
      </p>
      <div className="rating_and_reviews_container">
        {ratingBox(product.productRating)} ({product.productsReviews})
      </div>
    </div>
  );
};

export default ProductItem;
