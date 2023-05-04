import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";

export default class TransactionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domState: "normal",
      hasCameraPermissions: null,
      scanned: false,
      scannedData: ""
    };
  }

  getCameraPermissions = async domState => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      /*status === "granted" es verdadero cuando el usuario ha concedido el permiso.
          status === "granted" es falso cuando el usuario no ha concedido el permiso.
        */
      hasCameraPermissions: status === "granted",
      domState: domState,
      scanned: false
    });
  };

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scannedData: data,
      domState: "normal",
      scanned: true
    });
  };

  render() {
    const { domState, hasCameraPermissions, scannedData, scanned } = this.state;
    if (domState === "scanner") {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.lowerContainer}>
          <View style = {styles.textinputContainer}>
            <TextInput
            style={styles.textinput}
            placeholder={"Id del libro"}
            placeholderTextColor={"#FFFFFF"}
            value={bookId}
          />

        <Text style={styles.text}>
          {hasCameraPermissions ? scannedData : "Request for Camera Permission"}
        </Text>
        <TouchableOpacity
          style={[styles.button, { marginTop: 25 }]}
          onPress={() => this.getCameraPermissions("scanner")}
        >
          <Text style={styles.buttonText}>Escanea el código QR</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.textinputContainer, {marginTop:25}]} >
        <textInput
        style={styles.textinput}
        placeholder={"Id del alumno"}
        placeholderTextColor={"#FFFFFF"}
        value={studentId}
      />
      <TouchableOpacity
      style={styles.scanbutton}
      onPress={() => this.getCameraPermissions("studdentId")}
      >
        <Text style={style.scanbuttonText}>Escanear</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 15
  },
 
});
