import {
  render,
  screen,
  fireEvent,
  waitFor,
  act
} from '@testing-library/react-native';

import { SignInForm } from '../components/SignIn';

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

     
      await render(
        <SignInForm onSubmit={onSubmit} />
      );

      
      await act(async () => {
        fireEvent.changeText(screen.getByTestId('usernameInput'), 'kalle');
      });

      await act(async () => {
        fireEvent.changeText(screen.getByTestId('passwordInput'), 'password');
      });

      await act(async () => {
        fireEvent.press(screen.getByTestId('submitButton'));
      });

     
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});