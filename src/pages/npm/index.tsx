import { useLoading, useModel } from 'foca';
import React, { FC, memo, useEffect, useState } from 'react';
import { Button, StyleSheet, Switch, Text, TextStyle, View, ViewStyle } from 'react-native';
import { npmMarkModel } from '../../models/npmMarkModel';
import { npmModel } from '../../models/npmModel';

const Index: FC = () => {
  const [current, setCurrent] = useState('');
  const pkg = useModel(npmModel, (state) => state[current]);
  const loading = useLoading(npmModel.search);
  const marks = useModel(npmMarkModel);
  const markings = useLoading(npmMarkModel.toggle.assign);

  useEffect(() => {
    current && npmModel.search(current);
  }, [current]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.tagWrapper}>
        <Text>搜索：</Text>
        {['react', 'vue', 'redux', 'mobx', 'angular'].map((key) => (
          <Button key={key} title={key} onPress={() => setCurrent(key)} />
        ))}
      </View>
      <Text style={{ fontSize: 22 }}>
        {current}
        {loading && <Text style={styles.loading}>&nbsp;&nbsp;Loading...</Text>}
      </Text>
      {pkg &&
        Object.entries(pkg['dist-tags']).map(([tag, version]) => {
          const key = npmMarkModel.combineKey(pkg.name, tag);
          return (
            <View style={styles.versionWrapper} key={key}>
              <Text>
                {version}@{tag}
              </Text>
              <Switch
                value={marks.includes(key)}
                onValueChange={() => npmMarkModel.toggle.assign(key).execute(pkg.name, tag)}
                disabled={markings.find(key)}
              />
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create<{
  wrapper: ViewStyle;
  tagWrapper: ViewStyle;
  versionWrapper: ViewStyle;
  loading: TextStyle;
}>({
  wrapper: {
    padding: 20,
  },
  tagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionWrapper: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loading: {
    color: 'green',
  },
});

export default memo(Index);
