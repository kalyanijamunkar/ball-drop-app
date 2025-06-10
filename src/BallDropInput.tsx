import React, { useState } from 'react';
import {
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import { useCrystalBallSolver } from './useCrystalBallSolver';

export const BallDropInput = () => {
  const [floorCount, setFloorCount] = useState(100);
  const [breakFloor, setBreakFloor] = useState(67);
  const floors = Array.from({ length: floorCount }, (_, i) => i + 1);

  const {
    ball1Index,
    ball2Index,
    result,
    isSearching,
    startSearch,
    reset,
  } = useCrystalBallSolver(floors, breakFloor);

  return (
    <View>
      <TextInput
        keyboardType="numeric"
        placeholder="Total floors"
        value={String(floorCount)}
        onChangeText={(val) => setFloorCount(Number(val))}
        style={{ height: 50, borderWidth: 1, marginBottom: 10, padding: 10 }}

      />
      <TextInput
        keyboardType="numeric"
        placeholder="Breaking floor"
        value={String(breakFloor)}
        onChangeText={(val) => setBreakFloor(Number(val))}
      style={{ height: 50, borderWidth: 1, marginBottom: 10, padding: 10 }}

      />
      <View style={{flexDirection: 'row'}}>
<TouchableOpacity disabled={isSearching} onPress={startSearch} 
        style={{
          backgroundColor:  isSearching ? 'grey': '#007AFF',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
          marginRight: 20
        }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Start Search</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={reset} 
        style={{
          backgroundColor:  '#007AFF',
          padding: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Reset</Text>
      </TouchableOpacity>
      </View>
      

      <View style={{ flexWrap: 'wrap' }}>
        {floors.map((floor, idx) => {
          let bg = 'white';
          if (idx === ball1Index) bg = 'orange';
          if (idx === ball2Index) bg = 'blue';
          if (result === floor) bg = 'green';

          return (
            <View
              key={idx}
              style={{
                width: 50,
                height: 50,
                margin: 2,
                backgroundColor: bg,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
              }}
            >
              <Text>{floor}</Text>
            </View>
          );
        }).reverse()}
      </View>

      {result && <Text>Result: {result}</Text>}
    </View>
  );
};
