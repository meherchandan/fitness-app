import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Platform, StyleSheet} from 'react-native';
import {getMetricMetaInfo, timeToString} from './../utils/helpers'
import FitnessSlider from './FitnessSlider';
import Stepper from './Stepper';
import DateHeader from './DateHeader';
import {Ionicons} from '@expo/vector-icons'
import TextButton from './TextButton';
import {submitEntry, removeEntry} from './../utils/api';
import {connect} from 'react-redux';
import {receiveEntries, addEntry} from './../actions';
import {getDailyReminderValue} from './../utils/helpers';
import {purple, white} from './../utils/colors'
function SubmitBtn({onPress}) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={Platform.OS == 'ios'
            ? styles.iosSubmitBtn
            : styles.androidSubmitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
        </TouchableOpacity>
    )
}
class AddEntry extends Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }
    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric);
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
        const {step} = getMetricMetaInfo(metric);
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
        this
            .props
            .dispatch(addEntry({[key]: entry}));
        submitEntry({key, entry});
        this.setState({run: 0, bike: 0, swim: 0, sleep: 0, eat: 0});
        //navigate to home,, clear local notification

    }
    reset = () => {
        const key = timeToString();
        removeEntry(key);
        this
            .props
            .dispatch(addEntry({[key]: getDailyReminderValue()}))
        //update to redux navigate to home,  clear local notification
    }
    render() {
        const metaInfo = getMetricMetaInfo();
        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons
                        name={Platform.OS == 'ios'
                        ? "ios-happy"
                        : "md-happy"}size={100}/>
                    <Text>You already logged your information for today</Text>
                    <TextButton
                        style={{
                        padding: 10
                    }}
                        onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}></DateHeader>
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
                            <View key={key} style={styles.row}>
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
const mapStateToProps = (state, ownProps) => {
    const key = timeToString();
    return {
        alreadyLogged: state[key] && state[key].today == undefined
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40
    },
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2,
        height: 45,
        alignSelf: "flex-end",
        justifyContent: "center",
        alignItems: "center"
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: "center"
    },
    row: {
        flexDirection: "row",
        flex: 1,
        alignItems: "center"
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 30,
        marginLeft: 30
    }
})
export default connect(mapStateToProps)(AddEntry)