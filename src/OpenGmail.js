import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';


const showToast = (type, text) => {
    Toast.show({
        type: type,
        text1: text,
    });
}



const openGmail = async (emailAddress,premium) => {

    if (premium) {
        const gmailUrl = `mailto:${emailAddress}`;

        try {
            await Linking.openURL(gmailUrl);
        } catch (error) {
            showToast('error', "Failed to open Gmail.");
            console.log(error);
        }
    }
    else {
        showToast('error', "Buy Package to access.")
    }
};







export default openGmail