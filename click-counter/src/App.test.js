import App from './App';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//set up Enzyme Adapter
Enzyme.configure({adapter: new Adapter()});

/**
 * Factory function to create a Shallow Wrapper for the app component
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => shallow(<App/>);

// save from remembering Enzyme data type
const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test='${val}']`);

test("renders without error", 
()=>{
  //data tests attribute to target top level component
  // data tests removed during production
  const wrapper = shallow(<App/>);
  //find 
  //https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/find.html
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1);
});

test("renders button", ()=>{
  const wrapper = shallow(<App/>);
  const incrementButton = wrapper.find("[data-test='increment-button']")
  expect(incrementButton.length).toBe(1);
});

test("renders counter display", ()=>{
  const wrapper = shallow(<App/>);
  const counterDisplay = wrapper.find("[data-test='counter-display']")
  expect(counterDisplay.length).toBe(1);
});

test("counters starts 0", ()=>{

});

test("clicking on button increments counter display", ()=>{

})

