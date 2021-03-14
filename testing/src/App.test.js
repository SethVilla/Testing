// example.test.js is configurable but by default testing looks for .test.js 

import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme, {shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16.1'

Enzyme.configure({adapter: new EnzymeAdapter()})

// example of Jest Test
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  // expect assertions
  expect(linkElement).toBeInTheDocument();
});

//Enzyme creates a virtual dom

// shallow rendering only renders parent level component but not react children components / places placeholders

// mount will render Parent and all children  components

test('renders without crashing', () => {
  const wrapper = shallow(< App/>)
  const header = wrapper.find('[data-test="app-header-text"]')
  expect(header.length).toBe(1)
  expect()
})