import { observer } from "mobx-react";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../components/Header";
import CustomButton from "../../components/Button";


export const CartScreen = observer(({ navigation }) => {
    return (
        <SafeAreaView>
            <CustomHeader titleOnHead={'My Cart'} navigation={navigation} />
            <View style={styles.adressView} >
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4, }} >
                        <Text style={styles.deliveryStatText}>Deliver to: Name and HOME </Text>
                        <CustomButton title={'Change'} buttonStyle={{ backgroundColor: 'white', borderWidth: 0.5 }} textStyle={{ color: '#00C0FF' }} />
                    </View>
                    <View>
                        <Text style={[styles.deliveryStatText, {fontSize: 16
                        } ]} >404-405 iLabs, Udyog Vihar Phase III, Gurugram, Hello World</Text>
                    </View>
                </View>
            </View>
            <View style={styles.straightLine} />
            <ScrollView>
                
            </ScrollView>
        </SafeAreaView>
    )
});

const styles = StyleSheet.create({
    straightLine: {
        // borderWidth: 0.5,
        borderBottomColor: 'grey',
        marginVertical: 15,
        shadowOpacity: 1,
        height: 10
    },
    deliveryStatText: {
        fontWeight: '500',
        fontSize: 18,
        color: 'gray',
        flexWrap: 'wrap',
    },
    adressView: {
        flexDirection: 'row', alignItems: "center", justifyContent: 'space-between', backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 5, width: '100%'
    }
})