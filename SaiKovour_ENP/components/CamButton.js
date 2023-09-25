import * as React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CamButton({title, onPressFunc, icon, color}){
    return(
        <TouchableOpacity onPress={onPressFunc} style={styles.button}>
            <MaterialCommunityIcons name={icon} color={color} size={35} />
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFFFFF',
        marginLeft: 10,
    }
})