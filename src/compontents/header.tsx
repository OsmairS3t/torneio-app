import { Image, Text, View } from "react-native";
import { global, header } from "../styles/global";

interface Props {
  title: string;
}

export default function Header({title}: Props) {
  return (
    <View style={header.container}>
      <Image source={require('../assets/logotipo.png')} style={header.image} />
      <Text style={header.title}>{title}</Text>
    </View>
  )
}