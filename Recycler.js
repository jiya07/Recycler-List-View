import React, { Component } from 'react';
import { View, Text, Dimensions, ScrollView,StyleSheet } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";


export default class Recycler extends Component {

    state = {
        data: []
    }

    constructor() {
        super();
        let { width } = Dimensions.get("window");

        this.state = {
            dataProvider: new DataProvider((r1, r2) => {
                return r1 !== r2
            })
        }

        this._layoutProvider = new LayoutProvider(
            index => { return 0 },
            (type, dim) => {
                switch (type) {
                    default:
                        dim.width = width;
                        dim.height = 220;
                        break;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_start=0&_end=30');
        const responseJson = await response.json();
        this.setState({
            dataProvider: this.state.dataProvider.cloneWithRows(responseJson)
        });
    }

    _rowRenderer(type, data) {
        switch (type) {
            default:
                return (
                    <View style={styles.itemContainer}>
                        <Text style={styles.items}>PostId : {data.postId}</Text>
                        <Text style={styles.items}>Id : {data.id}</Text>
                        <Text style={styles.items}>Name : {data.name}</Text>
                        <Text style={styles.items}>Email : {data.email}</Text>
                        <Text style={styles.items}>Body : {data.body}</Text>
                    </View>
                );
        }
    }

    render() {
        return (
            <ScrollView >
                <View style={styles.heading}>
                    <Text style={styles.headingText}>
                        Recycler List Using API Integration
                    </Text>
                </View>
                <View style={styles.list}>
                    <RecyclerListView 
                        layoutProvider={this._layoutProvider} 
                        dataProvider={this.state.dataProvider} 
                        rowRenderer={this._rowRenderer} 
                    />
                </View>
            </ScrollView>
        )
            ;

    }
}

const styles=StyleSheet.create({
    heading:{
        marginTop: 50, 
        alignItems: "center", 
        marginHorizontal: 15 
    },
    headingText:{ 
        fontSize: 25, 
        fontWeight: "600", 
        textAlign: "center" 
    },
    list:{ 
        flex: 1, 
        height: 2000, 
        justifyContent: 
        "center", 
        marginTop: 15 
    },
    items:{
        fontSize: 15, 
        margin: 3 
    },
    itemContainer:{
        margin:15
    }

})