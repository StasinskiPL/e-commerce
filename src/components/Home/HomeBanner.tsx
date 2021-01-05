import BannerImg from "../../assets/Images/baner.webp";
import {Link} from "react-router-dom";
const HomeBanner = () => {
    return (
        <div className="home__banner">
        <Link to="/">
            <img src={BannerImg} alt="banner"/>
        </Link>
        </div>
    )
}

export default HomeBanner
