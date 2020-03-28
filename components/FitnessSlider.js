import React from 'react'
import {View, Text, Slider, Platform, StyleSheet} from 'react-native'
import {gray} from './../utils/colors';
export default function FitnessSlider({max, unit, step, onChange, value}) {
    return (
        <View style={styles.row}>
            <Slider
                style={{
                flex: 1
            }}
                step={step}
                maximumValue={max}
                value={value}
                minimumValue={0}
                onValueChange={onChange}/>
            <View style={styles.metric}>
                <Text
                    style={{
                    fontSize: 24,
                    textAlign: "center"
                }}>{value}</Text>
                <Text
                    style={{
                    fontSize: 24,
                    color: gray
                }}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    metric: {
        width: 85,
        justifyContent: "center",
        alignItems: "center"
    }
})