import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// ////////////////////////////////////////////////////////////////////////////////////

export type AuthNavigatorParamsList = {
  LogIn: undefined;
  SignUp: undefined;
};

export interface ILogIn {
  navigation: StackNavigationProp<AuthNavigatorParamsList, 'LogIn'>;
}
export interface ISignUp {
  navigation: StackNavigationProp<AuthNavigatorParamsList, 'SignUp'>;
}

// ////////////////////////////////////////////////////////////////////////////////////

export type BottomNavigatorParamsList = {
  Home: undefined;
  AddMovie: undefined;
  Settings: undefined;
};

export interface IHome {
  navigation: StackNavigationProp<BottomNavigatorParamsList, 'Home'>;
}

export interface IAddMovie {
  navigation: StackNavigationProp<BottomNavigatorParamsList, 'AddMovie'>;
}

export interface ISettings {
  navigation: StackNavigationProp<BottomNavigatorParamsList, 'Settings'>;
}

// ////////////////////////////////////////////////////////////////////////////////////

export type StackNavigatorParamsList = {
  Main: undefined;
  MovieDetails: {id: number};
};

export interface IMain {
  navigation: StackNavigationProp<StackNavigatorParamsList, 'Main'>;
}

export interface IMovieDetails {
  navigation: StackNavigationProp<StackNavigatorParamsList, 'MovieDetails'>;
  route: RouteProp<StackNavigatorParamsList, 'MovieDetails'>;
}
