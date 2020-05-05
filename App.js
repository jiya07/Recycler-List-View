
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";

class App extends Component {
  constructor(props) {
    super(props);
    let { width } = Dimensions.get("window");
    this.state = {
      dataProvider: new DataProvider((r1, r2) => {
        return r1 !== r2
      }),
      data: [],
      page: 0,
      isLoading: false
    }
    this._layoutProvider = new LayoutProvider(
      index => { return 0 },
      (type, dim) => {
        switch (type) {
          default:
            dim.width = width;
            dim.height = 200;
            break;
        }
      }
    );

    this._rowRenderer = this._rowRenderer.bind(this);
    
  
  }
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/comments?_page=' + this.state.page
    this.setState({ isLoading: true })
    setTimeout(() => {
      fetch(apiUrl).then(responseJson => responseJson.json()).then(responseJson => {
        this.setState({
          data: [...this.state.data, ...responseJson],
          dataProvider: this.state.dataProvider.cloneWithRows(this.state.data),
          isLoading: false
        })
      })
    }, 2000)

  }

  _rowRenderer(type, data) {
    switch (type) {
      default:
        return (
          <View style={styles.itemContainer}>
            <View style={styles.box}>
              <Text style={styles.itemHead}>PostId : </Text>
              <Text style={styles.item}>{data.postId}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.itemHead}>Id : </Text>
              <Text style={styles.item}>{data.id}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.itemHead}>Name : </Text>
              <Text style={styles.item}>{data.name}</Text>
            </View>

            <View style={styles.box}>
              <Text style={styles.itemHead}>Email : </Text>
              <Text style={styles.item}>{data.email}</Text>
            </View>

          </View>
        );
    }
  }
  handleEnd = () => {

    this.setState({
      page: this.state.page + 1,
      isLoading: true
    }, () => this.getData())


  }
  handleFooter = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{ height: "80%" }}>
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
            onEndReached={() => this.handleEnd()}
            onEndReachedThreshold={100}
            renderFooter={() =>this.handleFooter()}
          />
        </View>
      </ScrollView>
    );

  }
}
export default App;

const styles = StyleSheet.create({
  heading: {
    paddingTop: 50,
    alignItems: "center",
    backgroundColor:"#0052a2",
    paddingHorizontal:15
  },
  headingText: {
    fontSize: 25,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color:"#fff"
  },
  list: {
    flex: 1,
    height: 2000,
    justifyContent:"center",
    marginTop: 15,
    marginRight:5
  },
  itemHead: {
    fontSize: 18,
    fontWeight:"600",
    margin: 3,
    textAlign: "center",
    marginBottom: 10,
  },
  item: {
    fontSize: 15,
    margin: 3,
    paddingRight:3,
    marginBottom: 10,
  },
  itemContainer: {
    marginHorizontal: 15,
    backgroundColor:"#f8f8f8",
    borderRadius:10,
    padding:5,
    shadowOffset:{  width: 1,  height: 1},
    shadowColor: '#d4d4d4',
    shadowOpacity: 1.0,
  },
  box:
  {
    flexDirection:"row",
    alignItems:"center"
  },
  loader: {
    marginBottom: 20,
    justifyContent:"center"
  }

})