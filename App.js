
import React, { Component, Suspense } from 'react';
import { Text,StyleSheet } from 'react-native';


const List = React.lazy(async () => {
  await new Promise(resolve => setTimeout(resolve, 5 * 1000));
  return await import('./Recycler');
})

class App extends Component {
  render() {
    return (
      <Suspense fallback={
        <Text style={styles.loading}>
          Loading...
        </Text>}
      >
        <List />
      </Suspense>
    )
  }
}
export default App;



const styles=StyleSheet.create({
  loading:{ 
    textAlign: "center", 
    marginTop: 400, 
    color: "#3895D3", 
    fontSize: 25 
  }
})