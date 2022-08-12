import { useMutation } from "react-query";
import { SyntheticEvent } from "react";
import { CartType, DELETE_CART, UPDATE_CART } from "../../graphql/cart"
import { getClient, graphqlFetcher, QueryKeys } from "../../queryClient";
import { graphql } from "graphql";

const CartItem = ({ id, imageUrl, price, title, amount }: CartType) => {
    const queryClient = getClient();
    const { mutate: updateCart } = useMutation(({id,amount}: {id: string,amount:number}) =>
    graphqlFetcher(UPDATE_CART, { id, amount }),{
      onMutate:async ({id,amount})=>{
        await queryClient.cancelQueries(QueryKeys.CART)

        const prevCart = queryClient.getQueryData<{[key:string]:CartType}>(QueryKeys.CART)
        if (!prevCart?.[id]) return prevCart; 

        const newCart = { ...(prevCart || {}),
        [id]:{...prevCart[id]},amount};

        return prevCart
      },
      onSuccess: newValue=>{
        const prevCart = queryClient.getQueryData<{[key:string]:CartType}>(QueryKeys.CART)
        const newCart = { ...(prevCart || {}), [id]: newValue}
        queryClient.setQueryData(QueryKeys.CART,newCart);
      }
    }
  );

  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART)
      },
    },
  )

 const handleUpdateAmount = (e:SyntheticEvent) => {
    const amount = Number((e.target as HTMLInputElement).value);
    updateCart({ id, amount });
 }

 return (
   <li className="cart-item">
    <input className="cart-item__checkbox" type="checkbox" />
     <img className="cart-item__image" src={imageUrl} />
     <p className="cart-item__price">{price}</p>
     <p className="cart-item__title">{title}</p>
     <input
       type="number"
       className="cart-item__amount"
       value={amount}
       onChange={handleUpdateAmount}
     ></input>
     <button type="button" className="cart-item__button" >
        삭제
     </button>
   </li>
 );
};

export default CartItem;