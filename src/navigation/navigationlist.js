import Status from '../components/Status';
// import StatusCheck from '../components/Status/StatusCheck';
import ConnectScreen from '../screens/ConnectScreen';
import PhoneNumber from '../screens/DateOfBirth';
import mainChat from '../screens/mainChat';
import adminChat from '../screens/mainChat/adminChat';
import Otp from '../screens/OTP';
import ProfileFor from '../screens/Profile For';
import ProfileVerification from '../screens/SelfyVarification';
import Splash from '../screens/SignUp';
import Splach1 from '../screens/Splach1';
import UpgradePremium from '../screens/UpgradePremium';
import UploadPicture from '../screens/UploadPicture';
import UserDateBirth from '../screens/User DateBirth';
import UserReligion from '../screens/UserReligion';
import LikedBy from '../Tab Screens/Explore/LikedBy';
import YouLiked from '../Tab Screens/Explore/YouLiked';
import YouPass from '../Tab Screens/Explore/YouPass';
import Home from '../Tab Screens/Home';
import PaymentScreen from '../Tab Screens/Home/PaymentScreen';
import Premium from '../Tab Screens/Home/Premium';
import Reel from '../Tab Screens/Home/Reel';
import StartVideoCall from '../Tab Screens/Home/StartVideoCall';
import { TVideoCall } from '../Tab Screens/Home/TVideoCall';
import VideoCall from '../Tab Screens/Home/VideoCall';
import VideoCapture from '../Tab Screens/Home/VideoCapture';
import VideoRecording from '../Tab Screens/Home/VideoRecording';
import ViewProfile from '../Tab Screens/Home/ViewProfile';
import AdminChat from '../Tab Screens/Profile/AdminChat';
import FeedBack from '../Tab Screens/Profile/FeedBack';
import Help from '../Tab Screens/Profile/Help';
import Prefrence from '../Tab Screens/Profile/Prefrence';
import UpdateProfile from '../Tab Screens/Profile/UpdateProfile';
import TabNav from './tabNav';



export const stackNavigationList = [
  // {name: 'Splach1', component: UploadPicture},
  {name: 'Splach1', component: Splach1},
  {name: 'splach', component: Splash},
  {name: 'home', component: TabNav},
  {name: 'profileFor', component: ProfileFor},
  {name: 'userDateBirth', component: UserDateBirth},
  {name: 'userReligion', component: UserReligion},
  {name: 'phoneNumber', component: PhoneNumber},
  {name: 'otp', component: Otp},
  {name: 'profileVerification', component: ProfileVerification},
  {name: 'uploadPicture', component: UploadPicture},
  {name: 'status', component: Status},
  // {name: 'statusc', component: StatusCheck},
  {name: 'connectScreen', component: ConnectScreen},
  {name: 'UpgradePremium', component: UpgradePremium},
  {name: 'stripe', component: PaymentScreen},
  {name: 'mainChat', component: mainChat},
  {name: 'updateProfile', component: UpdateProfile},
  {name: 'preferences', component: Prefrence},
  {name: 'viewProfile', component: ViewProfile},
  {name: 'premium', component: Premium},
  // {name: 'videoCall', component: VideoCall},
  // {name: 'tvideoCall', component: TVideoCall},
  {name: 'tvideoCall', component: VideoCall},
  {name: 'startVideoCall', component: StartVideoCall},
  {name: 'youLike', component: YouLiked},
  {name: 'youPass', component: YouPass},
  {name: 'likeBy', component: LikedBy},
  {name: 'help', component: Help},
  {name: 'adminChat', component: AdminChat},
  {name: 'feedBack', component: FeedBack},
  {name: 'reel', component: Reel},
  // {name: 'home', component: Home},
  {name: 'shorts', component: VideoCapture},
  // {name: 'shorts', component: VideoRecording},
  
];
