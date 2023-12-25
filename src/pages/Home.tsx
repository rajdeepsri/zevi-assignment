import { FormEvent, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import HomeHeader from "../components/HomeHeader";
import {
  LatestTrendType,
  SuggestionType,
  fetchLatestTrendData,
  fetchSuggestionData,
} from "../faker/fakerData";

const Home = () => {
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const [latestTrendsData, setLatestTrendsData] = useState<LatestTrendType[]>();
  const [suggestionData, setSuggestionData] = useState<SuggestionType[]>();

  const navigate = useNavigate();

  const getBoxProducts = () => {
    setShowSuggestionBox((prev) => !prev);
    setLatestTrendsData(fetchLatestTrendData());
    setSuggestionData(fetchSuggestionData());
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/products");
  };

  const navigateToProductsPage = () => {
    navigate("/products");
  };

  return (
    <div className="home">
      <HomeHeader />
      <div className="home_content">
        <form className="input_container" onSubmit={onSubmitHandler}>
          <input
            onClick={() => getBoxProducts()}
            type="text"
            className="home_input"
            placeholder="Search..."
          />
          <button className="search_icon_container">
            <FiSearch size="24" color="gray" />
          </button>
        </form>
        {showSuggestionBox && (
          <div className="latest_trend_and_suggestion_box">
            <div className="latest_trend_box">
              <div className="category_title">Latest Trends</div>
              <div className="latest_trend_products">
                {latestTrendsData?.map((product, i) => {
                  return (
                    <div
                      key={i}
                      className="latest_trend_product"
                      onClick={navigateToProductsPage}
                    >
                      <img src={product.productImg} alt="" />
                      <div>{product.productName}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="category_title">Popular Suggestion</div>
              <div>
                {suggestionData?.map((product, i) => {
                  return (
                    <p
                      key={i}
                      className="suggestion_product"
                      onClick={navigateToProductsPage}
                    >
                      {product.productName}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
