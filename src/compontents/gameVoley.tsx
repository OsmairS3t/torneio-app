import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import { container, championship, championVoley } from "../styles/global"
import Header from './header'
import { IGame, ITournament, IGoal } from '../utils/interface'

interface GameVoleyProps {
  tournament: ITournament;
  game: IGame;
  point: IGoal;
  setIsModalOpen: (isOpen: boolean) => void;
}

export function GameVoley({ tournament, game, point, setIsModalOpen }: GameVoleyProps) {
  const [pointTeamOneSetOne, setPointTeamOneSetOne] = useState(0)
  const [pointTeamTwoSetOne, setPointTeamTwoSetOne] = useState(0)
  const [pointTeamOneSetTwo, setPointTeamOneSetTwo] = useState(0)
  const [pointTeamTwoSetTwo, setPointTeamTwoSetTwo] = useState(0)
  const [pointTeamOneSetThre, setPointTeamOneSetThre] = useState(0)
  const [pointTeamTwoSetThre, setPointTeamTwoSetThre] = useState(0)
  const [pointTeamOneSetFour, setPointTeamOneSetFour] = useState(0)
  const [pointTeamTwoSetFour, setPointTeamTwoSetFour] = useState(0)
  const [pointTeamOneSetFive, setPointTeamOneSetFive] = useState(0)
  const [pointTeamTwoSetFive, setPointTeamTwoSetFive] = useState(0)

  function CountPoints(
    team: number,
    actualSet: number,
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    operator: string
  ) {
    if (operator === '-') {
      setValue(value - 1)
      if (team === 1) {
        point.playedSetOne.gameSet = actualSet
        point.playedSetOne.setPoint = value - 1
      } else {
        point.playedSetTwo.gameSet = actualSet
        point.playedSetTwo.setPoint = value - 1
      }
    } else {
      setValue(value + 1)
      if (team === 1) {
        point.playedSetOne.gameSet = actualSet
        point.playedSetOne.setPoint = value + 1
      } else {
        point.playedSetTwo.gameSet = actualSet
        point.playedSetTwo.setPoint = value + 1
      }
    }

    if (point.playedSetOne.gameSet === 1) {
      if ((point.playedSetOne.setPoint >= 15) && (point.playedSetOne.setPoint - point.playedSetTwo.setPoint) >= 2) {
        point.playedSetOne.totalSet = 1
        point.totalPointOne = point.playedSetOne.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
      if (point.playedSetTwo.setPoint >= 15 && (point.playedSetTwo.setPoint - point.playedSetOne.setPoint) >= 2) {
        point.playedSetTwo.totalSet = 1
        point.totalPointTwo = point.playedSetTwo.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
    }

    if (point.playedSetOne.gameSet === 2) {
      if ((point.playedSetOne.setPoint >= 15) && (point.playedSetOne.setPoint - point.playedSetTwo.setPoint) >= 2) {
        point.playedSetOne.totalSet = 1
        point.totalPointOne = point.playedSetOne.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
      if (point.playedSetTwo.setPoint >= 15 && (point.playedSetTwo.setPoint - point.playedSetOne.setPoint) >= 2) {
        point.playedSetTwo.totalSet = 1
        point.totalPointTwo = point.playedSetTwo.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
    }

    if (point.playedSetOne.gameSet === 3) {
      if ((point.playedSetOne.setPoint >= 15) && (point.playedSetOne.setPoint - point.playedSetTwo.setPoint) >= 2) {
        point.playedSetOne.totalSet = 1
        point.totalPointOne = point.playedSetOne.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
      if (point.playedSetTwo.setPoint >= 15 && (point.playedSetTwo.setPoint - point.playedSetOne.setPoint) >= 2) {
        point.playedSetTwo.totalSet = 1
        point.totalPointTwo = point.playedSetTwo.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
    }

    if (point.playedSetOne.gameSet === 4) {
      if ((point.playedSetOne.setPoint >= 15) && (point.playedSetOne.setPoint - point.playedSetTwo.setPoint) >= 2) {
        point.playedSetOne.totalSet = 1
        point.totalPointOne = point.playedSetOne.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
      if (point.playedSetTwo.setPoint >= 15 && (point.playedSetTwo.setPoint - point.playedSetOne.setPoint) >= 2) {
        point.playedSetTwo.totalSet = 1
        point.totalPointTwo = point.playedSetTwo.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
    }

    if (point.playedSetOne.gameSet === 5) {
      if ((point.playedSetOne.setPoint >= 15) && (point.playedSetOne.setPoint - point.playedSetTwo.setPoint) >= 2) {
        point.playedSetOne.totalSet = 1
        point.totalPointOne = point.playedSetOne.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
      if (point.playedSetTwo.setPoint >= 15 && (point.playedSetTwo.setPoint - point.playedSetOne.setPoint) >= 2) {
        point.playedSetTwo.totalSet = 1
        point.totalPointTwo = point.playedSetTwo.totalSet
      } else {
        point.playedSetOne.totalSet = 0
      }
    }

    // console.log("Pontos: ", point)
  }

  async function saveGame() {

  }

  const objSet = {
    codSet: 0,
    operator: '+',
    pointSetOne: 0,
    pointSetTwo: 0,
  }

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
          <Text style={championVoley.textTeams}>{point.totalPointOne}</Text>
        </View>
        <Text style={championVoley.textTeams}>X</Text>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textTeams}>{point.totalPointTwo}</Text>
          <Text style={championVoley.textTeams}>{game.team_two}</Text>
        </View>
      </View>

      <View style={championVoley.viewSets}>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textPlacarSet}>1º</Text>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(1, 1, pointTeamOneSetOne, setPointTeamOneSetOne, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamOneSetOne}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(1, 1, pointTeamOneSetOne, setPointTeamOneSetOne, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={championVoley.viewTeams}>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(2, 1, pointTeamTwoSetOne, setPointTeamTwoSetOne, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamTwoSetOne}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(2, 1, pointTeamTwoSetOne, setPointTeamTwoSetOne, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>15</Text>
        </View>
      </View>

      <View style={championVoley.viewSets}>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textPlacarSet}>2º</Text>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(1, 2, pointTeamOneSetTwo, setPointTeamOneSetTwo, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamOneSetTwo}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(1, 2, pointTeamOneSetTwo, setPointTeamOneSetTwo, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={championVoley.viewTeams}>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(2, 2, pointTeamTwoSetTwo, setPointTeamTwoSetTwo, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamTwoSetTwo}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(2, 2, pointTeamTwoSetTwo, setPointTeamTwoSetTwo, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>15</Text>
        </View>
      </View>

      <View style={championVoley.viewSets}>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textPlacarSet}>3º</Text>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(1, 3, pointTeamOneSetThre, setPointTeamOneSetThre, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamOneSetThre}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(1, 3, pointTeamOneSetThre, setPointTeamOneSetThre, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={championVoley.viewTeams}>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(2, 3, pointTeamTwoSetThre, setPointTeamTwoSetThre, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamTwoSetThre}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(2, 3, pointTeamTwoSetThre, setPointTeamTwoSetThre, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>15</Text>
        </View>
      </View>

      <View style={championVoley.viewSets}>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textPlacarSet}>4º</Text>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(1, 4, pointTeamOneSetFour, setPointTeamOneSetFour, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamOneSetFour}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(1, 4, pointTeamOneSetFour, setPointTeamOneSetFour, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={championVoley.viewTeams}>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(2, 4, pointTeamTwoSetFour, setPointTeamTwoSetFour, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamTwoSetFour}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(2, 4, pointTeamTwoSetFour, setPointTeamTwoSetFour, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>15</Text>
        </View>
      </View>

      <View style={championVoley.viewSets}>
        <View style={championVoley.viewTeams}>
          <Text style={championVoley.textPlacarSet}>5º</Text>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(1, 5, pointTeamOneSetFive, setPointTeamOneSetFive, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamOneSetFive}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(1, 5, pointTeamOneSetFive, setPointTeamOneSetFive, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={championVoley.viewTeams}>
          <TouchableOpacity
            style={championVoley.viewPlusSet}
            onPress={() => { CountPoints(2, 5, pointTeamTwoSetFive, setPointTeamTwoSetFive, '+') }}
          >
            <Text style={championVoley.textPlacarSet}>+</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>{pointTeamTwoSetFive}</Text>
          <TouchableOpacity
            style={championVoley.viewMinusSet}
            onPress={() => { CountPoints(2, 5, pointTeamTwoSetFive, setPointTeamTwoSetFive, '-') }}
          >
            <Text style={championVoley.textPlacarSet}>-</Text>
          </TouchableOpacity>
          <Text style={championVoley.textPlacarSet}>15</Text>
        </View>
      </View>
    </View>
  )
}