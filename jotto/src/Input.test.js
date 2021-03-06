import React from "react";
import { mount } from "enzyme";

import { checkProps, findByTestAttr } from "../test/testUtils";
import languageContext from "./contexts/languageContext";
import Input from "./Input";
import successContext from "./contexts/successContext";
import guessedWordsContext from './contexts/guessedWordsContext'

const setup = ({ language, secretWord, success }) => {
  language = language || "en";
  secretWord = secretWord || "party";
  success = success || false;
  return mount(
    <guessedWordsContext.GuessedWordsProvider>
    <languageContext.Provider value={language}>
      <successContext.SuccessProvider value={[success, jest.fn()]}>
        <Input secretWord={secretWord} />
      </successContext.SuccessProvider>
    </languageContext.Provider>
    </guessedWordsContext.GuessedWordsProvider>
  );
};

describe("app tests", () => {
  it("app renders without error", () => {
    const wrapper = setup({});
    const component = findByTestAttr(wrapper, "component-input");
    expect(component.length).toBe(1);
  });

  //   it("does not throw warning with expected props", () => {
  //       checkProps(Input, {secretWord: 'party'})
  //   })
});

describe("state controlled input Field", () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
    wrapper = setup({});
  });
  it("state updates with value of input box upon change", () => {
    const inputBox = findByTestAttr(wrapper, "input-box");
    const mockEvent = { target: { value: "train" } };
    inputBox.simulate("change", mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
  });

  it("field is cleared upon submit button clicked", () => {
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
  });
});

describe("language picker", () => {
  let mockSetCurrentGuess = jest.fn();
  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
  });
  it("correctly renders submit string in english", () => {
    const wrapper = setup({ language: "en" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("Submit");
  });

  it("correctly renders congrats string in emoji", () => {
    const wrapper = setup({ language: "emoji" });
    const submitButton = findByTestAttr(wrapper, "submit-button");
    expect(submitButton.text()).toBe("????");
  });
});

describe("success true test", () => {
  let mockSetSuccess = jest.fn();
  beforeEach(() => {
    mockSetSuccess.mockClear();
    //React.useState = jest.fn(() => [false, mockSetSuccess]);
  });
  it("input component does not show when success is true", () => {
    const wrapper = setup({ secretWord: "party", success: true });
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
