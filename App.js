import React, { useRef, useMemo , useState, useEffect } from 'react';
import { StyleSheet, Text, View , FlatList, SafeAreaView} from 'react-native';
import ListItem from './components/ListItem';
import {  BottomSheetModal,  BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Chart from './components/Chart';
import { getMarketData } from './services/cryptoService';

const ListHeader = () => (
  <>
      <View style={styles.headerWrapper}>
        <Text style= {styles.largeTitle} >Exchange</Text>
      </View>

      <View style={styles.hdivider}/>
  </>

)


export default function App() {
  const [data, setData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const bottomSheetModalRef = useRef(null);


  useEffect (() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData);
    }
    fetchMarketData();
  }, []);

  const snapPoints = useMemo(() => ['50%'], []);

  const openModal = (item) => {
    setSelectedCoin(item);
    bottomSheetModalRef.current.present();
  }

  return (
  
    <BottomSheetModalProvider>
    {/* SafeAreaView is only supported on iOS */}
      <SafeAreaView style={styles.container}>

        <FlatList
          data={data}
          keyExtractor={(item) => item.symbol}
          renderItem={({item}) => (    
              <ListItem
                name= {item.name}
                symbol = {item.symbol}
                currentPrice = {item.current_price}
                priceChangePercentage7d = {item.price_change_percentage_7d_in_currency}
                logourl = {item.image}
                onPress = {() => openModal(item)}
              />
          )}
          ListHeaderComponent={<ListHeader/>}
        /> 

      </SafeAreaView>

      <BottomSheetModal      
        ref={bottomSheetModalRef} 
        index={0}          
        snapPoints={snapPoints}          
        style = {styles.bottomSheet}
      >
        { selectedCoin ? (
        <Chart
          currentPrice={selectedCoin.current_price}
          logourl={selectedCoin.image}
          name={selectedCoin.name}
          priceChangePercentage7d={selectedCoin.price_change_percentage_7d_in_currency}
          sparkline={selectedCoin.sparkline_in_7d.price}
          symbol={selectedCoin.symbol}
          
        />
        ):null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  largeTitle: {
    fontSize:24,
    fontWeight: 'bold',
  },
  headerWrapper: {
    marginTop:80,
    paddingLeft:20,
  },
  hdivider:{
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#000",
    marginHorizontal: 20,
    marginTop:20,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset:{
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation:5,
  },
  contentContainer: {
    margin:8,
  },
});
