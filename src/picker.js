import React, { Component } from 'react';
import {
  ColorPropType,
  StyleSheet,
  View,
  ViewPropTypes as RNViewPropTypes,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import WheelCurvedPicker from './WheelCurvedPicker';

const ViewPropTypes = RNViewPropTypes || View.propTypes;

const PickerItem = WheelCurvedPicker.Item;

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'transparent',
    height: '100%',
  },
  pickerOverlay: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerLiner: {
    height: 35,
    width: '100%',
    // backgroundColor: 'rgba(0,0,255,0.5)',
    backgroundColor: 'transparent',
  },
  pickerContainer: {
    height: 220,
  },
});

export default class Picker extends Component {
  static propTypes = {
    textColor: ColorPropType,
    selectedTextColor: ColorPropType,
    itemLineColor: ColorPropType,
    textSize: PropTypes.number,
    gradient: PropTypes.bool,
    itemSpace: PropTypes.number,
    itemStyle: ViewPropTypes.style,
    onValueChange: PropTypes.func.isRequired,
    pickerData: PropTypes.array.isRequired,
    style: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    selectedValue: PropTypes.any,
  };

  static defaultProps = {
    textColor: '#333',
    selectedTextColor: '#000',
    gradient: true,
    itemLineColor: '#333',
    textSize: 26,
    itemSpace: 20,
    itemStyle: null,
    style: null,
    containerStyle: null,
  };

  state = {
    selectedValue: this.props.selectedValue,
  };

  handleChange = selectedValue => {
    this.setState({ selectedValue });
    this.props.onValueChange(selectedValue);
  };

  componentWillReceiveProps({ selectedValue }) {
    this.setState({ selectedValue });
  }

  render() {
    const { pickerData, style, containerStyle, ...props } = this.props;
    const containerStyleNew = { ...containerStyle, ...style };
    return (
      <View style={[styles.pickerContainer, containerStyleNew]}>
        <View style={styles.pickerOverlay}>
          <View style={styles.pickerLiner} />
        </View>
        <WheelCurvedPicker
          {...props}
          style={[styles.picker, style]}
          cyclic
          selectedValue={this.state.selectedValue}
          onValueChange={this.handleChange}>
          {pickerData.map((data, index) => (
            <PickerItem
              key={index}
              value={typeof data.value !== 'undefined' ? data.value : data}
              label={
                typeof data.label !== 'undefined' ? data.label : data.toString()
              }
            />
          ))}
        </WheelCurvedPicker>
      </View>
    );
  }

  getValue() {
    return this.state.selectedValue;
  }
}
