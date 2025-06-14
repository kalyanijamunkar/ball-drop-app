import { useState } from 'react';
import { Alert } from 'react-native';

export function useCrystalBallSolver(floors: number[], breakFloor: number) {
  const [ball1Index, setBall1Index] = useState<number | null>(null);
  const [ball2Index, setBall2Index] = useState<number | null>(null);
  const [result, setResult] = useState<number | string | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const reset = () => {
    setBall1Index(null);
    setBall2Index(null);
    setResult(null);
    setIsSearching(false);
  };

  const startSearch = () => {
    reset();
    setIsSearching(true);

    const step = Math.floor(Math.sqrt(floors.length));
    let i = step;
    let prev = 0;

    function dropFirstBall() {
      if (i >= floors.length || floors[i] >= breakFloor) {
        setBall1Index(i);
        setTimeout(() => dropSecondBall(prev, i), 500);
        return;
      }

      setBall1Index(i);
      prev = i;
      i += step;
            console.log('prev', prev)
console.log('step', i)
      setTimeout(dropFirstBall, 1000);
    }

    function dropSecondBall(from: number, to: number) {
     
      let j = from;
      function step2() {
        if (j > to || j >= floors.length) {
          Alert.alert('Not Found')
          setResult('Not found');
          setIsSearching(false);
          return;
        }

        setBall2Index(j);
        if (floors[j] === breakFloor) {
           Alert.alert('floor no :'+ floors[j])
          setResult(floors[j]);
          setIsSearching(false);
          return;
        }
        
        j++;
        setTimeout(step2, 1000);
      }
      step2();
    }

    dropFirstBall();
  };

  return {
    ball1Index,
    ball2Index,
    result,
    isSearching,
    startSearch,
    reset,
  };
}
