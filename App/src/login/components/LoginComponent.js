import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, StatusBar, Image } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
// import loadding
import Loader from '../../components/loader';

import FBSDK,{ LoginManager } from "react-native-fbsdk";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'nhan123@gmail.com',
            password: '123456',
            user: '',
            onLoading: false,
            movie:''
        }
        this.onSignIn = this.onSignIn.bind(this)
    }

    // nhận dữ liệu từ container
    componentWillReceiveProps(nextProps) {
        //   console.log(' nhận dữ liệu từ container = ', nextProps.user);
        this.setState({
            user: nextProps.user
        })
    }

    componentWillMount() {
        this.setState({
            email: this.props.navigation.getParam('email', 'nhan123@gmail.com'),
            movie: this.props.navigation.getParam('movie', null),
        })
    }

    onSignIn(email, password) {
        this.props.onSignIn({ email: email, password: password })
        this.setState({
            onLoading: true
        })
        setTimeout(() => {
            this.setState({
                onLoading: false
            })
            console.log('login = ', this.state.user.error)
            if (!this.state.user.error) {
                if (this.state.movie == null) {
                    console.log('this.state.user.data: ', this.state.user.data);
                    this.props.navigation.replace('ListFilm', { user: this.state.user.data })
                   
                } else {
                    console.log('this.state.user.data: ', this.state.user.data);
                    this.props.navigation.state.params.callback(this.state.movie)
                    this.props.navigation.replace('ListFilm', { user: this.state.user.data })
                }
            } else {
                alert(JSON.stringify(this.state.user.message))
            }
        }, 1000);
    }

    _fbAuth(){
        LoginManager.logInWithReadPermissions(["public_profile"]).then(
            function(result) {
              if (result.isCancelled) {
                console.log("Login cancelled");
              } else {
                console.log(
                  "Login success with permissions: " +
                    result.grantedPermissions.toString()
                );
              }
            },
            function(error) {
              console.log("Login fail with error: " + error);
            }
          );
    }

    render() {
        return (
            <View style={style.container}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#fd6003"
                />
                <Loader
                    loading={this.state.onLoading} />
                <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
                    <View style={style.content}>
                        <Text style={style.title}>Đăng Nhập</Text>
                        <View style={style.line}></View>
                        <TextInput placeholder="Email"
                            style={style.textInput}
                            keyboardType="email-address"
                            placeholderTextColor='#ca736a'
                            secureTextEntry={false}
                            onChangeText={(text) => {
                                this.setState(() => {
                                    return {
                                        email: text
                                    }
                                })
                            }}
                            value={this.state.email}
                        ></TextInput>
                        <TextInput placeholder="Mật khẩu"
                            style={style.textInput}
                            keyboardType="default"
                            placeholderTextColor='#ca736a'
                            secureTextEntry={true}
                            onChangeText={(text) => {
                                this.setState(() => {
                                    return {
                                        password: text
                                    }
                                })
                            }}
                            value={this.state.password}
                        ></TextInput>
                        <TouchableOpacity
                            onPress={() => {
                                // event from LoginContainer
                                this.onSignIn(this.state.email, this.state.password)
                            }}
                            style={style.buttonLogin}>
                            <Text style={style.buttonTextLogin}>Đăng nhập</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                // event from LoginContainer
                                this.props.navigation.navigate('ForgetPassword')
                            }}
                            style={style.buttonForget}>
                            <Text style={style.buttonTextForget}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                               this._fbAuth()
                            }}
                            style={style.buttonLoginFacebook}>
                            <Image source={require('../../../assets/images/icon_facebook.png')} style={{ height: 25, width: 25, marginRight: 5 }}></Image>
                            <Text style={style.buttonTextLogin}>Đăng nhập với Facebook</Text>
                        </TouchableOpacity>
                        
                        <View style={style.line}></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Regular', color: 'white' }}>Bạn chưa có tài khoản?</Text>
                        <Text onPress={() => { this.props.navigation.navigate('Register') }} style={{ textAlign: 'center', fontFamily: 'OpenSans-Regular', color: '#fe5f01', textDecorationLine: 'underline' }}>ĐĂNG KÝ</Text>
                    </View>
                </ImageBackground>
            </View >
        )
    }
}



const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    content: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontFamily: 'UVN-Baisau-Regular',
        textAlign: 'center',
        marginBottom: 50
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: '#ca736a',
    },
    textInput: {
        fontSize: 20,
        borderBottomColor: '#ca736a',
        borderBottomWidth: 1,
        fontFamily: 'OpenSans-Regular',
        marginVertical: 10,
        color: 'white',
        height: 50,
        width: 300,
    },
    buttonLogin: {
        backgroundColor: '#fd6003',
        paddingVertical: 10,
        marginVertical: 10,
        height: 50,
        width: 300,
        borderBottomEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    buttonForget: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        marginVertical: 10,
        height: 50,
        width: 300,
        borderBottomEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5
    },
    buttonLoginFacebook: {
        backgroundColor: '#3a559f',
        paddingVertical: 10,
        marginVertical: 10,
        height: 50,
        width: 300,
        borderBottomEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttonTextLogin: {
        fontSize: 20,
        fontFamily: 'OpenSans-Regular',
        color: 'white',
        textAlign: 'center',
    },
    buttonTextForget: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        fontFamily: 'OpenSans-Regular',
    }
});