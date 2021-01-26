import React, { useState } from "react";
import ImgModal from "./ImgModal";
import SingleImage from "./SingleImage";

interface Props {
  mainImage: string;
  additionImages: string[];
}

const Images: React.FC<Props> = ({ mainImage, additionImages }) => {
  const [image, setImage] = useState<string>(mainImage);
  const [showBigImage, setShowBigImage] = useState<boolean>(false);
  return (
    <>
    <div>
      <div onClick={()=>setShowBigImage(true)} className="singleProd__mainImg-wrapper">
        <img loading="lazy" src={image} alt="bigImage" />
      </div>
      <div className="singleProd__images-list">
        <SingleImage image={mainImage} setImage={setImage} />
        {additionImages.map((img, index) => (
          <SingleImage image={img} key={index} setImage={setImage} />
        ))}
      </div>
    </div>
    {showBigImage &&
    <ImgModal setShowBigImage={setShowBigImage} additionImages={additionImages.concat(mainImage)} img={image} />
    }
    </>
  );
};

export default Images;
