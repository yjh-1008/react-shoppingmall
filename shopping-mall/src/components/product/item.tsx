
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Product } from "../../graphql/products";
import { cartItemSelector } from '../../recolis/cart';
const ProductItem = ({
  id,
  imageUrl,
  price,
  title,
  description,
  createdAt,
}: Product) => {
  const [cartAmount,setCartAmount] = useRecoilState(cartItemSelector(id));
  const addToCart=()=>setCartAmount(prev=>(cartAmount||0)+1);
  return (
    <li className="product-item">
      <Link to={`/products/${id}`}>
        <p className="product-item__title">title</p>
        <img className="product-item__image" src={imageUrl} />
        <span className="product-item__price">{price}</span>
      </Link>
      <button className="product-item_add-cart" onClick={addToCart}>담기</button>
      <span>{cartAmount}</span>
    </li>
  );
};

export default ProductItem