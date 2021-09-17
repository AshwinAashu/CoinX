import { StatusBar } from 'expo-status-bar';
import React, { useRef, useMemo } from 'react';
import { StyleSheet, Text, View , FlatList, SafeAreaView} from 'react-native';
import ListItem from './components/ListItem';
import {SAMPLE_DATA} from './assets/data/SampleData';
import {  BottomSheetModal,  BottomSheetModalProvider } from '@gorhom/bottom-sheet';


const ListHeader = () => (
  <>
      <View style={styles.headerWrapper}>
        <Text style= {styles.largeTitle} >Exchange</Text>
      </View>

      <View style={styles.hdivider}/>
  </>

)


export default function App() {

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ['25%'], []);
  //callback to the modal to open and close
  // const handlePresentModalPress = useCallback(() => {    bottomSheetModalRef.current?.present();  }, []);  
  // const handleSheetChanges = useCallback((index: number) => {    console.log('handleSheetChanges', index);  }, []);



  return (
  
    <BottomSheetModalProvider>
    {/* SafeAreaView is only supported on iOS */}
      <SafeAreaView style={styles.container}>

        <FlatList
          data={SAMPLE_DATA}
          keyExtractor={(item) => item.symbol}
          renderItem={({item}) => (    
              <ListItem
                name= {item.name}
                symbol = {item.symbol}
                currentPrice = {item.current_price}
                priceChangePercentage7d = {item.price_change_percentage_7d_in_currency}
                logourl = {item.image}
              />
          )}
          ListHeaderComponent={<ListHeader/>}
        /> 

      </SafeAreaView>

      <BottomSheetModal      
        ref={bottomSheetModalRef} 
        index={0}          
        snapPoints={snapPoints}          
        
      >

        <View style={styles.contentContainer}>            
          <Text>Awesome 🎉</Text>          
        </View>

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
  }
});
