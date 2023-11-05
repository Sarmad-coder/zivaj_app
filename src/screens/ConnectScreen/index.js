import { View, Text, ScrollView, ImageBackground, Image , TouchableOpacity} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';

import React from 'react'
import { responsiveHeight , responsiveWidth , responsiveFontSize} from 'react-native-responsive-dimensions';
import Color from '../../components/Color';

const ConnectScreen = () => {
  return (
    <ScrollView style={{flex:1, backgroundColor:'white'}}>
      <ImageBackground style={{width:'100%', height:250}} source={require('../../components/Images/selfie.jpeg')}> 
      <View style={{width:'95%', alignSelf:'center' ,height:60,flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <Image style={{width:30 , height:30 , tintColor:'white' }}  source={require('../../components/Images/rArrow.png')}/>
        <Image style={{width:30 , height:30 , tintColor:'white' }}  source={require('../../components/Images/pending.png')}/>
      </View>
      <LinearGradient style={{width:'100%', height:responsiveHeight(13), marginTop:'100%',bottom:0, position:'absolute'}} colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.3)']}>
                  <View style={{width:'95%', height:50, flexDirection:'row', alignItems:'center', justifyContent:'space-evenly', alignSelf:'center'}}>
                    <TouchableOpacity style={{width:'60%', flexDirection:'row', alignItems:'center'}}>
                    <View style={{width:24, height:25, borderWidth:3, borderColor:'gray' ,borderRadius:50, alignItems:'center', justifyContent:'center', marginRight:10}}>
                      <Image style={{width:responsiveWidth(5), height:responsiveHeight(3), marginTop:responsiveHeight(-1.5), marginLeft:responsiveWidth(2)}} source={require('../../components/Images/greenTick.png')}/>
                    </View>
                    <Text style={{fontSize:20, marginLeft:0 ,color:'white', fontWeight:'bold'}}>Ambreen Malik</Text>
                    </TouchableOpacity>
                    <View style={{width:'40%', height:"100%", flexDirection:'row', alignItems:'center'}}>
                      <View style={{width:responsiveWidth(12), height:12, backgroundColor:"rgba(0, 0, 0, 0.5)", marginHorizontal:1, borderRadius:3, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <View style={{width:5, height:5, backgroundColor:'white', borderRadius:10, marginHorizontal:5}}></View>
                        <Text style={{fontSize:responsiveFontSize(1), color:"white", marginTop:-1}}>Online</Text>
                      </View>
                      <View style={{width:responsiveWidth(20), height:12, backgroundColor:"rgba(0, 0, 0, 0.5)", marginHorizontal:5, borderRadius:3, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Image style={{width:10, height:10, marginHorizontal:5}} source={require('../../components/Images/relationIcon.png')}/>
                        <Text style={{fontSize:responsiveFontSize(1), color:"white", marginTop:-1}}>You and Her</Text>
                      </View>
                    </View>
                    
                  </View>

                  <View style={{width:'95%', height:60, flexDirection:'row',marginTop:-25,alignSelf:'center', alignItems:'center'}}>
                    <View style={{width:'60%', height:"100%", alignItems:'center', marginTop:10}}>
                    <Text style={{fontSize:12, marginTop:10 ,marginLeft:0 ,color:'white',}}>21 yrs, 5'5'' <View style={{width:5, height:5, backgroundColor:'white', borderRadius:50}}></View> Not Working</Text>
                    <Text style={{fontSize:12,marginTop:5 ,marginLeft:0 ,color:'white',}}>21 yrs, 5'5'' <View style={{width:5, height:5, backgroundColor:'white', borderRadius:50}}></View> Not Working</Text>
                    </View>
                  </View>



                  

                  

      </LinearGradient>
      </ImageBackground>
      <View style={{width:'95%', alignSelf:'center' ,height:120, marginTop:10 ,backgroundColor:'white', borderRadius:10, borderColor:'black', borderWidth:0.5, elevation:3}}>
        <Text style={{marginHorizontal:20, marginVertical:10, fontSize:18, fontWeight:'bold', color:'black'}}>Ambreen Malik</Text>
        <Text style={{marginHorizontal:20, marginTop:-10, fontSize:12, textAlign:'justify', color:'black'}}>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</Text>
      </View>

      <View style={{width:'95%', alignSelf:'center' ,height:550, marginTop:10 ,backgroundColor:'white', borderRadius:10, borderColor:'black', borderWidth:0.5, elevation:3}}>
        <Text style={{marginHorizontal:20, marginVertical:10, fontSize:18, fontWeight:'bold', color:'black'}}>Besic Detail</Text>
        <TouchableOpacity style={{width:150, height:30, backgroundColor:Color.primary, borderRadius:5, alignItems:'center', justifyContent:'center', marginHorizontal:20}}>
        <Text style={{color:'white', fontWeight:'600'}}>Profile ID: 345243</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row', marginVertical:10}}>
        <TouchableOpacity style={{width:90, height:30,  borderRadius:5, alignItems:'center', justifyContent:'center', marginHorizontal:20, borderWidth:0.5, borderColor:'black'}}>
        <Text style={{color:'black', fontWeight:'600'}}>345243</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{width:90, height:30,borderRadius:5, alignItems:'center', justifyContent:'center',  borderWidth:0.5, borderColor:'black'}}>
        <Text style={{color:'black', fontWeight:'600'}}>345243</Text>
        </TouchableOpacity><TouchableOpacity style={{width:90, height:30,borderRadius:5, alignItems:'center', justifyContent:'center', marginHorizontal:20,  borderWidth:0.5, borderColor:'black'}}>
        <Text style={{color:'black', fontWeight:'600'}}>345243</Text>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 ,backgroundColor:Color.primary, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:25, height:25}} source={require('../../components/Images/logo.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Hellow Wordl</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>Hellow Wordl</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 ,backgroundColor:Color.primary, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:25, height:25}} source={require('../../components/Images/logo.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Hellow Wordl</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>Hellow Wordl</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 ,backgroundColor:Color.primary, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:25, height:25}} source={require('../../components/Images/logo.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Hellow Wordl</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>Hellow Wordl</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 ,backgroundColor:Color.primary, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:25, height:25}} source={require('../../components/Images/logo.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Hellow Wordl</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>Hellow Wordl</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 ,backgroundColor:Color.primary, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:25, height:25}} source={require('../../components/Images/logo.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Hellow Wordl</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>Hellow Wordl</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 ,backgroundColor:Color.primary, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:25, height:25}} source={require('../../components/Images/logo.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Hellow Wordl</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>Hellow Wordl</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 ,backgroundColor:Color.primary, alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:25, height:25}} source={require('../../components/Images/logo.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Hellow Wordl</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>Hellow Wordl</Text>
          </View>
        </View>
      </View>
      <View style={{width:'95%', alignSelf:'center' ,height:200, marginTop:10 ,backgroundColor:'white', borderRadius:10, borderColor:'black', borderWidth:0.5, elevation:3}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
        <Text style={{marginHorizontal:20, marginVertical:10, fontSize:18, fontWeight:'bold', color:'black'}}>Contact Detail</Text>
        <Image style={{width:30, height:30, marginHorizontal:10, marginVertical:5}} source={require('../../components/Images/selfie.jpeg')}/>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 , alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:'70%', height:'70%'}} source={require('../../components/Images/phone.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Contact no</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>+92394****</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:50, height:50, marginHorizontal:20, borderRadius:5 , alignItems:'center', justifyContent:'center'}}>
            <Image style={{width:'70%', height:'70%'}} source={require('../../components/Images/chat2.png')}/>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Email</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>*******info34gmail.com</Text>
          </View>
        </View>
      </View>
      <View style={{width:'95%', alignSelf:'center' ,height:300, marginTop:10 ,backgroundColor:'white', borderRadius:10, borderColor:'black', borderWidth:0.5, elevation:3}}>
        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:10}}>
        <Text style={{marginHorizontal:20, marginVertical:10, fontSize:18, fontWeight:'bold', color:'black'}}>Career & Education</Text>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:40, height:40, marginHorizontal:20, borderRadius:5 , alignItems:'center', justifyContent:'center', backgroundColor:'#E7BB40'}}>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Professional</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>+92394****</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:40, height:40, marginHorizontal:20, borderRadius:5 , alignItems:'center', justifyContent:'center', backgroundColor:'#E7BB40'}}>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Company Name</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>+92394****</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:40, height:40, marginHorizontal:20, borderRadius:5 , alignItems:'center', justifyContent:'center', backgroundColor:'#E7BB40'}}>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>College Name</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>+92394****</Text>
          </View>
        </View>
        <View style={{flexDirection:"row", marginVertical:5}}>
          <View style={{width:40, height:40, marginHorizontal:20, borderRadius:5 , alignItems:'center', justifyContent:'center', backgroundColor:'#E7BB40'}}>
          </View>
          <View style={{justifyContent:"center"}}>
          <Text style={{fontSize:12, right:10, color:'gray'}}>Annual Income</Text>
          <Text style={{fontSize:14, right:10, color:'black', fontWeight:'bold'}}>+92394****</Text>
          </View>
        </View>
      </View>

      <View style={{width:'95%', alignSelf:'center' ,height:100, marginTop:10 ,backgroundColor:Color.primary, borderRadius:10, elevation:3, alignItems:'center', justifyContent:"center", marginVertical:10}}>
      <Text style={{color:'white', fontSize:15, fontWeight:'bold'}}>To unlock Birth Date and Contact Detail</Text>
      <TouchableOpacity style={{width:150, height:35, backgroundColor:'#E2BE50', borderRadius:10, marginVertical:10, alignItems:'center', justifyContent:'center'}}>
      <Text style={{fontWeight:'bold', color:'black'}}>Go Premium Now</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default ConnectScreen