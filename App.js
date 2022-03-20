import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Route, Switch} from "react-router-native";
import Home from './a/home';
import Record from "./a/record.js";
import Test from "./a/test.js";
export  default() =>(
<NativeRouter>
<View style={styles.container}>
  <Switch>
  <Route path={"/"} exact component={Home}/>
  <Route exact path="/Record" component={Record} />
  <Route exact path="/test" component={Test} />
  </Switch>
      </View> 
</NativeRouter>

)

const styles = StyleSheet.create({
  container: {
    flex: 1,
        backgroundColor: "#ef8172",  
    alignItems: "center",
    justifyContent: "center"
    }

});