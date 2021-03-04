import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
// import { postProducts } from "../../store/productsSlice";
// import { Product } from "../../types";
import categories from "../../assets/data/categories";
import { RootState } from "../../store/store";

interface FormTypes {
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  additionalImg1: string;
  additionalImg2: string;
  additionalImg3: string;
}

let schema = yup.object().shape({
  name: yup.string().required(),
  price: yup.number().required().positive(),
  description: yup.string().required(),
  category: yup.string(),
  image: yup.string().required().url(),
  additionalImg1: yup.string().url(),
  additionalImg2: yup.string().url(),
  additionalImg3: yup.string().url(),
});

const AddProductForm = () => {
  const form = useRef<HTMLFormElement>(null!);
  // const dispatch = useDispatch();

  const { isLogin } = useSelector((state: RootState) => state.login);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const addProductHandler = (data: FormTypes) => {
    // const additionalImages: string[] = [
    //   data.additionalImg1,
    //   data.additionalImg2,
    //   data.additionalImg3,
    // ].filter((link) => link);

    // const prod: Product = {
    //   name: data.name,
    //   description: data.description,
    //   category: data.category,
    //   price: data.price,
    //   mainImage: data.image,
    //   additionalImages: additionalImages,
    // };
    if (isLogin) {
      // dispatch(postProducts(prod));
    }
    form.current.reset();
  };

  return (
    <form
      ref={form}
      className="admin__addForm"
      onSubmit={handleSubmit(addProductHandler)}>
      <label className={`${errors.name && "admin-error"}`} htmlFor="name">
        Name:
      </label>
      <input ref={register} name="name" type="text" />

      <label className={`${errors.price && "admin-error"}`} htmlFor="price">
        Price:
      </label>
      <input ref={register} name="price" type="text" />

      <label htmlFor="description">Description:</label>
      <textarea
        className={`${errors.description && "admin-error-textarea"}`}
        ref={register}
        name="description"
      />

      <label htmlFor="category">Category:</label>
      <select ref={register} name="category">
        {categories.slice(1).map((catgr, index) => (
          <option key={index} value={catgr}>
            {catgr}
          </option>
        ))}
      </select>

      <label className={`${errors.image && "admin-error"}`} htmlFor="image">
        Image(url):
      </label>
      <input ref={register} name="image" type="text" />

      <label htmlFor="additionalImg1">Additional Images:</label>
      <input ref={register} name="additionalImg1" type="text" />
      <input ref={register} name="additionalImg2" type="text" />
      <input ref={register} name="additionalImg3" type="text" />

      <button
        className="admin__addForm-btn"
        title="You aren't Admin"
        disabled
        type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;
