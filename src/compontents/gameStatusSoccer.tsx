import {ScrollView, View, Text, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { estatistica } from '../styles/global'
import { IPlayer, IStatusGame, ITeam } from '../utils/interface'
import { supabase } from '../lib/supabase'
import { useEffect, useState } from 'react'

type Props = {
  playersOne: IPlayer[]
  playersTwo: IPlayer[]
}

interface PropsTeam {
  id: number
  teamName: string
  players: IPlayer[]
}

export function GameStatusSoccer({ playersOne, playersTwo }: Props) {
  const [teamData, setTeamData] = useState<PropsTeam[]>([])
  const [nameTeamOne, setNameTeamOne] = useState('')
  const [nameTeamTwo, setNameTeamTwo] = useState('')

  async function loadTeamName(id: number) {
    const dataTeam = await supabase.from('teams').select('name').eq('id', id)
    if(dataTeam.data) {
      return dataTeam.data[0].name
    }
  }

  useEffect(() => {
    playersOne.map(async (item) => {
      setNameTeamOne(await loadTeamName(item.team_id))
    })
    playersTwo.map(async (item) => {
      setNameTeamTwo(await loadTeamName(item.team_id))
    })
  },[])
  
  return (
    <ScrollView style={estatistica.container}>
      <Text style={estatistica.titulo}>Estatisticas:</Text>
      <View style={estatistica.content}>
        { playersOne &&
          <View style={estatistica.team}>
            <Text style={estatistica.textTeam}>{nameTeamOne}</Text>
            { playersOne.map(item => (
            <View key={item.id} style={estatistica.playerGroup}>
              <Text style={estatistica.player}>{item.name}</Text>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="unlink" color="orange" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="square" color="yellow" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
              <FontAwesome name="square" color="red" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="soccer-ball-o" color="blue" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="hand-stop-o" color="green" size={24} />
              </TouchableOpacity>
            </View>
            ))
          }
          </View>
        }
        
        { playersTwo &&
          <View style={estatistica.team}>
            <Text style={estatistica.textTeam}>{nameTeamTwo}</Text>
            { playersTwo.map(item => (
            <View key={item.id} style={estatistica.playerGroup}>
              <Text style={estatistica.player}>{item.name}</Text>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="unlink" color="orange" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="square" color="yellow" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
              <FontAwesome name="square" color="red" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="soccer-ball-o" color="blue" size={24} />
              </TouchableOpacity>
              <TouchableOpacity style={estatistica.itemPlayer}>
                <FontAwesome name="hand-stop-o" color="green" size={24} />
              </TouchableOpacity>
            </View>
            ))
          }
          </View>
        }
      </View>
    </ScrollView>
  )
}