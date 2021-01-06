import { useRef, FormEvent } from "react";
import { postProducts } from "../../store/productsSlice";
import { useDispatch } from "react-redux";
import { Product } from "../../types";

const AddProductForm = () => {
  const name = useRef<HTMLInputElement>(null!);
  const description = useRef<HTMLTextAreaElement>(null!);
  const category = useRef<HTMLInputElement>(null!);
  const image = useRef<HTMLInputElement>(null!);
  const additionImages = useRef<HTMLInputElement>(null!);
  const price = useRef<HTMLInputElement>(null!);

  const dispatch = useDispatch();

  const addProductHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      name.current.value &&
      description.current.value &&
      category.current.value &&
      image.current.value &&
      price.current.value
    ) {
      const prod: Product = {
        name: name.current.value,
        description: description.current.value,
        category: category.current.value,
        mainImage: image.current.value,
        price: +price.current.value,
        additionalImages: [],
      };
      dispatch(postProducts(prod));
      name.current.value = "";
      description.current.value = "";
      category.current.value = "";
      image.current.value = "";
    } else {
        // validation Handler
      console.log("notWork");
    }
  };
  return (
    <form className="admin__addForm" onSubmit={(e) => addProductHandler(e)}>
      <label htmlFor="name">Name:</label>
      <input ref={name} name="name" type="text" />

      <label htmlFor="price">Price:</label>
      <input ref={price} name="price" type="number" />

      <label htmlFor="desc">Description:</label>
      <textarea ref={description} name="Description" />

      <label htmlFor="category">Category:</label>
      <input ref={category} name="category" type="text" />

      <label htmlFor="Image">Image(url):</label>
      <input ref={image} name="Image" type="text" />

      <label htmlFor="additionalImg">Additional Images:</label>
      <input ref={additionImages} name="additionalImg" type="text" />

      <button className="admin__addForm-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
