import { useModel } from 'foca';
import React, { FC, memo } from 'react';
import { Button, StyleSheet, Text, View, TextStyle, ViewStyle } from 'react-native';
import { counterModel } from '../../models/counterModel';

const Counter: FC = () => {
  const count = useModel(counterModel, (state) => state.count);

  return (
    <View>
      <Text style={styles.counter}>{count}</Text>
      <View style={styles.body}>
        <Button title=" +1 " onPress={() => counterModel.add(1)} />
        <Button title=" +2 " onPress={() => counterModel.add(1, 1)} />
        <Button title=" -2 " onPress={() => counterModel.minus(2)} />
        <Button title=" x3 " onPress={() => counterModel.times(3)} />
        <Button title="重置" onPress={() => counterModel.reset()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create<{
  counter: TextStyle;
  body: ViewStyle;
}>({
  counter: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
  body: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default memo(Counter);
