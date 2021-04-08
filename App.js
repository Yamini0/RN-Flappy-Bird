import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import Bird from "./src/components/Bird";
import Obstacles from "./src/components/Obstacles";

export default function App() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2); //to make sure bird will remain in center
  const [obstaclesLeft, setObstaclesLeft] = useState(screenWidth);
  const [obstaclesLeftTwo, setObstaclesLeftTwo] = useState(
    screenWidth + screenWidth / 2 + 30
  );
  const [obstaclesNegHeight, setObstaclesNegHeight] = useState(0);
  const [obstaclesNegHeightTwo, setObstaclesNegHeightTwo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gravity = 3;
  let obstacleWidth = 60;
  let obstacleHeight = 300;
  let gap = 250;
  let gameTimerId;
  let obstaclesTimerId;
  let obstaclesTimerIdTwo;

  //starting to make bird fall
  useEffect(() => {
    //bird is not at bottom then we start falling bird by 3 pixels and make birdBottom to -3 in every 30msec
    if (birdBottom > 0) {
      gameTimerId = setInterval(() => {
        setBirdBottom((birdBottom) => birdBottom - gravity);
      }, 30);

      return () => {
        clearInterval(gameTimerId);
      };
    }
    //to make bird stop
  }, [birdBottom]);
  console.log(birdBottom);
  //tapping
  const jump = () => {
    if (!isGameOver && birdBottom < screenHeight) {
      setBirdBottom((birdBottom) => birdBottom + 30);
    }
  };

  //start first obstacle
  useEffect(() => {
    //move the obstacles to 5 pixels in every 5 sec
    if (obstaclesLeft > -60) {
      obstaclesTimerId = setInterval(() => {
        setObstaclesLeft((obstaclesLeft) => obstaclesLeft - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerId);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesLeft(screenWidth);
      // setObstaclesNegHeight(-Math.random(11) * 100);
    }
  }, [obstaclesLeft]);

  //start second obstacle
  useEffect(() => {
    if (obstaclesLeftTwo > -60) {
      obstaclesTimerIdTwo = setInterval(() => {
        setObstaclesLeftTwo((obstaclesLeftTwo) => obstaclesLeftTwo - 5);
      }, 30);
      return () => {
        clearInterval(obstaclesTimerIdTwo);
      };
    } else {
      setScore((score) => score + 1);
      setObstaclesLeftTwo(screenWidth);
      // setObstaclesNegHeightTwo();
    }
  }, [obstaclesLeftTwo]);

  //check for collisions
  useEffect(() => {
    if (
      ((birdBottom < obstacleHeight + 10 ||
        birdBottom > obstacleHeight + gap) &&
        obstaclesLeft > screenWidth / 2 - 10 &&
        obstaclesLeft < screenWidth / 2 + 10) ||
      ((birdBottom < obstacleHeight + 10 ||
        birdBottom > obstacleHeight + gap) &&
        obstaclesLeftTwo > screenWidth / 2 - 10 &&
        obstaclesLeftTwo < screenWidth / 2 + 10)
    ) {
      gameOver();
    }
  });

  const gameOver = () => {
    clearInterval(gameTimerId);
    clearInterval(obstaclesTimerId);
    clearInterval(obstaclesTimerIdTwo);
    setIsGameOver(true);
    Alert.alert("Game Over", "Your Score Is:" + score);
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
        <Obstacles
          color={"green"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeight}
          gap={gap}
          obstaclesLeft={obstaclesLeft}
        />
        <Obstacles
          color={"yellow"}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          randomBottom={obstaclesNegHeightTwo}
          gap={gap}
          obstaclesLeft={obstaclesLeftTwo}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
