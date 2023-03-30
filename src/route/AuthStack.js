import { createStackNavigator } from 'react-navigation-stack'
import LoadingScreen from '../main/AuthStack/LoadingScreen';
import LoginScreen from '../main/AuthStack/LoginScreen';
import LocationRequired from '../main/ErrorPages/LocationRequired';
import SomethingWentWrong from '../main/ErrorPages/SomethingWentWrong';
import NotAvailableArea from '../main/ErrorPages/NotAvailableArea';
import UpdateRequired from '../main/ErrorPages/UpdateRequired';
import SignUp from '../main/AuthStack/Register/SignUp';
import EmailValidate from '../main/AuthStack/Register/EmailValidate';
import ForgotPassword from '../main/AuthStack/Register/ForgotPassword';
import CreateProfile from '../main/AuthStack/Register/CreateProfile';
import AgreeTermServices from '../main/AuthStack/Register/AgreeTermServices';

export default AuthStack = createStackNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  SignUp: SignUp,
  EmailValidate: EmailValidate,
  CreateProfile: CreateProfile,
  AgreeTermServices: AgreeTermServices,
  ForgotPassword: ForgotPassword,
  LocationReq: LocationRequired,
  SomethingWentWrong: SomethingWentWrong,
  NotAvailableArea: NotAvailableArea,
  UpdateRequired: UpdateRequired,
}, {
  headerMode: 'none',
})