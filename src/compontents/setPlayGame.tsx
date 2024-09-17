import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native"
import { championVoley } from "../styles/global"

interface Props {
  team: number;
  actualSet: number;
  operator: string;
  pointTeamOne: number;
  pointTeamTwo: number;
}

export function SetPlayGame({team, actualSet, pointTeamOne, pointTeamTwo, operator}: Props) {
  const [pointOne, setPointOne] = useState(0)

  function Count(team: number, actualSet: number, pointTeamOne: number, pointTeamTwo:number, operator: string) {
  }

  return (
    <View style={championVoley.viewSets}>
      <View style={championVoley.viewTeams}>
        <Text style={championVoley.textPlacarSet}>1º</Text>

        <TouchableOpacity
          style={championVoley.viewPlusSet}
          onPress={() => { Count(team, actualSet, pointTeamOne, pointTeamTwo, operator) }}
        >
          <Text style={championVoley.textPlacarSet}>+</Text>
        </TouchableOpacity>
        <Text style={championVoley.textPlacarSet}>{pointTeamOne}</Text>
        <TouchableOpacity
          style={championVoley.viewMinusSet}
          onPress={() => { Count(1, 1, pointTeamOne, pointTeamTwo, operator) }}
        >
          <Text style={championVoley.textPlacarSet}>-</Text>
        </TouchableOpacity>
      </View>

      <View style={championVoley.viewTeams}>
        <TouchableOpacity
          style={championVoley.viewPlusSet}
          onPress={() => { Count(team, actualSet, pointTeamTwo, pointTeamTwo, operator) }}
        >
          <Text style={championVoley.textPlacarSet}>+</Text>
        </TouchableOpacity>
        <Text style={championVoley.textPlacarSet}>{pointTeamTwo}</Text>
        <TouchableOpacity
          style={championVoley.viewMinusSet}
          onPress={() => { Count(2, 1, pointTeamTwo, pointTeamTwo, operator) }}
        >
          <Text style={championVoley.textPlacarSet}>-</Text>
        </TouchableOpacity>
        <Text style={championVoley.textPlacarSet}>15</Text>
      </View>
    </View>
  
  )
}