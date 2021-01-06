import React from "react";

interface Props {
  image: string;
  setImage: (a: string) => void;
}

const SingleImage: React.FC<Props> = ({ image, setImage }) => {
  const clickHandler = () => {
    setImage(image);
  };
  return (
    <div className="singleProd__smallImg-Wrapper" onClick={clickHandler}>
      <img loading="lazy" src={image} alt="additionImage" />
    </div>
  );
};

export default SingleImage;
