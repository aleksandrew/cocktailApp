// outsource dependencies
import _ from 'lodash';
import {FlatList, Image, SafeAreaView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import React, {memo, useEffect, useCallback, useMemo} from 'react';
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
  const setData = useCallback(() => dispatch({type: TYPES.SET_DATA}), [dispatch]);

  // state
  const {data, loading, category} = useSelector(state => selector(state));

  useEffect(() => {
    if (!data) setData('cocoa', 0);

    navigation.setOptions({
      headerRight: () => (
        <Button style={styles.btn} transparent onPress={() => navigation.navigate(ROUTES.FILTERS)} title="Open filters">
          <Icon name='filter' size={25}/>
        </Button>
      ),
    });
  }, [setData, navigation]);
  console.log(data)

  const dataDrinks = useMemo(() =>
    _.map(data, item => ({
      id: item.idDrink,
      name: item.strDrink,
      uri: {uri: item.strDrinkThumb},
    })), [data]
  );

  return (
    <Container>
      {/*{loading*/}
      {/*? <Loader />*/}
      {/*: <Content>*/}
      {/*<List>*/}
      {/*<ListItem noBorder>*/}
      {/*<Text style={styles.text}>{category}</Text>*/}
      {/*</ListItem>*/}
      {/*{*/}
      {/*_.map(dataDrinks, ({id, name, uri}) => (*/}
      {/*<ListItem key={id} style={styles.list} noBorder thumbnail>*/}
      {/*<Left>*/}
      {/*<Thumbnail square style={styles.img} source={uri}/>*/}
      {/*</Left>*/}
      {/*<Body>*/}
      {/*<Text style={styles.text}>{name}</Text>*/}
      {/*</Body>*/}
      {/*</ListItem>*/}
      {/*))*/}
      {/*}*/}
      {/*</List>*/}
      {/*</Content>*/}
      {/*}*/}
      <SafeAreaView style={{flex: 1}}>
        {loading
          ? <Loader/>
          : <FlatList
              // extraData={this.state}
              data={dataDrinks}
              enableEmptySections={true}
              keyExtractor={(item, id) => item.id.toString()}
              renderItem={({item}) => (
                <ListItem key={item.id} style={styles.list} noBorder thumbnail>
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
    marginBottom: 20,
  },
});
