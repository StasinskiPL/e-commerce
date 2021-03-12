import Footer from "../components/Footer/Footer";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("footer", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it("render link wrapper", () => {
    expect(wrapper.find("div")).toBeTruthy();
  });
});
