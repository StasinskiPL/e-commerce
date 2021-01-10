import { useState, useRef, FormEvent, useEffect } from "react";
import { postProducts } from "../../store/productsSlice";
import { useDispatch } from "react-redux";
import { Product } from "../../types";
import categories from "../../assets/data/categories";
import { auth } from "../../firebase";

const AddProductForm = () => {
  const form = useRef<HTMLFormElement>(null!);
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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.email === "dawid1@gmail.com") {
      setIsAdmin(true);
    }
  }, []);

  const addProductHandler = (e: FormEvent) => {
    e.preventDefault();
    if (
      name.current.value.trim() &&
      description.current.value.trim() &&
      category.current.value &&
      image.current.value.trim() &&
      price.current.value.toString().trim()
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
      if (auth.currentUser && auth.currentUser.email === "dawid1@gmail.com") {
        dispatch(postProducts(prod));
      }
      form.current.reset();
      setNameError(false);
      setDescriptionError(false);
      setPriceError(false);
      setImageError(false);
    } else {
      name.current.value ? setNameError(false) : setNameError(true);
      description.current.value
        ? setDescriptionError(false)
        : setDescriptionError(true);
      price.current.value ? setPriceError(false) : setPriceError(true);
      image.current.value ? setImageError(false) : setImageError(true);
    }
  };
  return (
    <form
      ref={form}
      className="admin__addForm"
      onSubmit={(e) => addProductHandler(e)}
    >
      <label className={`${nameError && "admin-error"}`} htmlFor="name">
        Name:
      </label>
      <input ref={name} name="name" type="text" />

      <label className={`${priceError && "admin-error"}`} htmlFor="price">
        Price:
      </label>
      <input ref={price} name="price" type="number" step="0.01" />

      <label htmlFor="desc">Description:</label>
      <textarea
        className={`${descriptionError && "admin-error-textarea"}`}
        ref={description}
        name="Description"
      />

      <label htmlFor="category">Category:</label>
      <select ref={category} name="category">
        {categories.slice(1).map((catgr, index) => (
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

      <button
        className="admin__addForm-btn"
        title="You aren't Admin"
        disabled={!isAdmin}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
