import React , {useEffect} from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme, createContainer } from "victory-native";

const Linechart = ( { priceChangePercentage7d , dataSparkline } ) =>{

    useEffect(() => {
        let chartData = formatChartData(dataSparkline);
        return chartData;
    }, []);

    const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#ff3a30";

    

    const formatChartData = ({dataSparkline}) => {
        const chartData = {};
        const chartDataX = [];
        const chartDataY = [];
        dataSparkline.forEach(element => {
            chartDataX.push(element.sparkline_in_7d.price.x);
            chartDataY.push(element.sparkline_in_7d.price.y);
        });
        chartData = {chartDataX, chartDataY};
        return chartData;
    }
    


    const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");
    return (
    <View>
        <VictoryChart 
            width = {400} 
            height = {300} 
            theme={VictoryTheme.material} 
            containerComponent={ 
                <VictoryZoomVoronoiContainer 
                    labels={({ datum }) => $` ${(datum.y)}`}
            />}
        >



            <VictoryLine
            style={{
                data: { stroke: priceChangeColor },  
                parent: { border: "1px solid #ccc"}
            }}
            data= { {x:(chartData)=>{return chartData.foreach(chartDataX)} , y : (chartData)=>{return chartData.foreach(chartDataY)} } }
               

            />
        </VictoryChart>
     </View>
    );
};


export default Linechart;
