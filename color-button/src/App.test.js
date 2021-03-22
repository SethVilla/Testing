import { render, screen } from '@testing-library/react';
import App from './App';

test('button has a correct initial color', () => {
  render(<App/>)
  screen.getByRole('button', {name: 'Change to blue'})
  expect(colorButton).toHaveStyle({backgroundColor: 'red'})
})

test('button turns blue when clicked', () => {

})










// test('renders learn react link', () => {

//   // create virtual dom
//   render(<App />);

//   // access virtual dom getByText uses regex
//   const linkElement = screen.getByRole('link', {name: /learn react/i});

//   //jest global assertion expect
//   // argument is what is being asserted
//   //.toBe is a matcher 
//   // matcher argument refines match
//   expect(linkElement).toBeInTheDocument();
// });
