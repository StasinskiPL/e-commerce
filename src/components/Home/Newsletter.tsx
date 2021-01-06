import {Link} from "react-router-dom";
const Newsletter = () => {
    return (
        <article className="home__newsletter">
            <div className="home__newsletter-inner">
                <Link to="/">
                    <h1>NEWSLETTER</h1>
                </Link>
                
            </div>
        </article>
    )
}

export default Newsletter
