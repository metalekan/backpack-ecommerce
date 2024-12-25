import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <>
      <h1 className="lg:text-lg text-base font-semibold text-gray-900">
        Favorite Products
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Favorites;
