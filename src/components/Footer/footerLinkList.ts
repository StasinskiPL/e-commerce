export interface LinkInterface {
  name: string;
  link: string;
}
export interface FooterLinksList {
  name: string;
  links: LinkInterface[];
}

export const getToKnowLinks: LinkInterface[] = [
  { name: "Blog", link: "/" },
  { name: "About", link: "/" },
  { name: "Careers", link: "/" },
];

export const adminLinks: LinkInterface[] = [
  { name: "Add Product", link: "/admin" },
];

const footerLinksList: FooterLinksList[] = [
  { name: "Get To Know", links: getToKnowLinks },
  { name: "Admin", links: adminLinks },
];

export default footerLinksList;
