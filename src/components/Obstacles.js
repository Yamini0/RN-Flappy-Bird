import React from "react";
import { View } from "react-native";

const Obstacles = ({
  color,
  obstaclesLeft,
  obstacleWidth,
  obstacleHeight,
  //   randomBottom,
  gap,
}) => {
  return (
    <View>
      <View
        style={{
          position: "absolute",
          backgroundColor: color,
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: -800 + obstacleHeight + gap, //-250
        }}
      ></View>
      <View
        style={{
          position: "absolute",
          backgroundColor: color,
          width: obstacleWidth,
          height: obstacleHeight,
          left: obstaclesLeft,
          bottom: -1000, //510
        }}
      ></View>
    </View>
  );
};

export default Obstacles;
