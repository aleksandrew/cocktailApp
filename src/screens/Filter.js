// outsource dependencies
import {connect} from 'react-redux';
import React, {PureComponent} from 'react';
import {FlatList, SafeAreaView, StyleSheet} from 'react-native';
import {Button, CheckBox, Footer, FooterTab, Left, ListItem, Right, Text} from 'native-base';

// local dependencies
import {TYPES} from "../constans/types";
import {selector} from '../store/filter';
import Loader from '../components/Loader';
import {ROUTES} from "../constans/routes";


class Filter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }

  componentDidMount() {
    if (this.props.category) {
      this.setState({selected: this.props.category})
    }

    this.props.getDataList();
  };

  onSubmit = () => {
    this.props.getData(this.state.selected[0]);
    this.props.setCategory(this.state.selected);
    this.props.navigation.navigate(ROUTES.DRINKS);
  };

  onCheckBoxPress = id => {
    let tmp = this.state.selected;

    if (tmp.includes(id)) {
      tmp.splice(tmp.indexOf(id), 1);
    } else {
      tmp.push(id);
    }

    return this.setState({selected: [...tmp]})
  };

  render() {
    const {loading, data} = this.props;
    console.log(this.state.selected)

    return (
      <SafeAreaView style={{flex: 1}}>
        {loading
          ? <Loader/>
          : <>
            <FlatList
              data={data}
              enableEmptySections={true}
              keyExtractor={(item, id) => id.toString()}
              renderItem={({item}) => (
                <ListItem noBorder onPress={() => this.onCheckBoxPress(item.strCategory)}>
                  <Left>
                    <Text>{item.strCategory}</Text>
                  </Left>
                  <Right>
                    <CheckBox
                      onPress={() => this.onCheckBoxPress(item.strCategory)}
                      checked={this.state.selected.includes(item.strCategory)}
                    />
                  </Right>
                </ListItem>
              )}
            />
            <Footer>
              <FooterTab>
                <Button full onPress={this.onSubmit}>
                  <Text>Footer</Text>
                </Button>
              </FooterTab>
            </Footer>
          </>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
  },
});

export default connect(
  // mapStateToProps
  state => ({
    data: selector(state).data,
    category: state.app.category,
    loading: selector(state).loading,
  }),
  // mapDispatchToProps
  dispatch => ({
    getDataList: () => dispatch({type: TYPES.GET_DATA_FILTER}),
    setCategory: (payload) => dispatch({ type: TYPES.CALL_CATEGORY, payload }),
    getData: (currentCategory) => dispatch({type: TYPES.SET_DATA, currentCategory}),
  }),
)(Filter);
