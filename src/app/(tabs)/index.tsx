import { StatusBar } from 'expo-status-bar';
import { Image, View } from 'react-native';
import { global } from '../../styles/global';

export default function App() {
  
  return (
    <View style={global.container}>
    <View style={global.content}>
      <Image source={require('../../assets/logotipo.png')} style={global.image} />
    </View>
      <Image source={require('../../assets/creditos.png')} style={global.imageMini} />
      <StatusBar style="auto" />
    </View>
  );
}

