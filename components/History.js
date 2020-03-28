import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {addEntry, receiveEntries} from './../actions';
import {timeToString, getDailyReminderValue} from './../utils/helpers'
import {fetchCalendarresults} from './../utils/api'
import {connect} from 'react-redux';

class History extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        fetchCalendarresults().then((entries) => dispatch(receiveEntries(entries))).then(({entries}) => {
            if (!entries[timeToString()]) {
                dispatch(addEntry({
                    [timeToString()]: getDailyReminderValue()
                }))
            }
        })

    }

    render() {
        return (
            <Text>{JSON.stringify(this.props)}</Text>
        )
    }
}

function mapStateToProps(entries) {
    return {entries}
}

export default connect(mapStateToProps)(History)