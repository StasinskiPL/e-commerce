import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";

enum Nav {
  prev,
  next,
}

interface Props {
  setShowBigImage: React.Dispatch<React.SetStateAction<boolean>>;
  img: string;
  additionImages: string[];
}

const ImgModal: React.FC<Props> = ({
  setShowBigImage,
  img,
  additionImages,
}) => {
  const [activImage, setActiveImage] = useState<string>(img);

  const clickHandler = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    nav: Nav
  ) => {
    e.stopPropagation();
    const imgIndex = additionImages.findIndex((img) => img === activImage);
    if (nav === Nav.prev) {
      if (imgIndex === 0) {
        setActiveImage(additionImages[additionImages.length - 1]);
      } else {
        setActiveImage(additionImages[imgIndex - 1]);
      }
    } else {
      if (imgIndex === additionImages.length - 1) {
        setActiveImage(additionImages[0]);
      } else {
        setActiveImage(additionImages[imgIndex + 1]);
      }
    }
  };

  return (
    <div className="bigImage" onClick={() => setShowBigImage(false)}>
      <div className="bigImage-inner">
        <div className="bigImage-imgWrapper">
          <img
            src={activImage}
            alt="product"
            onClick={(e) => e.stopPropagation()}
          ></img>
          <FaArrowLeft
            onClick={(e) => clickHandler(e, Nav.prev)}
            className="bigImage-imgWrapper-icon left"
          />
          <FaArrowRight
            onClick={(e) => clickHandler(e, Nav.next)}
            className="bigImage-imgWrapper-icon right"
          />
        </div>
      </div>
    </div>
  );
};

export default ImgModal;
