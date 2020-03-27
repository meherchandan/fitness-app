import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {getMetricsMetaInfo, timeToString} from './../utils/helpers'
import FitnessSlider from './FitnessSlider';
import Stepper from './Stepper';
import DateHeader from './DateHeader';
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton';
function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>SUBMIT</Text>
        </TouchableOpacity>
    )
}
export default class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }
    increment = (metric) => {
        const {max, step} = getMetricsMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: count > max
                    ? max
                    : count
            }
        })

    }
    slide = (metric, value) => {
        this.setState(() => ({[metric]: value}))
    }
    decrement = (metric) => {
        const {step} = getMetricsMetaInfo(metric);
        this.setState((state) => {
            const count = state[metric] - step;
            return {
                ...state,
                [metric]: count < 0
                    ? 0
                    : count
            }
        })

    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;
        //update redux
        this.setState({run: 0, bike: 0, swim: 0, sleep: 0, eat: 0});
        //navigate to home, save to db, clear local notification

    }
    reset = () => {
        const key = timeToString();
        //update to redux navigate to home, save to db, clear local notification
    }
    render() {
        const metaInfo = getMetricsMetaInfo();
        if (true) {
            return (
                <View>
                    <Ionicons name="ios-happy" size={100}/>
                    <Text>You already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }
        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}></DateHeader>
                <Text>{JSON.stringify(this.state)}
                </Text>
                {Object
                    .keys(metaInfo)
                    .map((key) => {
                        const {
                            getIcon,
                            type,
                            ...rest
                        } = metaInfo[key];
                        const value = this.state[key];
                        return (
                            <View key={key}>
                                {getIcon()}
                                {type === "slider"
                                    ? <FitnessSlider
                                            value={value}
                                            onChange={(value) => this.slide(key, value)}
                                            {...rest}/>
                                    : <Stepper
                                        value={value}
                                        onIncrement={() => this.increment(key)}
                                        onDecrement={() => this.decrement(key)}
                                        {...rest}/>
}
                            </View>
                        )
                    })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}
