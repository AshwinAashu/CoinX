import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';  

function ListItem( {name, symbol, currentPrice, priceChangePercentage7d, logourl }) {
  const priceChangeColor = priceChangePercentage7d > 0 ? "#34C759" : "#ff3a30";

  return (
    <TouchableOpacity>
      <View style={styles.itemWrapper}>


        <View style={styles.leftWrapper}>
            <Image source={{uri: logourl }} style={styles.image}/>
            <View style={styles.titleWrapper}>
              <Text style ={styles.coinTitle}>{name}</Text>
              <Text style={styles.coinSubtitle}>{symbol.toUpperCase()} </Text>
            </View>
        </View>

        <View style={styles.rightWrapper}>

          <Text style ={styles.coinTitle}>
            ${currentPrice.toLocaleString('en-US', { style : 'currency' , currency : 'USD'})}
          </Text>

          <Text style={[styles.coinSubtitle, {color: priceChangeColor}]}>
            {priceChangePercentage7d.toFixed(3)}% 
          </Text>
          
        </View>
      </View>
    </TouchableOpacity>
  );
}


const styles=StyleSheet.create({
  itemWrapper:{
    paddingHorizontal:20,
    marginTop:24,
    flexDirection:"row",
    justifyContent :"space-between",
    alignItems:"center"
  },
  leftWrapper:{
    flexDirection:"row",
    alignItems:"center"
  },
  rightWrapper:{
    alignItems:"flex-end",
  },
  image:{
    height: 48,
    width:48
  },
  titleWrapper:{
    marginLeft:8,
  },
  coinTitle:{
    fontSize:18,
  },
  coinSubtitle:{
    marginTop:4,
    fontSize:14,
    color:"#A9ABB1"
  }
})

export default ListItem;