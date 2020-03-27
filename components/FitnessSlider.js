import React from 'react'
import {View, Text, Slider} from 'react-native'

export default function FitnessSlider({max, unit, step, onChange, value}) {
    return (
        <View>
            <Slider
                step={step}
                maximumValue={max}
                value={value}
                minimumValue={0}
                onValueChange={onChange}/>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}
