import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image, StatusBar } from 'react-native';

import Loader from '../../components/loader';
export default class ForgetPasswordComponent extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        showSucceeded: false,
                        email: 'anhhung@gmail.com',
                        message: '',
                        onLoading: false
                };
                this.onButtonForget = this.onButtonForget.bind(this);
        }

        // nhận dữ liệu từ container
        componentWillReceiveProps (nextProps) {
                this.setState({
                        message: nextProps.message
                });
        }

        onButtonForget (email) {
                this.props.onClickButtonForgetPassword(email);
                this.setState({
                        onLoading: true,
                });

                setTimeout(() => {
                        this.setState({
                                onLoading: false
                        });
                        console.log('nhan message ', this.state.message);
                        if (!this.state.message.error) {
                                this.setState({
                                        showSucceeded: true,
                                });
                        }
                }, 1000);
        }

        render () {
                return (
                        <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width: '100%', height: '100%', }}>
                                <StatusBar
                                        barStyle="light-content"
                                        backgroundColor="#fd6003"
                                />
                                <Loader
                                        loading={this.state.onLoading} />
                                <View style={style.container}>
                                        <Text style={style.textTitle}>Quên mật khẩu</Text>
                                        <View style={{ backgroundColor: ' rgba(255, 255, 255, 0.3)', height: 1, width: '100%' }}></View>
                                        <View style={style.content}>
                                                <Text style={style.textGoiY}>Hãy nhập email bạn đã dùng để tạo tài khoản</Text>
                                                <TextInput
                                                        style={style.inputText}
                                                        value={this.state.email}
                                                        onChangeText={(text) => {
                                                                this.setState(() => {
                                                                        return {
                                                                                email: text
                                                                        };
                                                                });
                                                        }}
                                                ></TextInput>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.onButtonForget(this.state.email);
                                                        }}
                                                        style={style.button}>
                                                        <Text style={{ fontSize: 18, color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>Gửi mật khẩu</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <View style={{ backgroundColor: ' rgba(255, 255, 255, 0.3)', height: 1, width: '100%' }}></View>
                                        {
                                                this.state.showSucceeded ? null : <TouchableOpacity
                                                        onPress={() => {
                                                                this.props.navigation.goBack();
                                                        }}
                                                        style={style.buttonCancel}>
                                                        <Image
                                                                source={require('../../../assets/images/btnClose.png')}
                                                                style={{ height: 40, width: 40 }}
                                                        ></Image>
                                                </TouchableOpacity>
                                        }

                                </View>
                                {
                                        this.state.showSucceeded ? <View style={style.viewSucceeded}>
                                                <Text style={style.textSucceeded}>Hãy kiểm tra email để thiết lập lại mật khẩu của bạn</Text>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.props.navigation.goBack();
                                                        }}
                                                        style={style.buttonOK}>
                                                        <Text style={{ color: 'black', fontSize: 18, textAlign: 'center' }}>Ok</Text>
                                                </TouchableOpacity>
                                        </View> : null
                                }
                        </ImageBackground>
                );
        }
}

const style = StyleSheet.create({
        container: {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
        },
        content: {
                flexDirection: 'column',
                width: 300
        },
        textTitle: {
                color: 'white',
                fontSize: 30,
                marginBottom: 20
        },
        textGoiY: {
                color: 'white',
                fontSize: 18,
                marginVertical: 10
        },
        inputText: {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontSize: 18
        },
        button: {
                backgroundColor: '#fd6003',
                width: '100%',
                height: 50,
                borderRadius: 5,
                marginVertical: 15,
                justifyContent: 'center',
        },
        buttonCancel: {
                marginTop: 15
        },
        viewSucceeded: {
                marginBottom: 10,
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
        },
        textSucceeded: {
                fontSize: 18,
                color: 'white',
                width: 300,
                marginBottom: 10,
                textAlign: 'center'
        },
        buttonOK: {
                backgroundColor: 'white',
                width: 80,
                height: 50,
                borderRadius: 30,
                justifyContent: 'center',

        }
});












