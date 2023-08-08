import { render, screen } from '@testing-library/react';
import Home from '../home';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const ButtonElement = screen.getByText(/To User Page/i);
    expect(ButtonElement).toBeInTheDocument();
  });
});
