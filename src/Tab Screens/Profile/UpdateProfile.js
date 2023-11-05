import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Animated,
  TextInput,
  Dimensions
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

// import ImageCropPicker from 'react-native-image-crop-picker';
import ProgressCircle from 'react-native-progress-circle';
// icons libraries
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import MainBtn from '../../components/MainBtn';
import Color from '../../components/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import api_url from '../../../ApiUrl';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import MyLoader from '../../components/MyLoader';

const { width, height } = Dimensions.get('window')


const UpdateProfile = ({ navigation }) => {





  const [firstName, setfirstName] = useState(null)
  const [lastName, setlastName] = useState(null)
  const [gender, setgender] = useState(null)
  const [about, setabout] = useState(null)
  const [religion, setReligion] = useState(null)
  const [tongue, setTongue] = useState(null)
  const [community, setCommunity] = useState(null)
  const [subCommunity, setsubCommunity] = useState(null)
  const [fatherStatus, setfatherStatus] = useState(null)
  const [witha, setwitha] = useState(null)
  const [as, setas] = useState(null)
  const [motherStatus, setmotherStatus] = useState(null)
  const [natureOfBusiness, setnatureOfBusiness] = useState(null)
  const [brothers, setbrothers] = useState(null)
  const [sisters, setsisters] = useState(null)
  const [familyAffluences, setfamilyAffluences] = useState(null)
  const [country, setcountry] = useState(null)
  const [state, setstate] = useState(null)
  const [city, setcity] = useState(null)
  const [residency, setresidency] = useState(null)
  const [zipCode, setzipCode] = useState(null)
  const [grewUp, setgrewUp] = useState(null)
  const [qualification, setqualification] = useState(null)
  const [college, setcollege] = useState(null)
  const [workingWith, setworkingWith] = useState(null)
  const [workingAs, setworkingAs] = useState(null)
  const [annualIncome, setannualIncome] = useState(null)
  const [employerName, setemployerName] = useState(null)
  const [diet, setdiet] = useState(null)
  const [height, setheight] = useState(null)
  const [maritalStatus, setmaritalStatus] = useState(null)
  const [vimage1, setVImage1] = useState(null)
  const [vimage2, setVImage2] = useState(null)
  const [vimage3, setVImage3] = useState(null)
  const [vimage4, setVImage4] = useState(null)
  const [vimage5, setVImage5] = useState(null)
  const [vimage6, setVImage6] = useState(null)
  const [vimage7, setVImage7] = useState(null)






  const showToast = (type, text) => {
    Toast.show({
      type: type,
      text1: text,
    });
  }


  const [imageupload, setImageUpload] = useState([]);



  const [allUser, setAllUser] = useState([])


  useFocusEffect(
    React.useCallback(() => {
      functionGet();
      // setTimeout(() => {
      //   functionGet();
      // }, 2000);
    }, [])
  )



  const functionGet = async () => {
    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    axios.get(`${api_url}/users/my/${userId}`)

      .then(res => {
        console.log(res.data)
        setAllUser(res.data?.data)



      })

  }



  const [imageURI, setImageURI] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImageURI(result.uri);
    }
  };






  const [image1, setImage1] = useState(null)

  const pickImage1 = async () => {

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage1(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image2, setImage2] = useState(null)

  const pickImage2 = async () => {


    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage2(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image3, setImage3] = useState(null)

  const pickImage3 = async () => {

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage3(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });

  };

  const [image4, setImage4] = useState(null)

  const pickImage4 = async () => {

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage4(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image5, setImage5] = useState(null)

  const pickImage5 = async () => {


    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage5(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });


  };

  const [image6, setImage6] = useState(null)

  const pickImage6 = async () => {

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage6(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });



  };

  const [image7, setImage7] = useState(null)

  const pickImage7 = async () => {


    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(result => {

      setImage7(result.path);

      const obj = {
        name: result.path.split('/')[result.path.split('/').length - 1],
        uri: result?.path, type: result?.mime,
      };
      setImageUpload(prev => [...prev, obj])

    });



  };




  const [selectRadio, setSelectRadio] = useState(0);



  const submit = async () => {

    setVisible(true)

    const userId = JSON.parse(await AsyncStorage.getItem("mainuserId"))
    console.log(userId, '--------------------------------')



    const param = new FormData()
    if (firstName !== null) {
      param.append('firstName', firstName)
    }
    if (lastName !== null) {
      param.append('lastName', lastName)
    }
    if (about !== null) {
      param.append('about', about)
    }
    if (religion !== null) {
      param.append('religion', religion)
    }
    if (tongue !== null) {
      param.append('tongue', tongue)
    }
    if (community !== null) {
      param.append('community', community)
    }
    if (subCommunity !== null) {
      param.append('subCommunity', subCommunity)
    }
    if (fatherStatus !== null) {
      param.append('fatherStatus', fatherStatus)
    }
    if (witha !== null) {
      param.append('with', witha)
    }
    if (as !== null) {
      param.append('as', as)
    }
    if (motherStatus !== null) {
      param.append('motherStatus', motherStatus)
    }
    if (natureOfBusiness !== null) {
      param.append('natureOfBusiness', natureOfBusiness)
    }
    if (brothers !== null) {
      param.append('brothers', brothers)
    }
    if (sisters !== null) {
      param.append('sisters', sisters)
    }
    if (familyAffluences !== null) {
      param.append('familyAffluences', familyAffluences)
    }
    if (country !== null) {
      param.append('country', country)
    }
    if (state !== null) {
      param.append('state', state)
    }
    if (city !== null) {
      param.append('city', city)
    }
    if (residency !== null) {
      param.append('residency', residency)
    }
    if (zipCode !== null) {
      param.append('zipCode', zipCode)
    }
    if (grewUp !== null) {
      param.append('grewUp', grewUp)
    }
    if (qualification !== null) {
      param.append('qualification', qualification)
    }
    if (college !== null) {
      param.append('college', college)
    }
    if (workingWith !== null) {
      param.append('workingWith', workingWith)
    }
    if (workingAs !== null) {
      param.append('workingAs', workingAs)
    }
    if (annualIncome !== null) {
      param.append('annualIncome', annualIncome)
    }
    if (employerName !== null) {
      param.append('employerName', employerName)
    }
    if (diet !== null) {
      param.append('diet', diet)
    }
    if (height !== null) {
      param.append('height', height)
    }
    if (maritalStatus !== null) {
      param.append('maritalStatus', maritalStatus)
    }

    if (image1 !== null) {
      param.append('image1', {
        uri: image1,
        type: 'image/jpeg',
        name: 'image.jpg',
      })
    }
    if (image2 !== null) {
      param.append('image2', {
        uri: image2,
        type: 'image/jpeg',
        name: 'image.jpg',
      })
    }
    if (image3 !== null) {
      param.append('image3', {
        uri: image3,
        type: 'image/jpeg',
        name: 'image.jpg',
      })
    }
    if (image4 !== null) {
      param.append('image4', {
        uri: image4,
        type: 'image/jpeg',
        name: 'image.jpg',
      })
    }
    if (image5 !== null) {
      param.append('image5', {
        uri: image5,
        type: 'image/jpeg',
        name: 'image.jpg',
      })
    }
    if (image6 !== null) {
      param.append('image6', {
        uri: image6,
        type: 'image/jpeg',
        name: 'image.jpg',
      })
    }
    if (image7 !== null) {
      param.append('image7', {
        uri: image7,
        type: 'image/jpeg',
        name: 'image.jpg',
      })
    }




    // console.log(param._parts.length)


    // const param = {
    //   'firstName': firstName,
    //   'lastName': lastName,
    //   'about': about,
    //   'religion': religion,
    //   'tongue': tongue,
    //   'community': community,
    //   'subCommunity': subCommunity,
    //   'fatherStatus': fatherStatus,
    //   'with': witha,
    //   'as': as,
    //   'motherStatus': motherStatus,
    //   'natureOfBusiness': natureOfBusiness,
    //   'brothers': brothers,
    //   'sisters': sisters,
    //   'familyAffluences': familyAffluences,
    //   'country': country,
    //   'state': state,
    //   'city': city,
    //   'residency': residency,
    //   'zipCode': zipCode,
    //   'grewUp': grewUp,
    //   'qualification': qualification,
    //   'college': college,
    //   'workingWith': workingWith,
    //   'workingAs': workingAs,
    //   'annualIncome': annualIncome,
    //   'employerName': employerName,
    //   'diet': diet,
    //   'height': height,
    //   'maritalStatus': maritalStatus,
    // }


    console.log(param)




    fetch(`${api_url}/users/update/${userId}`, {
      method: 'PUT',
      // headers: {
      //   // 'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      //   // 'Content-Type': 'multipart/form-data',
      // },
      body: param._parts.length === 0 ? '' : param,
    }).then(response => response.json()).then(data => {
      console.log(data)
      if (data.status === 'ok') {
        showToast('success', 'Users Updated.');
        // storeId(data?.data?.id)
        navigation.navigate(`home`);
        setVisible(false)

      } else if (data.status === 'fail') {
        showToast('error', data?.message)
        setVisible(false)
      }
    }).catch(err => {
      console.log(err)
      setVisible(false)
    })




    // }



  }



  const [visible, setVisible] = useState(false);




  return (
    <View style={{
      width: '100%',
      height: '100%',

    }}>

      {visible ? <MyLoader top='45%' /> : null}

      <View style={styles.topContainer}>
        <View style={{ flexDirection: 'row' }}>

          <Text style={styles.HeadingM}>My Profile</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <MaterialCommunityIcons
              name="message-text-outline"
              size={20}
              color={'white'}
            />
          </TouchableOpacity>
          {/* <Feather
            style={{ paddingLeft: 10 }}
            name="align-right"
            size={20}
            color={'white'}
          /> */}
        </View>
      </View>



      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'white',

        }}>

        <View
          style={{
            backgroundColor: 'white',
            // height: height * .4,
            height: 300,
            width: width * 1,
            paddingHorizontal: 10
          }}>

          <Text style={{ fontSize: 16, color: "black" }}>My Photos</Text>


          <View style={{ flexDirection: 'row', alignItems: 'center', height: 200, justifyContent: 'space-between', width: '100%', }}>
            <View style={{
              width: width * .64,
              height: '100%',
            }}>
              <TouchableOpacity onPress={pickImage1}
                style={{
                  width: '100%',
                  height: 200,
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'black',
                  backgroundColor: '#eee',
                  overflow: 'hidden',
                  backgroundColor: 'white',

                }}>
                {image1 ? <Image source={{ uri: image1 }} style={{
                  width: '100%',
                  height: '100%',
                }} /> :
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: "#eee"
                    }}
                    source={{ uri: allUser?.image1 }}
                  />}

              </TouchableOpacity>
              <View>

              </View>

            </View>
            <View style={{ justifyContent: "space-between" }}>
              <TouchableOpacity onPress={pickImage2}
                style={{
                  width: width * .3,
                  height: 100,
                  alignSelf: 'center',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'black',
                  backgroundColor: '#eee',
                  overflow: 'hidden'
                }}>
                {image2 ? <Image source={{ uri: image2 }} style={{
                  width: '100%',
                  height: '100%',
                }} /> :
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{ uri: allUser?.image2 }}
                  />}
              </TouchableOpacity>
              <TouchableOpacity onPress={pickImage3}
                style={{
                  width: width * .3,
                  height: 100,
                  alignSelf: 'center',
                  borderRadius: 15,
                  borderWidth: 1,
                  borderColor: 'black',
                  top: 5,
                  backgroundColor: '#eee',
                  overflow: 'hidden'
                }}>
                {image3 ? <Image source={{ uri: image3 }} style={{
                  width: '100%',
                  height: '100%',
                }} /> :
                  <Image
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    source={{ uri: allUser?.image3 }}
                  />}

              </TouchableOpacity>

            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginTop: 2 }}>
            <TouchableOpacity onPress={pickImage4}
              style={{
                width: width * 0.20,
                height: 100,
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#eee',
                overflow: 'hidden'
              }}>
              {image4 ? <Image source={{ uri: image4 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: allUser?.image4 }}
                />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage5}
              style={{
                width: width * 0.23,
                height: 100,
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#eee',
                overflow: 'hidden'
              }}>
              {image5 ? <Image source={{ uri: image5 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: allUser?.image5 }}
                />}
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage6}
              style={{
                width: width * 0.23,
                height: 100,
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#eee',
                overflow: 'hidden'
              }}>
              {image6 ? <Image source={{ uri: image6 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: allUser?.image6 }}
                />}
            </TouchableOpacity>

            <TouchableOpacity onPress={pickImage7}
              style={{
                width: width * 0.27,
                height: 95,
                alignSelf: 'center',
                borderRadius: 15,
                borderWidth: 1,
                borderColor: 'black',
                backgroundColor: '#eee',
                overflow: 'hidden'
              }}>
              {image7 ? <Image source={{ uri: image7 }} style={{
                width: '100%',
                height: '100%',
              }} /> :
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{ uri: allUser?.image7 }}
                />}
            </TouchableOpacity>

          </View>


          <View >

            <Text
              style={[
                styles.headerSubTxt,
                { fontSize: responsiveFontSize(1.5), marginTop: 5, alignSelf: 'flex-end', paddingHorizontal: 20 },
              ]}>
              Pick some photos that show the real you.
            </Text>
          </View>





        </View>



        {/* basic info */}

        <View style={{ marginTop: 50 }}>

          <View style={styles.topContainer}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.Heading}>Basic Info</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              <Feather
                style={{ paddingLeft: 10 }}
                name="edit"
                size={20}
                color={'white'}
              />
            </View>
          </View>

          {/* basic info field */}

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>First Name</Text>
            <TextInput
              onChangeText={(value) => setfirstName(value)}
              defaultValue={allUser?.firstName}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 10,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500',
                color: "black"
              }}
            />

          </View>





          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Last Name</Text>
            <TextInput
              onChangeText={(value) => setlastName(value)}
              defaultValue={allUser?.lastName}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>





          {/* <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Phone Number</Text>
            <TextInput
              onChangeText={(value) => setphoneNumber(value)}
              defaultValue={allUser?.phoneNumber}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View> */}



          {/* <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Gender</Text>
           
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <TouchableOpacity

                onPress={() => {
                  setSelectRadio(1)
                  setgender('male')

                }}
                style={{
                  backgroundColor: 'white',
                  padding: 12,
                  flexDirection: 'row',
                  gap: 8,
                  borderRadius: 10,
                  marginBottom: 18,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                  <Text style={{ color: 'gray', fontSize: 14, marginLeft: 5 }}>
                    Male
                  </Text>
                </View>

                <View style={{}}>
                  <View style={{
                    height: 16,
                    width: 16,
                    borderColor: 'red',
                    borderWidth: 2,
                    borderRadius: 18,
                  }}>
                    {selectRadio === 1 ? <View style={{
                      backgroundColor: 'red',
                      height: 6,
                      height: 6,
                      borderRadius: 20,
                      margin: 3,
                    }}></View> : null}
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity

                onPress={() => {
                  setSelectRadio(2)
                  setgender('female')

                }}
                style={{
                  backgroundColor: 'white',
                  padding: 12,
                  flexDirection: 'row',
                  gap: 8,
                  borderRadius: 10,
                  marginBottom: 18,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>


                  <Text style={{ color: 'gray', fontSize: 14, marginLeft: 5 }}>
                    Female
                  </Text>
                </View>

                <View style={{}}>
                  <View style={{
                    height: 16,
                    width: 16,
                    borderColor: 'red',
                    borderWidth: 2,
                    borderRadius: 18,
                  }}>
                    {selectRadio === 2 ? <View style={{
                      backgroundColor: 'red',
                      height: 6,
                      height: 6,
                      borderRadius: 20,
                      margin: 3,
                    }}></View> : null}
                  </View>
                </View>
              </TouchableOpacity>

            </View>

          </View> */}

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Height</Text>
            <TextInput
              onChangeText={(value) => setheight(value)}
              defaultValue={allUser?.height}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Marital Status</Text>
            <TextInput
              onChangeText={(value) => setmaritalStatus(value)}
              defaultValue={allUser?.maritalStatus}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>

        </View>



        {/* more about */}

        <View style={{ marginTop: 20 }}>

          <View style={[styles.topContainer]}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.Heading}>More about myself, partner and family</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              <Feather
                style={{}}
                name="edit"
                size={20}
                color={'white'}
              />
            </View>
          </View>

          {/* basic info field */}

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              onChangeText={(value) => setabout(value)}
              defaultValue={allUser?.about}
              placeholder='About'
              placeholderTextColor='gray'
              multiline
              style={{
                margin: 10,
                width: '90%',
                height: 150,
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"

              }}
            />

          </View>


        </View>





        {/* more religious */}

        <View style={{ marginTop: 20 }}>

          <View style={[styles.topContainer]}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.Heading}>Religious Background</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              <Feather
                style={{}}
                name="edit"
                size={20}
                color={'white'}
              />
            </View>
          </View>

          {/* basic info field */}

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Religion</Text>
            <TextInput
              onChangeText={(value) => setReligion(value)}
              defaultValue={allUser?.religion}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 10,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Mother Tongue</Text>
            <TextInput
              onChangeText={(value) => setTongue(value)}
              defaultValue={allUser?.tongue}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Community</Text>
            <TextInput
              onChangeText={(value) => setCommunity(value)}
              defaultValue={allUser?.community}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Sub Community</Text>
            <TextInput
              onChangeText={(value) => setsubCommunity(value)}
              defaultValue={allUser?.subCommunity}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


        </View>



        {/* more family */}

        <View style={{ marginTop: 20 }}>

          <View style={[styles.topContainer]}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.Heading}>Family</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              <Feather
                style={{}}
                name="edit"
                size={20}
                color={'white'}
              />
            </View>
          </View>

          {/* basic info field */}

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Father Status</Text>
            <TextInput
              onChangeText={(value) => setfatherStatus(value)}
              defaultValue={allUser?.fatherStatus}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 10,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>With</Text>
            <TextInput
              onChangeText={(value) => setwitha(value)}
              defaultValue={allUser?.with}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>As</Text>
            <TextInput
              onChangeText={(value) => setas(value)}
              defaultValue={allUser?.as}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Mother Status</Text>
            <TextInput
              onChangeText={(value) => setmotherStatus(value)}
              defaultValue={allUser?.motherStatus}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Nature of business</Text>
            <TextInput
              onChangeText={(value) => setnatureOfBusiness(value)}
              defaultValue={allUser?.natureOfBusiness}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>No of brothers</Text>
            <TextInput
              onChangeText={(value) => setbrothers(value)}
              defaultValue={allUser?.brothers}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"

              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>No of sisters</Text>
            <TextInput
              onChangeText={(value) => setsisters(value)}
              defaultValue={allUser?.sisters}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Family Addluences</Text>
            <TextInput
              onChangeText={(value) => setfamilyAffluences(value)}
              defaultValue={allUser?.familyAffluences}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


        </View>





        {/* more location */}

        <View style={{ marginTop: 20 }}>

          <View style={[styles.topContainer]}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.Heading}>Location Eduction & Career</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              <Feather
                style={{}}
                name="edit"
                size={20}
                color={'white'}
              />
            </View>
          </View>

          {/* basic info field */}

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Country living in</Text>
            <TextInput
              onChangeText={(value) => setcountry(value)}
              defaultValue={allUser?.country}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 10,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>State living in</Text>
            <TextInput
              onChangeText={(value) => setstate(value)}
              defaultValue={allUser?.state}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>City living in</Text>
            <TextInput
              onChangeText={(value) => setcity(value)}
              defaultValue={allUser?.city}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Residency Status</Text>
            <TextInput
              onChangeText={(value) => setresidency(value)}
              defaultValue={allUser?.residency}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Zip/ Pin Code</Text>
            <TextInput
              onChangeText={(value) => setzipCode(value)}
              defaultValue={allUser?.zipCode}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Grew up in</Text>
            <TextInput
              onChangeText={(value) => setgrewUp(value)}
              defaultValue={allUser?.grewUp}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Highest Qualification</Text>
            <TextInput
              onChangeText={(value) => setqualification(value)}
              defaultValue={allUser?.qualification}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>College (S) Atteded</Text>
            <TextInput
              onChangeText={(value) => setcollege(value)}
              defaultValue={allUser?.college}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Working With</Text>
            <TextInput
              onChangeText={(value) => setworkingWith(value)}
              defaultValue={allUser?.workingWith}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>


          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Working As</Text>
            <TextInput
              onChangeText={(value) => setworkingAs(value)}
              defaultValue={allUser?.workingAs}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>



          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Annual Income</Text>
            <TextInput
              onChangeText={(value) => setannualIncome(value)}
              defaultValue={allUser?.annualIncome}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>




          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Employer name</Text>
            <TextInput
              onChangeText={(value) => setemployerName(value)}
              defaultValue={allUser?.employerName}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 12,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500'
                , color: "black"
              }}
            />

          </View>




        </View>







        {/* style info */}

        <View style={{ marginTop: 50 }}>

          <View style={styles.topContainer}>

            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.Heading}>Lifestyle</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>

              <Feather
                style={{ paddingLeft: 10 }}
                name="edit"
                size={20}
                color={'white'}
              />
            </View>
          </View>

          {/* basic info field */}

          <View style={{ paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: responsiveFontSize(1.9), fontWeight: '600', width: '50%', color: "black" }}>Diet</Text>
            <TextInput
              onChangeText={(value) => setdiet(value)}
              defaultValue={allUser?.diet}
              placeholder='Enter Now'
              placeholderTextColor='gray'
              style={{
                margin: 10,
                width: responsiveWidth(90),
                alignSelf: 'center',
                padding: 0,
                borderColor: Color.secondary,
                opacity: 0.6,
                fontSize: responsiveFontSize(1.9),
                fontWeight: '500', color: "black"
              }}
            />

          </View>
        </View>




        <View style={{ width: '100%', paddingHorizontal: 10, bottom: 20 }}>
          <MainBtn
            onPress={submit}
            style={{
              backgroundColor: Color.primary,
              marginTop: responsiveHeight(15),
              width: '100%'
            }}
            title={'Update'}
          />

        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    backgroundColor: '#EC302E',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  Heading: {
    color: 'white',
    fontSize: 16,
  },
  HeadingM: {
    color: 'white',
    fontSize: 20,
  },
  halfCircle: {
    width: 90,
    height: 90
  },
  subContainer: {
    width: responsiveWidth(95),
    alignSelf: 'center',
  },
  headerTxt: {
    fontSize: responsiveFontSize(3),
    fontWeight: 'bold',
    color: Color.secondary,

  },
  headerSubTxt: {
    fontSize: responsiveFontSize(1.5),
    color: Color.secondary,
    opacity: 0.6

  },
  ImageSection: {
    width: responsiveWidth(96),
    height: '50%',
    marginTop: 10,
    flexDirection: 'row'
  }
});