// example.test.js is configurable but by default testing looks for .test.js 

// no need to use testing library
// import { render, screen } from '@testing-library/react';
import App from './App';

// to Configure
import Enzyme, {shallow} from 'enzyme'
// adaptor to expect code
import EnzymeAdapter from 'enzyme-adapter-react-16.1'

//configure new instance of adaptor
Enzyme.configure({adapter: new EnzymeAdapter()})

// example of Jest Test
// Tests
// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   // expect assertions
//   expect(linkElement).toBeInTheDocument();
// });

//Enzyme creates a virtual dom

// shallow rendering only renders parent level component but not react children components / places placeholders

// mount will render Parent and all children  components

test('renders without crashing', () => {

  // render app fails if it can't load
  const wrapper = shallow(< App/>)

  //console.log(wrapper.debug())
  const header = wrapper.find('[data-test="app-header-text"]')

  // expect api throws error if test faild
  expect (header).toBeTruthy();
  // expect(header.length).toBe(1)
})