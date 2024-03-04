/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {colors, styles} from '../config/theme/app-theme';
import {CalculatorBtn} from '../components/CalculatorBtn';
import {useCalculator} from '../hooks/useCalculator';

export const CalculatorScreen = () => {
  const {
    prevNumber,
    formula,
    buildNumber,
    clean,
    del,
    toggleSign,
    addOperator,
    subtractOperator,
    multilyOperator,
    divideOperator,
    calculateResult,
  } = useCalculator();
  return (
    <View style={styles.calculatorContainer}>
      <View style={{paddingHorizontal: 30, paddingBottom: 20}}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.mainResult}>
          {formula}
        </Text>
        {formula === prevNumber ? (
          <Text style={styles.subResult}> </Text>
        ) : (
          <Text style={styles.subResult}>
            {prevNumber === '0' ? ' ' : prevNumber}
          </Text>
        )}
      </View>
      <View style={styles.row}>
        <CalculatorBtn
          onPress={() => clean()}
          blackText
          label={'C'}
          color={colors.lightGray}
        />
        <CalculatorBtn
          onPress={() => toggleSign()}
          blackText
          label={'+/-'}
          color={colors.lightGray}
        />
        <CalculatorBtn
          onPress={() => del()}
          blackText
          label={'del'}
          color={colors.lightGray}
        />
        <CalculatorBtn
          onPress={divideOperator}
          label={'÷'}
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorBtn onPress={() => buildNumber('7')} label={'7'} />
        <CalculatorBtn onPress={() => buildNumber('8')} label={'8'} />
        <CalculatorBtn onPress={() => buildNumber('9')} label={'9'} />
        <CalculatorBtn
          onPress={multilyOperator}
          label={'x'}
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorBtn onPress={() => buildNumber('4')} label={'4'} />
        <CalculatorBtn onPress={() => buildNumber('5')} label={'5'} />
        <CalculatorBtn onPress={() => buildNumber('6')} label={'6'} />
        <CalculatorBtn
          onPress={subtractOperator}
          label={'-'}
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorBtn onPress={() => buildNumber('1')} label={'1'} />
        <CalculatorBtn onPress={() => buildNumber('2')} label={'2'} />
        <CalculatorBtn onPress={() => buildNumber('3')} label={'3'} />
        <CalculatorBtn
          onPress={addOperator}
          label={'+'}
          color={colors.orange}
        />
      </View>
      <View style={styles.row}>
        <CalculatorBtn onPress={() => buildNumber('0')} label={'0'} dobleSize />
        <CalculatorBtn onPress={() => buildNumber('.')} label={'.'} />
        <CalculatorBtn
          onPress={calculateResult}
          label={'='}
          color={colors.orange}
        />
      </View>
    </View>
  );
};
