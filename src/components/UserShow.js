import React from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Image, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import CheckBox from 'react-native-checkbox'
import { Button, CardSection } from './common';
import { logoutUser, fetchExcludes, updateExcludes } from '../actions';

class UserShow extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)

    this.state = this.props.excludes
  }

  toggle(field) {
    return () => {
      this.setState({[field]: !this.state[field]})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state !== prevState) {
      this.props.updateExcludes(this.state);
    }
  }

  componentWillReceiveProps(nextProps) {
    if( JSON.stringify(this.props.excludes) !== JSON.stringify(nextProps.excludes)) {
      this.setState(nextProps.excludes)
    }
  }


  componentDidMount () {
    Actions.userShow({type: 'reset'});
    this.props.fetchExcludes()
  };

  render () {
    return (
      <Image source={require('../assets/Colorful-Minimalistic-Background.jpg')} style={ styles.pageViewStyle}>

        <View style={styles.contentStyle}>
          <View style={styles.contentBackgroundStyle} >
            <Text
              style={styles.titleStyle}>
              Email:</Text>
            <Text
              style={styles.bodyStyle}>
              {firebase.auth().currentUser.email}</Text>
          </View>

          <View
            style={{padding: 5, margin: 5}}
            style={ styles.contentBackgroundStyle}>
            <Text
              style={styles.titleStyle}
              >Categories:</Text>
            <View>
              <View>
                <CheckBox
                  underlayColor='transparent'
                  containerStyle={styles.checkContainerStyle}
                  labelBefore={true}
                  labelStyle={styles.labelStyle}
                  label="Sports"
                  checked={this.state.sports}
                  checkedImage={require('../assets/enabled.png')}
                  uncheckedImage={require('../assets/disabled.png')}
                  onChange={ this.toggle('sports') }
                  />
              </View>
              <View>
                <CheckBox
                  underlayColor='transparent'
                  containerStyle={styles.checkContainerStyle}
                  labelBefore={true}
                  labelStyle={styles.labelStyle}
                  label="Politics"
                  checked={this.state.politics}
                  checkedImage={require('../assets/enabled.png')}
                  uncheckedImage={require('../assets/disabled.png')}
                  onChange={this.toggle('politics')}
                  />
              </View>
              <View>
                <CheckBox
                  underlayColor='transparent'
                  containerStyle={styles.checkContainerStyle}
                  labelBefore={true}
                  labelStyle={styles.labelStyle}
                  label="Entertainment"
                  checked={this.state.entertainment}
                  checkedImage={require('../assets/enabled.png')}
                  uncheckedImage={require('../assets/disabled.png')}
                  onChange={this.toggle('entertainment')}
                  />
              </View>
              <View>
                <CheckBox
                  underlayColor='transparent'
                  containerStyle={styles.checkContainerStyle}
                  labelBefore={true}
                  labelStyle={styles.labelStyle}
                  label="Tech"
                  checked={this.state.tech}
                  checkedImage={require('../assets/enabled.png')}
                  uncheckedImage={require('../assets/disabled.png')}
                  onChange={this.toggle('tech')}
                  />
              </View>
              <View>
                <CheckBox
                  underlayColor='transparent'
                  containerStyle={styles.checkContainerStyle}
                  labelBefore={true}
                  labelStyle={styles.labelStyle}
                  label="Business"
                  checked={this.state.business}
                  checkedImage={require('../assets/enabled.png')}
                  uncheckedImage={require('../assets/disabled.png')}
                  onChange={this.toggle('business')}
                  />
              </View>
            </View>
          </View>

          <View style={styles.contentBackgroundStyle}>
            <Text style={styles.titleStyle}>About:</Text>
            <Text style={styles.bodyStyle}>tldr (Too Long Didn't Read) is a mobile news aggregation application made with react-native in 1 week. Using SMMRY and News APIs, tldr produces a feed of summarized news articles. If even the summaries are too long, tldr uses Google Text-To-Speech to play summarized articles to users.</Text>
          </View>
        </View>
        <CardSection
          style={styles.buttonStyle}>
          <Button
            onPress={() => this.props.logoutUser()}>
            Logout
          </Button>
        </CardSection>
      </Image>
    );
  }
}

const mapStateToProps = state => {
  return {
    excludes: state.excludes
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    fetchExcludes: () => dispatch(fetchExcludes()),
    updateExcludes: excludes => dispatch(updateExcludes(excludes))
  }
}

const styles = {
  pageViewStyle: {
    flex: 1,
    width: null,
    height: null,
    paddingTop: 65,
    resizeMode: 'cover',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleStyle: {
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16
    },
  contentStyle: {
    justifyContent: 'flex-start',
    height: 475,
    backgroundColor: 'transparent'
  },
  contentBackgroundStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 3,
    margin: 5,
    paddingBottom: 5
  },
  bodyStyle: {
    fontSize: 15,
    paddingLeft: 25,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff'
  },
  labelStyle: {
    fontSize: 15,
    paddingLeft: 15,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff'
  },
  buttonStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },
  checkContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
    paddingBottom: 5
  },
  checkStyle: {
    color: '#fff'
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);
