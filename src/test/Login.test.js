import { Login, validateEmail } from "../components/Login";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

configure({ adapter: new Adapter() });

describe("running test cases in login page", () => {
  it("form in login", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists(".auth-form-container")).toEqual(true);
  });

  test("render the login form submit button on the screen", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(3);
  });

  test("should be failed on email validation ", () => {
    const testEmail = "ishvinder.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });

  test("email input field should accept email ", () => {
    render(<Login />);
    const email = screen.getByTestId("email");
    userEvent.type(email, "ishvinder");
    expect(email.value).not.toMatch("ishvinder.singh@gmail.com");
  });

  test("passport input should have type password ", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("*********");
    expect(password).toHaveAttribute("type", "password");
  });

  test("should display alert if error", async () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter your Email Id");
    const password = screen.getByPlaceholderText("*********");
    const buttonList = screen.getAllByRole("button");

    userEvent.type(email, "");
    userEvent.type(password, "123456");
    await userEvent.click(buttonList[0]);
    const error = screen.getByText("Email is not valid");
    expect(error).toBeInTheDocument();
  });

  test("should be able to reset the form ", () => {
    render(<Login />);
    const resetBtn = screen.getByTestId("reset");
    const emailInputNode = screen.getByLabelText("Username/Email");
    const passwordInputNode = screen.getByLabelText("Password");
    fireEvent.click(resetBtn);
    expect(emailInputNode.value).toMatch("");
    expect(passwordInputNode.value).toMatch("");
  });

  test("should be able to submit the form", async () => {
    render(<Login />);
    const email = screen.getByPlaceholderText("Enter your Email Id");
    const password = screen.getByPlaceholderText("*********");
    const btnList = screen.getAllByRole("button");

    await userEvent.type(email, "ishvinder133@gmail.com");
    await userEvent.type(password, "123456");
    await userEvent.click(btnList[0]);

    const user = screen.getByText("ishvinder133@gmail.com ");
    expect(user).toBeInTheDocument();
  });
});
