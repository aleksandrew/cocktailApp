// outsource dependencies
import _ from 'lodash';
import {connect} from 'react-redux';
import {useDispatch, useSelector} from 'react-redux';
import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Button, CheckBox, Footer, FooterTab, Left, ListItem, Right, Text} from 'native-base';

// local dependencies
import {TYPES} from "../constans/types";
import {selector as filterSelector} from '../store/filter';
import {selector as appSelector} from '../store/app';
import Loader from '../components/Loader';
import {ROUTES} from "../constans/routes";


export default Filter = memo(({navigation}) => {
  // dispatch
  const dispatch = useDispatch();
  const getDataList = useCallback(() => dispatch({type: TYPES.GET_DATA_FILTER}), [dispatch]);
  const setCategory = useCallback((payload) => dispatch({ type: TYPES.CALL_CATEGORY, payload }), [dispatch]);
  const getData = useCallback((currentCategory) => dispatch({type: TYPES.SET_DATA, currentCategory}), [dispatch]);

  // state
  const {category} = useSelector(appSelector);
  const {data, loading} = useSelector(filterSelector);

  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (category) {
      setSelected(category);
    }

    getDataList();
  }, [category, getDataList]);

  const onSubmit = useCallback(() => {
    getData(selected[0]);
    setCategory(selected);
    navigation.navigate(ROUTES.DRINKS);
  }, [selected, getData, setCategory, navigation]);

  const dataCategory = useMemo(() =>
    _.map(data, item => ({
      name: item.strCategory,
    })), [data]
  );

  const onCheckBoxPress = useCallback(id => {
    let tmp = selected;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }

    return setSelected([...tmp])
  }, [selected]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {loading
        ? <Loader/>
        : <>
          <FlatList
            data={dataCategory}
            enableEmptySections={true}
            keyExtractor={(item, id) => id.toString()}
            renderItem={({item}) => (
              <ListItem noBorder onPress={() => onCheckBoxPress(item.name)}>
                <Left>
                  <Text>{item.name}</Text>
                </Left>
                <Right>
                  <CheckBox
                    checked={selected.includes(item.name)}
                    onPress={() => onCheckBoxPress(item.name)}
                  />
                </Right>
              </ListItem>
            )}
          />
          <Footer>
            <FooterTab>
              <Button full onPress={onSubmit}>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </>
      }
    </SafeAreaView>
  )
});

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});
