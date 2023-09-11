import axios from 'axios';
import {API, baseUrl} from '../../constants';

class UserService {
  async userSignUp(
    email: string,
    name: string,
    password: string,
    confirmPassword: string,
  ) {
    const config = {
      method: 'post',
      url: `${baseUrl}${API}users`,
      headers: {'Content-Type': 'application/json'},
      data: {email, name, password, confirmPassword},
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }

  async userSignIn(email: string, password: string) {
    const config = {
      method: 'post',
      url: `${baseUrl}${API}sessions`,
      headers: {'Content-Type': 'application/json'},
      data: {email, password},
    };

    return axios
      .request(config)
      .then(response => response)
      .catch(error => {
        console.log(error);
      });
  }
}

export const userService = new UserService();
