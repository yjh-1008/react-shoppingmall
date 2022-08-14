import { createRef, forwardRef, SyntheticEvent, useRef } from "react";
import {CartType} from "../../graphql/cart"
import CartItem from "./item"

const CartList = ({items}:{items : CartType[]})=>{
  const formRef = useRef<HTMLFormElement>(null);
  const checkboxRefs = items.map(()=> createRef<HTMLInputElement>());

  const handelCheckboxChanged = (e:SyntheticEvent) => {
    if (!formRef.current) return;
    // const checkboxes = formRef.current.querySelectorAll<HTMLInputElement>(".cart-item__checkbox");
    const targetInput = e.target as HTMLInputElement;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll("select-item").length;

    if (targetInput.classList.contains('select-all')) {//전체선택 선택지
      const allChecked = targetInput.checked;
      checkboxRefs.forEach((inputElem) => {
        inputElem.current!.checked = allChecked
      });
    }else{
      //개별 선택지
      const allChecked = selectedCount === items.length;
      formRef.current.querySelector<HTMLInputElement>(".select-all")!.checked =
        allChecked;
    }
  }

    return (
      <form ref={formRef} onChange={handelCheckboxChanged}>
          <label>
            <input className="select-all" type="checkbox" />전체 선택
          </label>
          <ul className="cart">
            {items.map((item,i) => (
              <CartItem {...item} key={item.id} ref={checkboxRefs[i]} />
            ))}
          </ul>
      </form>
    );
}

export default CartList;