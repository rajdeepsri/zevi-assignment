import { useState, useEffect } from "react";
import ProductsNavBar from "../components/ProductsNavBar";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { ratingBox } from "../components/ratingBox";
import { ProductType, fetchProducts } from "../faker/fakerData";
import ProductsResults from "../components/ProductsResults";
import "./Products.scss";

interface MultipleFilterType {
  brand: boolean[];
  rating: boolean[];
  price: boolean[];
}

const Products = () => {
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [products, setProducts] = useState<ProductType[]>(fetchProducts());
  const [multipleFilters, setMultipleFilters] = useState<MultipleFilterType>({
    brand: [false, false],
    price: [false, false],
    rating: [false, false, false, false, false],
  });

  const [tempProducts, setTempProducts] = useState<ProductType[]>(
    fetchProducts()
  );

  useEffect(() => {
    setProducts(fetchProducts());
    setTempProducts(fetchProducts());
  }, []);

  useEffect(() => {
    let filteredData: ProductType[] = [];

    let filter1Applied = false;
    let filter2Applied = false;
    let filter3Applied = false;

    if (multipleFilters.brand.includes(true)) {
      if (multipleFilters.brand[0]) {
        tempProducts.forEach((product) => {
          if (product.productName === "Incredible Frozen Table")
            filteredData.push(product);
        });
      }
      if (multipleFilters.brand[1]) {
        tempProducts.forEach((product) => {
          if (product.productName === "Tasty Wooden Car")
            filteredData.push(product);
        });
      }
      filter1Applied = true;
    }

    if (multipleFilters.rating.includes(true)) {
      for (let i = 0; i < multipleFilters.rating.length; i++) {
        if (multipleFilters.rating[i]) {
          tempProducts.forEach((product) => {
            if (product.productRating === i + 1) {
              filteredData.push(product);
            }
          });
        }
      }
      filter2Applied = true;
    }

    if (multipleFilters.price[0]) {
      tempProducts.forEach((product) => {
        if (product.productDisPrice < 500) {
          filteredData.push(product);
        }
      });

      filter3Applied = true;
    }

    if (multipleFilters.price[1]) {
      tempProducts.forEach((product) => {
        if (
          product.productDisPrice >= 1000 &&
          product.productDisPrice <= 3000
        ) {
          filteredData.push(product);
        }
      });
      filter3Applied = true;
    }

    if (filter1Applied || filter2Applied || filter3Applied) {
      setProducts(filteredData);
    } else {
      setProducts(tempProducts);
    }
  }, [multipleFilters, tempProducts]);

  return (
    <div className="products_page">
      <ProductsNavBar />
      <h2>Search Results</h2>
      <div className="filter_and_result_container">
        <div className="filter_container">
          <div className="">
            <div
              onClick={() => setShowBrandFilter((prev) => !prev)}
              className="dropdown_container"
            >
              <div className="filter_title">BRAND</div>
              {showBrandFilter ? (
                <BiChevronUp size={24} />
              ) : (
                <BiChevronDown size={24} />
              )}
            </div>
            {showBrandFilter && (
              <div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="Incredible_Frozen_Table"
                    checked={multipleFilters.brand[0]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.brand];
                      updatedFilter[0] = !updatedFilter[0];
                      setMultipleFilters({
                        ...multipleFilters,
                        brand: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="Incredible_Frozen_Table">
                    Incredible Frozen Table
                  </label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="Tasty_Wooden_Car"
                    checked={multipleFilters.brand[1]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.brand];
                      updatedFilter[1] = !updatedFilter[1];
                      setMultipleFilters({
                        ...multipleFilters,
                        brand: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="Tasty_Wooden_Car">Tasty Wooden Car</label>
                </div>
              </div>
            )}
          </div>
          <div className="filter_divider" />
          <div className="">
            <div
              onClick={() => setShowPriceFilter((prev) => !prev)}
              className="dropdown_container"
            >
              <div className="filter_title">PRICE RANGE</div>
              {showPriceFilter ? (
                <BiChevronUp size={24} />
              ) : (
                <BiChevronDown size={24} />
              )}
            </div>
            {showPriceFilter && (
              <div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="under_500"
                    checked={multipleFilters.price[0]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.price];
                      updatedFilter[0] = !updatedFilter[0];
                      setMultipleFilters({
                        ...multipleFilters,
                        price: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="under_500">Under 500</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="between1000_3000"
                    checked={multipleFilters.price[1]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.price];
                      updatedFilter[1] = !updatedFilter[1];
                      setMultipleFilters({
                        ...multipleFilters,
                        price: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="between1000_3000">1000 to 3000</label>
                </div>
              </div>
            )}
          </div>
          <div className="filter_divider" />
          <div className="">
            <div
              onClick={() => setShowRatingFilter((prev) => !prev)}
              className="dropdown_container"
            >
              <div className="filter_title">RATINGS</div>
              {showRatingFilter ? (
                <BiChevronUp size={24} />
              ) : (
                <BiChevronDown size={24} />
              )}
            </div>
            {showRatingFilter && (
              <div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="rating5"
                    checked={multipleFilters.rating[4]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[4] = !updatedFilter[4];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="rating5">{ratingBox(5)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="rating4"
                    checked={multipleFilters.rating[3]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[3] = !updatedFilter[3];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="rating4">{ratingBox(4)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="rating3"
                    checked={multipleFilters.rating[2]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[2] = !updatedFilter[2];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="rating3">{ratingBox(3)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="rating2"
                    checked={multipleFilters.rating[1]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[1] = !updatedFilter[1];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="rating2">{ratingBox(2)}</label>
                </div>
                <div className="input_label_container">
                  <input
                    type="checkbox"
                    name=""
                    id="rating1"
                    checked={multipleFilters.rating[0]}
                    onChange={() => {
                      const updatedFilter = [...multipleFilters.rating];
                      updatedFilter[0] = !updatedFilter[0];
                      setMultipleFilters({
                        ...multipleFilters,
                        rating: updatedFilter,
                      });
                    }}
                  />
                  <label htmlFor="rating1">{ratingBox(1)}</label>
                </div>
              </div>
            )}
          </div>
        </div>
        <ProductsResults products={products} />
      </div>
    </div>
  );
};

export default Products;
