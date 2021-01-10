import footerLinksList from "./footerLinkList";
import LinkList from "./LinkList";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {footerLinksList.map((footerLinks, index) => (
          <LinkList links={footerLinks} key={index} />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
