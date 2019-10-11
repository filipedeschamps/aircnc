import React, { useState, useEffect } from 'react'
import { Alert, SafeAreaView, ScrollView, Image, StyleSheet, AsyncStorage } from 'react-native'
import socketio from 'socket.io-client'

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function List({ navigation }) {
    const [techs, setTechs] = useState([])

    useEffect(() => {
        AsyncStorage.getItem('user')
            .then((user_id) => {
                const socket = socketio('http://192.168.1.71:3333', {
                    query: { user_id }
                })

                socket.on('booking_response', booking => {
                    Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
                })
            })
    },[])

    useEffect(() => {
        AsyncStorage.getItem('techs')
            .then((storagedTechs) => {
                const techsArray = storagedTechs.split(',').map(tech => tech.trim())

                setTechs(techsArray)
            })
    },[])

    async function logout() {
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={logout}>
                <Image style={styles.logo} source={logo} />
            </TouchableOpacity>

            <ScrollView>
                { techs.map(tech=> <SpotList key={tech} tech={tech} /> )}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    logo: {
        height: 32,
        resizeMode: "contain"
    }
})