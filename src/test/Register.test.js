import { Register } from "../components/Register";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("running test cases in register page", () => {
  it("form in register", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.exists(".auth-form-container")).toEqual(true);
  });
});
