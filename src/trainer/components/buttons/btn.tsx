import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    title: string;
    onPress?: () => void; 
};

export default function Btn({ title, onPress }: Props){

    return(
        <TouchableOpacity style={styles.btn} onPress={onPress} >
            <Text style={styles.textBtn}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
        btn:{
            width:'100%',
            height:45,
            display:"flex",
            justifyContent:'center',
            alignItems:'center',
            marginTop:5,
            marginBottom:5,
            borderRadius:8,
            backgroundColor:"#5500EF",
        },
        textBtn:{
            color:"#fff",
            fontSize:18,
            fontWeight: 400,
        },
})  