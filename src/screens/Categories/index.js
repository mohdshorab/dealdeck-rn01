import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useStore } from "../../store";
import { observer } from "mobx-react";

const Categories = observer(({route}) => {
    const { category } = route.params;
    const { products } = useStore();
    const [productsOfCat, setProductsOfCat] = useState([])

    useEffect( () => {
        getTheProducts()
    }, [])

    const getTheProducts = async () => {
        const res = await products.loadProductsOfCategory(category);
        console.log(res)

        res && res.length > 0 ? setProductsOfCat(res) : null;
    }
    

    return (
        <>
        </>
        // <Text>{productsOfCat[0].brand}ss</Text>
    )
});

export default Categories;