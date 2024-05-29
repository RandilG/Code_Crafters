import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const gotoEditProfileScreen = () => {
    navigation.navigate('EditProfileScreen');
  };
  const gotoChangePasswordScreen = () => {
    navigation.navigate('ChangePasswordScreen');
  };
  const gotoLogoutScreen = () => {
    navigation.navigate('LogoutScreen');
  };

  return (
    <View style={Sty.container}>
      <Image
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        source={require('../Assets/background.png')}
        resizeMode="cover"
      />

      <View
        style={{
          backgroundColor: '#FCF8F8',
          marginTop: 100,
          borderRadius: 20,
          marginHorizontal: 20,
          height: 500,
        }}>
        <View style={Sty.userInfoSection}>
          <Avatar.Image
            source={{
              uri: 'https://example.com/profile.jpg', // Update the URI here
            }}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[Sty.title, {marginTop: 15, marginBottom: 5}]}>
              Hotel ABC
            </Title>
            <Caption style={Sty.caption}>@hotel_abc</Caption>
          </View>
        </View>
        <View style={Sty.userInfoSection}>
          <View style={Sty.row}>
            <Icon name="map-pin" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              Main street, Colombo 03
            </Text>
          </View>
          <View style={Sty.row}>
            <Icon name="phone" color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              +94-7184296
            </Text>
          </View>
          <View style={Sty.row}>
            <Icon name='envelope-o' color="#777777" size={20} />
            <Text style={{color: '#777777', marginLeft: 20}}>
              hotelabc@gmail.com
            </Text>
          </View>
        </View>
        <View style={Sty.infoBoxWrapper}>
          <View
            style={[
              Sty.infoBox,
              {
                borderRightColor: '#dddddd',
                borderRightWidth: 1,
              },
            ]}>
            <Title>$140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={Sty.infoBox}>
            <Title>12+</Title>
            <Caption>Ratings</Caption>
          </View>
        </View>
        <View style={Sty.menuWrapper}>
        <TouchableRipple onPress={gotoEditProfileScreen}>
          <View style={Sty.menuItem}>
            <Icon name="pencil" color="#FF6347" size={25}/>
            <Text style={Sty.menuItemText}>Edit Profile</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={gotoChangePasswordScreen}>
          <View style={Sty.menuItem}>
            <Icon name="lock" color="#FF6347" size={25}/>
            <Text style={Sty.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={Sty.menuItem}>
            <Icon name="question-circle" color="#FF6347" size={25}/>
            <Text style={Sty.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={Sty.menuItem}>
            <Icon name="cog" color="#FF6347" size={25}/>
            <Text style={Sty.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={gotoLogoutScreen}>
          <View style={Sty.menuItem}>
            <Icon name="sign-out" color="#FF6347" size={25}/>
            <Text style={Sty.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const Sty = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
    //flexDirection: 'row',
    alignItems: 'center',
    marginTop:10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    //marginBottom: 10,
    marginRight:5,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizoimport React from 'react';
    import {View, StyleSheet, Image, Text} from 'react-native';
    import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
    import Icon from 'react-native-vector-icons/FontAwesome';
    import { useNavigation } from '@react-navigation/native';
    
    const ProfileScreen = () => {
      const navigation = useNavigation();
    
      const gotoEditProfileScreen = () => {
        navigation.navigate('EditProfileScreen');
      };
      const gotoChangePasswordScreen = () => {
        navigation.navigate('ChangePasswordScreen');
      };
      const gotoLogoutScreen = () => {
        navigation.navigate('LogoutScreen');
      };
    
      return (
        <View style={Sty.container}>
          <Image
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            source={require('../Assets/background.png')}
            resizeMode="cover"
          />
    
          <View
            style={{
              backgroundColor: '#FCF8F8',
              marginTop: 100,
              borderRadius: 20,
              marginHorizontal: 20,
              height: 500,
            }}>
            <View style={Sty.userInfoSection}>
              <Avatar.Image
                source={{
                  uri: 'https://example.com/profile.jpg', // Update the URI here
                }}
                size={80}
              />
              <View style={{marginLeft: 20}}>
                <Title style={[Sty.title, {marginTop: 15, marginBottom: 5}]}>
                  Hotel ABC
                </Title>
                <Caption style={Sty.caption}>@hotel_abc</Caption>
              </View>
            </View>
            <View style={Sty.userInfoSection}>
              <View style={Sty.row}>
                <Icon name="map-pin" color="#777777" size={20} />
                <Text style={{color: '#777777', marginLeft: 20}}>
                  Main street, Colombo 03
                </Text>
              </View>
              <View style={Sty.row}>
                <Icon name="phone" color="#777777" size={20} />
                <Text style={{color: '#777777', marginLeft: 20}}>
                  +94-7184296
                </Text>
              </View>
              <View style={Sty.row}>
                <Icon name='envelope-o' color="#777777" size={20} />
                <Text style={{color: '#777777', marginLeft: 20}}>
                  hotelabc@gmail.com
                </Text>
              </View>
            </View>
            <View style={Sty.infoBoxWrapper}>
              <View
                style={[
                  Sty.infoBox,
                  {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1,
                  },
                ]}>
                <Title>$140.50</Title>
                <Caption>Wallet</Caption>
              </View>
              <View style={Sty.infoBox}>
                <Title>12+</Title>
                <Caption>Ratings</Caption>
              </View>
            </View>
            <View style={Sty.menuWrapper}>
            <TouchableRipple onPress={gotoEditProfileScreen}>
              <View style={Sty.menuItem}>
                <Icon name="pencil" color="#FF6347" size={25}/>
                <Text style={Sty.menuItemText}>Edit Profile</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={gotoChangePasswordScreen}>
              <View style={Sty.menuItem}>
                <Icon name="lock" color="#FF6347" size={25}/>
                <Text style={Sty.menuItemText}>Change Password</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={Sty.menuItem}>
                <Icon name="question-circle" color="#FF6347" size={25}/>
                <Text style={Sty.menuItemText}>Support</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => {}}>
              <View style={Sty.menuItem}>
                <Icon name="cog" color="#FF6347" size={25}/>
                <Text style={Sty.menuItemText}>Settings</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={gotoLogoutScreen}>
              <View style={Sty.menuItem}>
                <Icon name="sign-out" color="#FF6347" size={25}/>
                <Text style={Sty.menuItemText}>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
          </View>
        </View>
      );
    };
    
    export default ProfileScreen;
    
    const Sty = StyleSheet.create({
      container: {
        flex: 1,
      },
      userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        //flexDirection: 'row',
        alignItems: 'center',
        marginTop:10,
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
      },
      row: {
        flexDirection: 'row',
        //marginBottom: 10,
        marginRight:5,
      },
      infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
      },
      infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      menuWrapper: {
        marginTop: 10,
      },
      menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
      },
      menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
      },
    });
    ntal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
