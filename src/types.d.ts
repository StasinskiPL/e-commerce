export interface Product {
  name: string;
  description: string;
  category: string;
  mainImage: string;
  price: number;
  additionalImages: string[];
  _id?: string;
}

export interface ProductProps {
  product: {
    name: string;
    description: string;
    category: string;
    mainImage: string;
    price: number;
    additionalImages: string[];
    _id?: string;
  };
}

export interface RouteComponentProps<
  Params extends { [K in keyof Params]?: string } = {},
  C extends StaticContext = StaticContext,
  S = H.LocationState
> {
  history: H.History;
  location: H.Location<S>;
  match: match<Params>;
  staticContext?: C;
}
