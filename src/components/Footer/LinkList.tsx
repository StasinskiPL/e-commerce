import { Link } from "react-router-dom";
import { FooterLinksList, LinkInterface } from "./footerLinkList";

interface Props {
  links: FooterLinksList;
}

const LinkList: React.FC<Props> = ({ links }) => (
  <ul className="footer__links">
    <h3 className="footer__links-title">{links.name}</h3>
    {links.links.map((link, index) => (
      <SingleLink key={index} name={link.name} link={link.link} />
    ))}
  </ul>
);

const SingleLink: React.FC<LinkInterface> = ({ link, name }) => (
  <li className="footer__link">
    <Link to={link}>{name}</Link>
  </li>
);

export default LinkList;
