import react from 'react'
import {View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

export default function ExerciseListAlternate(){
    return(
      
            <ScrollView style={{padding:5}}>
                    <View style={styles.box}>
                         <View  style={styles.columnLeft}>
                          <LottieView source={require('../../../../assets/imagens/AnimationLogin.json')}  autoPlay loop style={{ width: 100, height: 100 }}/>
               
                         </View>

                         <View  style={styles.columnRight}>
                            <Text style={styles.title}>Supino Reto</Text>
                            <View style={styles.ExerciseIndicator}>
                                  <Text style={styles.subtitle}>Series {'\n'} <Text style={styles.indicator}>x2</Text></Text>
                                  <Text style={styles.subtitle}>Repetições {'\n'} <Text style={styles.indicator}>x12</Text></Text>
                                  <Text style={styles.subtitle}>Carga {'\n'} <Text style={styles.indicator}>-</Text></Text>
                            </View>
                           
                         </View>
                    </View>
            </ScrollView>

    )

}



const styles = StyleSheet.create({
 box: {
  display: 'flex', // pode ser omitido no React Native, já é padrão
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#fff',
  padding: 5,
  borderRadius: 12,
  elevation: 2, 
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 0 }, // sombra em todas as direções
  shadowOpacity: 0.2,
  shadowRadius: 6,
  marginTop:5,
},
    columnLeft:{
        width:'30%',
        overflow:'hidden',
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    columnRight:{
        width:'68%',
        overflow:'hidden',
         display:'flex',
        justifyContent:'flex-start',
        alignItems:'flex-start',

    },
      thumbnail:{
        width:65,
        height:65,
        objectFit:'contain'
    },
    title:{
        fontSize: 20,
        fontWeight: 600,
       
    },
    subtitle:{
        fontSize: 14,
        fontWeight: 400,
         marginTop:10,
         display:'flex',
         justifyContent:"center",
         alignItems:'center',
         color:"#bab1b1"
    },
    ExerciseIndicator:{
        width:"100%",
        display:"flex",
        flexDirection:'row',
        gap:10,
        marginTop:15,
    },
    indicator:{
        color:"#000",
          fontSize: 22,
        fontWeight: 600,
    },

})