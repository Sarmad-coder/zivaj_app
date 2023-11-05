import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';


const showToast = (type, text) => {
    Toast.show({
        type: type,
        text1: text,
    });
}



const openWhatsApp = async (phoneNumber, premium) => {

    if (premium) {

        const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

        try {
            await Linking.openURL(whatsappUrl);
        } catch (error) {
            showToast('error', "WhatsApp is not installed on this device.")
            console.log(error);
        }

    }
    else{
        showToast('error', "Buy Package to access.")
    }

};









export default openWhatsApp