import React, { useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native'
import DatePicker from 'react-native-date-picker'

export const CustomDatePicker = ({ confirmDate }) => {
    const currentDate = new Date()
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(currentDate);

    const handleDate = (date) => {
        setDate(date)
        confirmDate(date)
        setOpen(false);
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => setOpen(true)}
            >
                {date == currentDate
                    ?
                    <Text style={styles.dateStringText} >Select Date</Text>
                    :
                    <Text style={styles.dateStringText} >{date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}</Text>
                }
            </TouchableOpacity>
            <DatePicker
                modal
                open={open}
                date={date}
                minimumDate={currentDate}
                mode='date'
                onConfirm={(date) => handleDate(date)}
                onCancel={() => {
                    setOpen(false)
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    dateStringText: {
        color: 'blue',
        fontWeight: '500',
        fontSize: 16
    }
})