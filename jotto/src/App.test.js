import React from 'react';
import {findByTestAttr} from '../test/testUtils'
import {mount} from 'enzyme';
import App from './App';
import hookActions from './actions/hookActions'

const mockGetSecretWord = jest.fn();

const setup = (secretWord = "party") => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;
  const mockUseReducer = jest.fn().mockReturnValue([
    {secretWord},
    jest.fn()
  ])

  React.useReducer = mockUseReducer;
  // use effect not returned on shallow
  return mount(<App/>)
}

describe('app tests', () => {
  it("app renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-app');
    console.log(component.exists())
    expect(component.length).toBe(1);
  })
});

describe("getSecretWords calls", () => {
  it("getSecretWord gets called on App mount", () => {
    setup();
    // check to see if word was updated 
    expect(mockGetSecretWord).toHaveBeenCalled();
  })
})

describe("secretWord does not update on app", () => {
  it('secret word does not update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps()
    expect(mockGetSecretWord).not.toHaveBeenCalled();
  })
})

describe("secret word is not null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup('party');
  })

  it("renders app when secret word is not null", () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  })

  it("does not render spinner when secret word is not null", () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  })
} )

describe("secret word is null", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup(null)
  })
  it('does not render app when when secret word is null', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(false)
  })

  it('render spinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttr(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  })
})
