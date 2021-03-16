import App from './App';
import Enzyme, {shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

//set up Enzyme Adapter
Enzyme.configure({adapter: new Adapter()});

test("renders without error", 
()=>{
  //data tests attribute to target top level component
  // data tests removed during production
  const wrapper = shallow(<App/>);

  //find 
  //https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/find.html
    const appComponent = wrapper.find("[data-test='component-app']")

    expect(appComponent.length).toBe(1);


});

test("renders button", ()=>{

});

test("renders counter display", ()=>{

});

test("counters starts 0", ()=>{

});

test("clicking on button increments counter display", ()=>{

})

