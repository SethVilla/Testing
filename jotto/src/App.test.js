import React from 'react';
import {shallow} from 'enzyme';
import {findByTestAttr} from '../test/testUtils'
import { render, screen } from '@testing-library/react';
import App from './App';

const setup = () => {
  return shallow(<App/>)
}

describe('app tests', () => {
  it("app renders without error", () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-app');
    expect(component.length).toBe(1);
  })
});
