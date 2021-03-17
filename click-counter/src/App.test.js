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
  const wrapper = setup();
  //find 
  //https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/find.html
    const appComponent = findByTestAttr(wrapper, 'component-app')
    expect(appComponent.length).toBe(1);
});

test("renders button", ()=>{
  const wrapper = setup();
  const incrementButton = findByTestAttr(wrapper,'increment-button')
  expect(incrementButton.length).toBe(1);
});

test("renders counter display", ()=>{
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display')
  expect(counterDisplay.length).toBe(1);
});

test("counters starts 0", ()=>{
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe('0');


});

test("clicking on button increments counter display", ()=>{
  const wrapper = setup();

  // simulate event on the root node
  const button = findByTestAttr(wrapper, 'increment-button' )
  button.simulate('click')
  const count = findByTestAttr(wrapper, 'count').text()
  expect(count).toBe('1')
})

test("clicking on the decrement button decreases the counter display", () => {
  const wrapper = setup();
  const buttonIncrement  = findByTestAttr(wrapper, 'increment-button');

  buttonIncrement.simulate('click')
  buttonIncrement.simulate('click')
  const count = findByTestAttr(wrapper, 'count').text()
  const button  = findByTestAttr(wrapper, 'decrement-button');
  button.simulate('click')
  expect(count).toBe('1')
})

// describe and it to explain test case 

describe("error is shown when state value is 0", ()=>{
  test("error does not show when not needed", ()=>{
    const wrapper = setup();
    const decButton = findByTestAttr(wrapper, 'decrement-button')
    decButton.simulate('click')
    const errorMessage = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage).toBeTruthy();
  })
})

describe("counter is 0 and decrement is clicked", () => {
  // using a describe here so I can use a beforeEach for shared setup

  // scoping wrapper to the describe, so it can be used in Before Each and the tests
  let wrapper;
  beforeEach(() => {

    wrapper = setup();

    const button = findByTestAttr(wrapper, 'decrement-button');
    button.simulate("click");
  })

  test("error shows", () => {
    const errorMsg = findByTestAttr(wrapper, "error-message");
    expect(errorMsg).toBeTruthy()
  })

  test("counter still displays 0", () => {
    const count = findByTestAttr(wrapper, "count").text()
    expect(count).toBe('0');
  })

  test("clicking increment clears the error", () => {
    const incButton = findByTestAttr(wrapper, 'increment-button');
    incButton.simulate("click")

    const errorMessage = findByTestAttr(wrapper, 'error-message');
    expect(errorMessage.exists()).toBe(false)
  })


})


