import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Image, TouchableOpacity,} from 'react-native-shake'
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake'
import { useReducer } from 'react/cjs/react.production.min';

const app = ()=> {
  const [toggle, setToggle ] = useState(false);

  const handleChangeToggle = () => setToggle((oldToggle) => !oldToggle);

  useEffect(()=>{
    //liga o flash do celular
    Torch.switchState(toggle);
    
  },[toggle] );

  useEffect(()=> {

    // quando o celular for chacoalhado mudaremos o toggle
    const subscription = RNShake.addListener(()=> {
      setToggle(oldToggle => !oldToggle);
    });

    //essa func vai ser chamada quando o compomente for ser desmontado
    return () => subscription.remove();

  },[]);

  //if toggle return light
  return ( 
  <View style={toggle ? style.containerLight : style.container} >

    <TouchableOpacity onPress={handleChangeToggle}>

    <Image 
    style={toggle ?  style.lightingOn : style.lightingOff}
     source= {
       toggle 
       ? require('./assets/icon.png') 
       : require('./assets/adaptive.png')} 
     />

<Image 
    style={style.dioLogo}
     source= {
       toggle 
       ? require('./assets/logo-dio.png') 
       : require('./assets/logo-dio-white.png')} 
     />
</TouchableOpacity>
   </View>
   );
};

export default app

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor:'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  }
 

});