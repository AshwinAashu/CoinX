import React from 'react';
import { View , Text, StyleSheet, Image, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

const Linechart = () =>{
    return (
    <View>
        <VictoryChart width = {400} height = {300} theme={VictoryTheme.material} >
            <VictoryLine
            style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
            }}
            data={[
                { x: 1, y: 2 },
                { x: 2, y: 3 },
                { x: 3, y: 5 },
                { x: 4, y: 4 },
                { x: 5, y: 7 }
            ]}
            />
        </VictoryChart>
     </View>
    );
};

export default Linechart;
