import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
// import loadding
import Loader from '../../components/loader';

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'nhan123@gmail.com',
            password: '',
            user: '',
            onLoading: false
        }
    }

    // nhận dữ liệu từ container
    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        })
    }

    onSignIn(email, password) {
        this.props.onSignIn({ email: email, password: password })
        this.setState({
            onLoading: true
        })
        let user = this.state.user
        setTimeout(() => {
            this.setState({
                onLoading: false
            }), this.props.navigation.navigate('ListFilm')
        }, 1000);

    }

    render() {
        const {navigation}= this.props
        const email = navigation.getParam('email','')
        return (
            <View style={style.container}>
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
                            value={email}
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
                                this.props.navigation.navigate('ListFilm')
                            }}
                            style={style.buttonForget}>
                            <Text style={style.buttonTextForget}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                        <View style={style.line}></View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'OpenSans-Regular', color: 'white' }}>Bạn chưa có tài khoản?</Text>
                        <Text onPress={()=>{  this.props.navigation.navigate('Register')}} style={{ textAlign: 'center', fontFamily: 'OpenSans-Regular', color: '#fe5f01', textDecorationLine: 'underline' }}>ĐĂNG KÝ</Text>
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
        fontWeight: 'bold',
        fontFamily: '  unicode.display.UVNBaiSau_B',
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