import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Feather } from '@expo/vector-icons'
import { championVoley } from "../styles/global"
import { IGame, IGameSet } from "../utils/interface";
import { supabase } from "../lib/supabase";

interface Props {
  gameSet: IGameSet;
  setGoalTeamOne: (point: number) => void;
  setGoalTeamTwo: (point: number) => void;
}

export function SetPlayGame({ gameSet, setGoalTeamOne, setGoalTeamTwo }: Props) {
  const [goalOne, setGoalOne] = useState(0)
  const [goalTwo, setGoalTwo] = useState(0)
  const [pointsOne, setPointsOne] = useState(gameSet.set_point_one)
  const [pointsTwo, setPointsTwo] = useState(gameSet.set_point_two)

  function CountPoint(operator: string, team: number) {
    if(operator === '+'){
      if (team === 1) {
        setPointsOne(pointsOne + 1)
      } else {
        setPointsTwo(pointsTwo + 1)
      }
    } else {
      if (team === 1) {
        setPointsOne(pointsOne - 1)
      } else {
        setPointsOne(pointsTwo - 1)
      }
    }
  }

  async function handleSaveSet() {
    try {
      const {data} = await supabase.from('games').select('*').eq('id', gameSet.id_game)
      if (data) {
        let gameFounded: IGame = data[0]
        setGoalOne(gameFounded.goal_team_one)
        setGoalTwo(gameFounded.goal_team_two)
      }
      if((pointsOne - pointsTwo) >= 2) {
        setGoalOne(goalOne + 1)
      }
      if((pointsTwo - pointsOne) >= 2) {
        setGoalTwo(goalTwo + 1)
      }

      await supabase.from('gamesets').update({
        set_point_one: pointsOne,
        set_point_two: pointsTwo,
      }).eq('id', gameSet.id)

      await supabase.from('games').update({
          goal_team_one: goalOne,
          goal_team_two: goalTwo,
      }).eq('id', gameSet.id_game)
      setGoalTeamOne(goalOne)
      setGoalTeamTwo(goalTwo)
      Alert.alert('Set gravado com sucesso!')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={championVoley.viewSets}>
      <View style={championVoley.viewTeams}>
        <Text style={championVoley.textPlacarSet}>{gameSet.actual_set}º</Text>

        <TouchableOpacity style={championVoley.viewPlusSet} onPress={() => { CountPoint('+', 1) }}>
          <Text style={championVoley.textPlacarSet}>+</Text>
        </TouchableOpacity>

        <Text style={championVoley.textPlacarSet}>{pointsOne}</Text>

        <TouchableOpacity style={championVoley.viewMinusSet} onPress={() => { CountPoint('-', 1) }}>
          <Text style={championVoley.textPlacarSet}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={championVoley.viewTeams}>
        <TouchableOpacity style={championVoley.viewPlusSet} onPress={() => { CountPoint('+', 2) }}>
          <Text style={championVoley.textPlacarSet}>+</Text>
        </TouchableOpacity>
        
        <Text style={championVoley.textPlacarSet}>{pointsTwo}</Text>
        
        <TouchableOpacity style={championVoley.viewMinusSet} onPress={() => { CountPoint('-', 2) }}>
          <Text style={championVoley.textPlacarSet}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSaveSet}>
          <Feather name="save" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  )
}