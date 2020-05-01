// outsource dependencies
import _ from 'lodash';
import {FlatList, Image, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {memo, useState, useEffect, useCallback, useMemo} from 'react';
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail
} from 'native-base';

// local dependencies
import {selector} from '../store/app';
import {TYPES} from '../constans/types';
import Loader from '../components/Loader';
import {ROUTES} from '../constans/routes';
import Icon from 'react-native-vector-icons/FontAwesome';


export default Home = memo(({navigation}) => {
  // dispatch
  const dispatch = useDispatch();
  const getALLCategory = useCallback(() => dispatch({type: TYPES.GET_CATEGORY}), [dispatch]);
  const setData = useCallback((currentCategory) => dispatch({type: TYPES.SET_DATA, currentCategory}), [dispatch]);

  // state
  const {data, loading, category} = useSelector(state => selector(state));

  const [currentPosition, setCurrentPosition] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if ( !category ) {
      getALLCategory()
    }
    // setData(category[0]);

    navigation.setOptions({
      headerRight: () => (
        <Button style={styles.btn} transparent onPress={() => navigation.navigate(ROUTES.FILTERS)} title="Open filters">
          <Icon name='filter' size={25}/>
        </Button>
      ),
    });
  }, [setData, navigation]);

  const handleLoad = useCallback(() => {
    const categoryLenght = category.length;
    const nextPosition = currentPosition + 1;
    const nextCategory = category[nextPosition];

    if (currentPosition < categoryLenght) {
      setCurrentPosition(nextPosition);
      setRefreshing(true);
      setData(nextCategory);
    }
  }, []);

  const _handleLoadMore = useCallback(() => {
    const categoryLenght = category.length;
    const nextPosition = currentPosition + 1;
    const nextCategory = category[nextPosition];

    if (currentPosition < categoryLenght) {
      setCurrentPosition(nextPosition);
      setRefreshing(true);
      setData(nextCategory);
    }
  });

  const dataDrinks = useMemo(() =>
    _.map(data, item => ({
      name: item.strDrink,
      isTitle: item.isTitle,
      id: item.idDrink.toString(),
      uri: {uri: item.strDrinkThumb},
    })), [data]
  );

  return (
    <Container>
      <SafeAreaView style={{flex: 1}}>
        {loading
          ? <Loader/>
          : <FlatList
            extraData={dataDrinks}
            data={dataDrinks}
            // enableEmptySections={true}
            onEndReached={_handleLoadMore}
            // onRefresh={handleLoad}
            // refreshing={loading} //
            // style={{ width: '100%' }}
            // onEndThreshold={0}
            onEndReachedThreshold={0.5}
            // initialNumToRender={10}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => (
              item.isTitle
                ? <ListItem style={styles.listTitle} noBorder>
                <Text style={styles.text}>{item.name}</Text>
                </ListItem>
                : <ListItem style={styles.list} noBorder thumbnail>
                  <Left>
                    <Thumbnail square style={styles.img} source={item.uri}/>
                  </Left>
                  <Body>
                  <Text style={styles.text}>{item.name}</Text>
                  </Body>
                </ListItem>
            )}
          />
        }
      </SafeAreaView>
    </Container>
  );
});

const styles = StyleSheet.create({
  btn: {
    marginRight: 5,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    color: "#9B9A97",
  },
  img: {
    width: 100,
    height: 100,
  },
  list: {
    margin: 10,
  },
});
