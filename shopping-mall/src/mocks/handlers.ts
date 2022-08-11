import {graphql} from 'msw';
import { QueryKeys } from '../queryClient';
import { v4 as uuid} from 'uuid';
import GET_PRODUCTS, { GET_PRODUCT } from '../graphql/products';
const mock_products = Array.from({length:20}).map(
(_,i)=>({
    id:uuid(),
    imageUrl:`https://placeimg.com/640/480/${i+1}`,
    place:50000,
    title:`임시상품${i+1}`,
    description:`임시상세내용${i+1}`,
    createdAt:new Date(123456789123+(i*1000*60*10)).toString(),


})
);

export const handlers = [
    graphql.query(GET_PRODUCTS,(req,res,ctx)=>{
        return res(
            ctx.data({
                products:mock_products
            })
        );
    }),
    graphql.query(GET_PRODUCT,(req,res,ctx)=>{

       return res(ctx.data(mock_products[0]))
    })
]