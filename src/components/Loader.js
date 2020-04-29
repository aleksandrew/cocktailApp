// outsource dependencies
import React, { memo } from 'react';
import { Content, Spinner } from 'native-base';
import { Image, StyleSheet } from 'react-native';

// local dependencies


export default Loader = memo(() => (
    <Content contentContainerStyle={styles.container}>
      <Spinner color="red"/>
    </Content>
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
