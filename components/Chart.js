import React from 'react';
import { View , Text, StyleSheet, Image } from 'react-native';

const Chart = ({ currentPrice, logourl, name, priceChangePercentage7d, sparkline, symbol }) => {
    const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#ff3a30";
    return (
        <View style={styles.mainWrapper}>
            <View style={styles.titleWrapper}>

                <View style={styles.topWrapper}>
                      
                    <View style={styles.coinTitleWrapper}> 
                        <Image source={{ uri: logourl }} style={styles.coinLogo} />
                        <Text style={styles.coinName}>{name} ({symbol.toUpperCase()}) </Text>
                        
                    </View>

                    <Text style={styles.coinName}>7d</Text> 
                   

                </View>
 
                <View style={styles.priceWrapper}>

                    <Text style={styles.currentPrice}>${currentPrice.toLocaleString('en-US',{currency:'USD'})}</Text>
                    <Text style={[styles.priceChange, {color: priceChangeColor}]}>{priceChangePercentage7d.toFixed(2)}%</Text>

                </View>


            </View>
        </View>
    );
}

const styles =StyleSheet.create({
    mainWrapper:{
        margin: 15
    },
    titleWrapper:{
        marginHorizontal:15
    },
    topWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    coinTitleWrapper:{
        
        flexDirection: 'row',
        alignItems  : 'center',
        
        
    },
    coinLogo:{  
        width:30,
        height:30,
        marginRight:5,
    },
    coinName:{
        fontSize:16,
        color:'#A9ABB1',
    },
    
    priceWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    currentPrice:{
        fontSize:25,
        fontWeight:'bold',
        marginLeft:10
    },
    priceChange:{
        fontSize:20,
    },
})

export default Chart;