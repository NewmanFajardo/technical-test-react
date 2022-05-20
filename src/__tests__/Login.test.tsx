import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react/pure';
import { Provider } from 'react-redux';
import Login from '../pages/Login/Login';
import store from '../redux/store';
import { axiosMock } from '../__mocks__/axios.mock';
import { mortyMock } from '../__mocks__/morty.mock';

jest.mock('axios');

describe('Login', () => {
  const mockedAxios = axiosMock;
  mockedAxios.get.mockResolvedValue({ data: mortyMock });
  afterEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('renders Logic component', async () => {
    const component = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(component).toBeTruthy;
  });

  it('has to call the login endpoint and update the store', async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const button = screen.getByRole('button', { name: 'Login' });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
      expect(screen.getByText('{"name":"Morty Smith","gender":"Male","status":"Alive"}'));
    });
  });
});
