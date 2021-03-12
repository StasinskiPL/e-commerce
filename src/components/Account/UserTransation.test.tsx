import UserTransation from "./UserTransation";
import Enzyme, { shallow, ShallowWrapper } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React, { Component, useState } from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("<UserTransation/>", () => {
  let wrapper: ShallowWrapper<any, Readonly<{}>, Component<{}, {}, any>>;
  beforeEach(() => {
    wrapper = shallow(
      <UserTransation
        transation={{
          date: "10.10.2020",
          products: [
            { total: 1, amount: 2, name: "a", id: "1" },
            { total: 1, amount: 2, name: "b", id: "2" },
          ],
        }}
      />
    );
  });

  it("render correctly", () => {
    expect(wrapper).toBeTruthy();
  });

  it("render date correctly", () => {
    const text = wrapper.find(".transation-date");
    expect(text).toBeTruthy();

    expect(text.text()).toBe("10.10.2020");
  });

  it("render total price", () => {
    const text = wrapper.find(".transation-total");
    expect(text).toBeTruthy();

    expect(text.text()).toBe("2$");
  });

  it("have 3 table headers", () => {
    expect(wrapper.find("th").length).toBe(3);
  });
});
