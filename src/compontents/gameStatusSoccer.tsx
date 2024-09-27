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
  const [goalOne, setGoalOne] = useState(0)
  const [yellowCardOne, setYellowCardOne] = useState(0)
  const [redCardOne, setRedCardOne] = useState(0)
  const [faultOne, setFaultOne] = useState(0)
  const [defeatOne, setDefeatOne] = useState(0)
  const [goalTwo, setGoalTwo] = useState(0)
  const [yellowCardTwo, setYellowCardTwo] = useState(0)
  const [redCardTwo, setRedCardTwo] = useState(0)
  const [faultTwo, setFaultTwo] = useState(0)
  const [defeatTwo, setDefeatTwo] = useState(0)

  async function loadTeamName(id: number) {
    const dataTeam = await supabase.from('teams').select('name').eq('id', id)
    if(dataTeam.data) {
      return dataTeam.data[0].name
    }
  }

  function changeStatus(id: number, status: number, setStatus: (status: number)=>void) {
    setStatus(status + 1)
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

              <TouchableOpacity style={estatistica.itemPlayer} onPress={() => changeStatus(item.id, faultOne, setFaultOne)}>
                <Text>{faultOne}</Text>
                <FontAwesome name="unlink" color="orange" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{yellowCardOne}</Text>
                <FontAwesome name="square" color="yellow" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{redCardOne}</Text>
                <FontAwesome name="square" color="red" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{goalOne}</Text>
                <FontAwesome name="soccer-ball-o" color="blue" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{defeatOne}</Text>
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
                <Text>{faultTwo}</Text>
                <FontAwesome name="unlink" color="orange" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{yellowCardTwo}</Text>
                <FontAwesome name="square" color="yellow" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{redCardTwo}</Text>
                <FontAwesome name="square" color="red" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{goalTwo}</Text>
                <FontAwesome name="soccer-ball-o" color="blue" size={24} />
              </TouchableOpacity>

              <TouchableOpacity style={estatistica.itemPlayer}>
                <Text>{defeatTwo}</Text>
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