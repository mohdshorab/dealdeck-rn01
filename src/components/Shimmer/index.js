import React from "react";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient';
import { View } from "react-native";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


export const SkeletonLoader = ({ type, leftMargin, row, height, shimmerWidth, size, square }) => {
    if (type == 'circle') {
        return (
            <View style={{ alignItems: 'center', marginRight: 10, width:shimmerWidth? shimmerWidth: null }} >
                <ShimmerPlaceholder
                    style={{
                        width: size ? size : 40,
                        height: size ? size : 40,
                        borderRadius: square ? 0 : 50
                    }}
                    shimmerColors={["#d9d9d9", "#f2f2f2", "#d9d9d9"]}
                >
                </ShimmerPlaceholder>
            </View>
        )
    }
    if (type == 'square') {
        return (
            <View style={{ alignItems: 'center', marginRight: 10 }} >
                <ShimmerPlaceholder
                    style={{
                        width: size ? size : 40,
                        height: size ? size : 40,
                        // borderRadius: square ? 0 : 50
                    }}
                    shimmerColors={["#d9d9d9", "#f2f2f2", "#d9d9d9"]}
                >
                </ShimmerPlaceholder>
            </View>
        )
    }
    else if (type == undefined || type == 'rectangle') {
        for (i = 0; i < row ? row : 1; i++) {
            return (
                <View style={{ width: '100%', marginTop: 5, alignItems: 'center',width:shimmerWidth? shimmerWidth: null,  }} >
                    <ShimmerPlaceholder
                        style={{
                            width: size ? size : '100%',
                            height: height ? height : 10,
                            marginLeft: leftMargin ? leftMargin : 0,
                            marginBottom: 7 // Add marginBottom for spacing
                        }}
                        shimmerColors={["#d9d9d9", "#f2f2f2", "#d9d9d9"]}
                    >
                    </ShimmerPlaceholder>
                </View>
            )
        }

    }
}