import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { Feather } from '@expo/vector-icons'
import { championVoley } from "../styles/global"
import { IGameSet } from "../utils/interface";
import { supabase } from "../lib/supabase";

interface Props {
  gameSet: IGameSet;
  setGoalTeamOne: (point: number) => void;
  setGoalTeamTwo: (point: number) => void;
}

export function SetPlayGameVoley({ gameSet, setGoalTeamOne, setGoalTeamTwo }: Props) {
  let goalOne = 0
  let goalTwo = 0
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
        setPointsTwo(pointsTwo - 1)
      }
    }
  }

  async function handleSaveSet() {
    try {
      await supabase.from('gamesets').update({
        set_point_one: pointsOne,
        set_point_two: pointsTwo,
      }).eq('id', gameSet.id)
      
      updateGame()
      Alert.alert(`Set gravado com sucesso!`)
    } catch (error) {
      console.log(error)
    }
  }

  async function updateGame() {
    const { data } = await supabase
      .from('gamesets')
      .select('*')
      .eq('id_game', gameSet.id_game)
      .order('actual_set', {ascending: true})

    if (data) {
      const GameSet: IGameSet[] = data
      GameSet.map(item => {
        if((item.set_point_one - item.set_point_two) >= 2) {
          goalOne = goalOne + 1
        }
        if((item.set_point_two - item.set_point_one) >= 2) {
          goalTwo = goalTwo + 1
        }
      })
    }

    await supabase.from('games').update({
      goal_team_one: goalOne,
      goal_team_two: goalTwo,
    }).eq('id', gameSet.id_game)
    setGoalTeamOne(goalOne)
    setGoalTeamTwo(goalTwo)
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