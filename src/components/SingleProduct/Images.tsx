import React, { useState } from "react";
import SingleImage from "./SingleImage";

interface Props {
  mainImage: string;
  additionImages: string[];
}

const Images: React.FC<Props> = ({ mainImage, additionImages }) => {
  const [image, setImage] = useState<string>(mainImage);
  return (
    <div>
      <div className="singleProd__mainImg-wrapper">
        <img loading="lazy" src={image} alt="bigImage" />
      </div>
      <div className="singleProd__images-list">
        <SingleImage image={mainImage} setImage={setImage} />
        {additionImages.map((img, index) => (
          <SingleImage image={img} key={index} setImage={setImage} />
        ))}
      </div>
    </div>
  );
};

export default Images;
