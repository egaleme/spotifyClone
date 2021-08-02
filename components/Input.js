import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export function Input(props) {
  return (
    <View style={[styles.searchSection, props.container]}>
      <TextInput
        style={[styles.input, props.input]}
        value={props.value}
        onChangeText={props.onChangeText}
        secureTextEntry={props.secureTextEntry}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        keyboardType={props.keyboardType}
        multiline={props.multiline || false}
        editable={props.editable}
      />
      {props.icon ? (
        <TouchableOpacity onPress={props.toggle}>
          <Icon
            style={styles.searchIcon}
            name={props.secureTextEntry ? 'eye' : 'eye-off'}
            size={25}
            color="#fff"
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 58,
    borderRadius: 4,
    margin: 10,
    marginTop: 1,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 0,
    // backgroundColor: '#a1a1a1',
    color: '#ffffff',
  },
});
