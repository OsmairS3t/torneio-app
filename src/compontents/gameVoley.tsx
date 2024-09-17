import { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { container, championship, championVoley } from "../styles/global"
import Header from './header'
import { SetPlayGame } from './setPlayGame'
import { IGame, ITournament, IPoint, IGameSet } from '../utils/interface'
import { supabase } from '../lib/supabase'

interface GameVoleyProps {
  tournament: ITournament;
  game: IGame;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function GameVoley({ tournament, game, setIsModalOpen }: GameVoleyProps) {
  const [gameSets, setGameSets] = useState<IGameSet[]>([])
  const [goalTeamOne, setGoalTeamOne] = useState(0)
  const [goalTeamTwo, setGoalTeamTwo] = useState(0)

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

  async function saveGame() {
    // console.log({
    //   id: game.id,
    //   goal_team_one: goalTeamOne,
    //   goal_team_two: goalTeamTwo,
    // })
    try {
      await supabase.from('games').update({
        goal_team_one: goalTeamOne,
        goal_team_two: goalTeamTwo,
      }).eq('id', game.id)
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
        <SetPlayGame 
          key={item.id} 
           gameSet={item}
          setGoalTeamOne={setGoalTeamOne}
          setGoalTeamTwo={setGoalTeamTwo}
        />
      ))}
      <TouchableOpacity style={championVoley.btnSave} onPress={saveGame}>
        <Text style={championVoley.textBtnSave}>Salvar Jogo</Text>
      </TouchableOpacity>

    </View>
  )
}