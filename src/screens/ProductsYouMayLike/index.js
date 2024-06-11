import { observer } from "mobx-react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MasonryTiles } from "../../components/Mansory";
import CustomHeader from "../../components/Header";
import { useStore } from "../../store";

export const ProductsYouMayLike = observer(({ navigation }) => {
    const { auth, products } = useStore();

    return (
        <SafeAreaView style={styles.safeArea}>
            <CustomHeader titleOnHead={'Products you may like'} navigation={navigation} showCart />
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.push('ProductDetail', { productData: products.randomProduct[0] });
                    }}
                    style={styles.featuredProduct}
                >
                    <Image source={{ uri: products.randomProduct[0].thumbnail }} style={styles.featuredImage} resizeMode="cover" />
                    <Text style={styles.featuredTitle}>{products.randomProduct[0].title}</Text>
                    <Text style={styles.featuredDescription}>{products.randomProduct[0].description}</Text>
                </TouchableOpacity>
                {products.randomProduct.map((item, index) => {
                    if (index % 2 === 0) {
                        const nextItem = products.randomProduct[index + 1];
                        return (
                            <View style={styles.rowContainer} key={item.id}>
                                <MasonryTiles product={item} navigation={navigation} />
                                {nextItem && <MasonryTiles product={nextItem} navigation={navigation} />}
                            </View>
                        );
                    }
                })}
                {/* <View style={styles.bottomSpacer} /> */}
            </ScrollView>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        width: '95%',
        alignSelf: 'center',
    },
    featuredProduct: {
        height: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 25,
        padding: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    featuredImage: {
        height: 200,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    featuredTitle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        color: '#333',
        fontSize: 20,
        marginVertical: 10,
    },
    featuredDescription: {
        fontWeight: '500',
        color: '#666',
        fontSize: 14,
        marginBottom: 5,
        alignSelf: 'center',
        textAlign: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    bottomSpacer: {
        height: 80,
    },
});

