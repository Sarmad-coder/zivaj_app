import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';


const showToast = (type, text) => {
    Toast.show({
        type: type,
        text1: text,
    });
}



const openDialPad = async (phoneNumber,premium) => {

    if (premium) {
        const dialPadUrl = `tel:${phoneNumber}`;

        try {
            await Linking.openURL(dialPadUrl);
        } catch (error) {
            showToast('error', "Failed to open the dial pad.");
        }
    }
    else {
        showToast('error', "Buy Package to access.")
    }


};










export default openDialPad