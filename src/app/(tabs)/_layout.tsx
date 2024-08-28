import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons'

export default function Layout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor: '#949494',
      tabBarActiveTintColor: '#01b7ff',
      tabBarStyle: {
      },
    }}>
      <Tabs.Screen name="campeonato"
        options={{
            title: 'CAMPEONATO',
            tabBarIcon: ({ color }) => <FontAwesome size={20} name="play" color={color} />,
          }}
        />
      <Tabs.Screen name="index"
        options={{
            title: 'HOME',
            tabBarIcon: ({ color }) => <FontAwesome size={20} name="home" color={color} />,
          }}
        />
      <Tabs.Screen name="classificacao"
        options={{
            title: 'CLASSIFICAÇÃO',
            tabBarIcon: ({ color }) => <FontAwesome size={20} name="list-alt" color={color} />,
          }}
        />
    </Tabs>
  )
}