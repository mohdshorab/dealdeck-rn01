import { observer } from "mobx-react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Platform, TouchableOpacity } from "react-native";
import { MasonryTiles } from "../../components/Mansory/masonryTiles";
import CustomHeader from "../../components/Header";
import { useStore } from "../../store";

export const ProductsYouMayLike = observer(({ navigation }) => {
    const { auth, products } = useStore();

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }} >
            <CustomHeader titleOnHead={'Products you may like'} navigation={navigation} showCart />
            <ScrollView style={{ width: '95%', alignSelf: 'center' }} >
                {/* <Text style={{ color: 'black', fontSize: 20, fontWeight: '500', marginVertical: 20 }} >Products you may like</Text> */}
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('ProductDetail', { productData: products.randomProduct[0] })
                    }}
                    style={{
                        height: 300, borderRadius: 10, borderWidth: 1, marginBottom: 25, padding:10, 
                    }} >
                    <Image source={{ uri: products.randomProduct[0].thumbnail }} style={{ height: 200, width: '100%', borderTopLeftRadius: 25, borderTopRightRadius: 25 }} resizeMode="cover" />
                    <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'black', fontSize: 20, marginVertical: 10 }} >{products.randomProduct[0].title}</Text>
                    <Text style={{ fontWeight: '500', color: 'black', fontSize: 14, marginBottom: 5, alignSelf: 'center', }} >{products.randomProduct[0].description}</Text>
                </TouchableOpacity>
                {
                    products.randomProduct.map((item, index) => {
                        if (index % 2 === 0) {
                            const nextItem1 = products.randomProduct[index + 1];
                            return (
                                <View style={styles.rowContainer} key={item.id}>
                                    <MasonryTiles product={item} navigation={navigation} />
                                    {nextItem1 && (
                                        <MasonryTiles
                                            product={nextItem1}
                                            index={index}
                                            navigation={navigation}
                                        />
                                    )}
                                </View>
                            );
                        }
                    })}
            </ScrollView>
        </SafeAreaView>
    )
});

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10, // Adjust the spacing between rows if needed
    },



})