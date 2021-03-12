import footerLinksList from "./footerLinkList";
import LinkList from "./LinkList";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner">
        {footerLinksList.map((footerLinks, index) => (
          <LinkList
            data-testid="footer-links-list"
            links={footerLinks}
            key={index}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;
