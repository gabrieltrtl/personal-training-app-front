import React from "react";
import { Text, TouchableOpacity, StyleSheet, ViewStyle, Image } from 'react-native'

interface GenericCardProps {
  title: string;
  subtitle?: string;
  onPress: () => void;
  style?: ViewStyle;
  textColor?: string;
  img: string,
}

const imagens: Record<string, any> = {
  icone1: require("../../assets/imagens/apple.png"),
  icone2: require("../../assets/imagens/education-cap.png"),
  icone3: require("../../assets/imagens/check-user.png"),
  icone4: require("../../assets/imagens/report.png"),
  icone5: require("../../assets/imagens/muscle.png"),
  icone6: require("../../assets/imagens/force.png"),
  icone7: require("../../assets/imagens/exercise.png"),
}


export default function GenericCard({
  title,
  subtitle,
  onPress,
  style,
  textColor,
  img
}: GenericCardProps) {
  const imgSelected = imagens[img];
  
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>

     {imgSelected && (
        <Image source={imgSelected} style={styles.thumbnail} />
      )}
      
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
    borderBottomColor:'#5500ef',
    borderBottomWidth:6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop:5,
  },
  subtitle: {
    fontSize: 10,
  },
   thumbnail:{
    width:50,
    height:50,
    objectFit:'cover',
  },
});