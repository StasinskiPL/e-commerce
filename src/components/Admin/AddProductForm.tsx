import { useState, useRef, FormEvent } from "react";
import { postProducts } from "../../store/productsSlice";
import { useDispatch } from "react-redux";
import { Product } from "../../types";
import categories from "../../assets/data/categories";

const AddProductForm = () => {
  const name = useRef<HTMLInputElement>(null!);
  const description = useRef<HTMLTextAreaElement>(null!);
  const category = useRef<HTMLSelectElement>(null!);
  const image = useRef<HTMLInputElement>(null!);
  const additionImages1 = useRef<HTMLInputElement>(null!);
  const additionImages2 = useRef<HTMLInputElement>(null!);
  const additionImages3 = useRef<HTMLInputElement>(null!);
  const price = useRef<HTMLInputElement>(null!);

  const [nameError, setNameError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);
  const [priceError, setPriceError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const addProductHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      name.current.value.trim() !== "" &&
      description.current.value.trim() !== "" &&
      category.current.value &&
      image.current.value.trim() !== "" &&
      price.current.value.toString().trim() !== ""
    ) {
      const additionalImages: string[] = [];
      additionImages1.current.value &&
        additionalImages.push(additionImages1.current.value);
      additionImages2.current.value &&
        additionalImages.push(additionImages2.current.value);
      additionImages3.current.value &&
        additionalImages.push(additionImages3.current.value);

      const prod: Product = {
        name: name.current.value,
        description: description.current.value,
        category: category.current.value,
        mainImage: image.current.value,
        price: +price.current.value,
        additionalImages: additionalImages,
      };
      dispatch(postProducts(prod));
      name.current.value = "";
      description.current.value = "";
      image.current.value = "";
      price.current.value = "";
      additionImages1.current.value = "";
      additionImages2.current.value = "";
      additionImages3.current.value = "";
       setNameError(false);
      setDescriptionError(false);
       setPriceError(false);
       setNameError(false);
    } else {
      name.current.value || setNameError(true);
      description.current.value ||  setDescriptionError(true);
      price.current.value || setPriceError(true);
      image.current.value || setImageError(true);
    }
    name.current.value || setNameError(true);
    console.log(name.current.value || "null")

  };
  console.log(nameError)
  return (
    <form className="admin__addForm" onSubmit={(e) => addProductHandler(e)}>
      <label className={`${nameError && "admin-error"}`} htmlFor="name">
        Name:
      </label>
      <input ref={name} name="name" type="text" />

      <label className={`${priceError && "admin-error"}`} htmlFor="price">
        Price:
      </label>
      <input ref={price} name="price" type="number" step="0.01" />

      <label  htmlFor="desc">Description:</label>
      <textarea
      className={`${descriptionError && "admin-error-textarea"}`}
        ref={description}
        name="Description"
      />

      <label htmlFor="category">Category:</label>
      <select ref={category} name="category">
        {categories.map((catgr, index) => (
          <option key={index} value={catgr}>
            {catgr}
          </option>
        ))}
      </select>

      <label className={`${imageError && "admin-error"}`} htmlFor="Image">
        Image(url):
      </label>
      <input ref={image} name="Image" type="text" />

      <label htmlFor="additionalImg">Additional Images:</label>
      <input ref={additionImages1} name="additionalImg" type="text" />
      <input ref={additionImages2} name="additionalImg" type="text" />
      <input ref={additionImages3} name="additionalImg" type="text" />

      <button className="admin__addForm-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
