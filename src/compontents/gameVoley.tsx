import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { container, championship, championVoley } from "../styles/global"
import Header from './header'
import { SetPlayGameVoley } from './setPlayGameVoley'
import { IGame, ITournament, IPoint, IGameSet } from '../utils/interface'
import { supabase } from '../lib/supabase'

interface GameVoleyProps {
  tournament: ITournament;
  game: IGame;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function GameVoley({ tournament, game, setIsModalOpen }: GameVoleyProps) {
  const [gameSets, setGameSets] = useState<IGameSet[]>([])
  const [goalTeamOne, setGoalTeamOne] = useState(game.goal_team_one)
  const [goalTeamTwo, setGoalTeamTwo] = useState(game.goal_team_two)

  async function GetSets() {
    try {
      const { data } = await supabase
        .from('gamesets')
        .select('*')
        .eq('id_game', game.id)
        .order('actual_set', {ascending: true})
      if (data) {
        setGameSets(data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    GetSets()
  },[])

  return (
    <View style={container.form}>
      <Header title="CAMPEONATO" />

      <View style={championVoley.viewTitle}>
        <Text style={championVoley.textTitle}>{tournament?.name} - {game?.stage}</Text>
        <TouchableOpacity style={championship.buttonHeaderPage} onPress={() => setIsModalOpen(false)}>
          <Feather name="x-square" size={30} style={championship.iconClose} />
        </TouchableOpacity>
      </View>

      <View style={championVoley.viewGame}>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textTeams}>{game.team_one}</Text>
          <Text style={championVoley.textTeams}>{goalTeamOne}</Text>
        </View>
        <Text style={championVoley.textTeams}>X</Text>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textTeams}>{goalTeamTwo}</Text>
          <Text style={championVoley.textTeams}>{game.team_two}</Text>
        </View>
      </View>

      {gameSets.map(item => (
        <SetPlayGameVoley 
          key={item.id} 
          gameSet={item}
          setGoalTeamOne={setGoalTeamOne}
          setGoalTeamTwo={setGoalTeamTwo}
        />
      ))}

    </View>
  )
}