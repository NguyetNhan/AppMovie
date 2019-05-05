import React, { Component } from 'react';
import { StatusBar,StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native';

import Loader from '../../components/loader';



export default class RegisterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: 'phan nhan',
            email: '@gmail.com',
            password: '123456',
            retypePassword: '123456',
            onLoading: false
        }
    }

    // nhận dữ liệu từ container
    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        })
    }
    // hàm đăng ký
    onButtonSignUp(name, email, password, retypePassword) {
        this.props.onSignUp({ full_name: name, email: email, password: password })
        this.setState({
            onLoading: true,
            name:'',
            email: '',
            password: '',
            retypePassword: '',
            receiverEmail:''
        })
       
        setTimeout(() => {
            this.setState({
                onLoading: false
            }),this.onCheckSignUpSucceeded(this.state.user)
        }, 1000);

        
    }

    onCheckSignUpSucceeded(user){
        if(!user.error){
           alert('Tài khoản của bạn đã đăng ký thành công !');
         // alert(user.data.email)
          this.setState({
              receiverEmail:user.data.email
          })
        }else{
            alert(JSON.stringify(user.message))
        }

    }

    render() {
        return (
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
               <StatusBar
                    barStyle="light-content"
                    backgroundColor="#fd6003"
                />
                <View style={style.container}>
                    <Loader
                        loading={this.state.onLoading} />
                    <View style={style.content}>
                        <Text style={style.textTitle}>Đăng ký</Text>
                        <View style={style.line}></View>
                        <View style={style.contentForm}>
                            <Text style={style.textSuggestions}> Bạn chưa điền Họ Tên</Text>
                            <TextInput
                                style={style.textInput}
                                placeholder="Họ Tên"
                                placeholderTextColor='#ca736a'
                                value={this.state.name}
                                onChangeText={(text) => {
                                    this.setState(() => {
                                        return {
                                            name: text
                                        }
                                    })
                                }}
                            ></TextInput>
                            <Text style={style.textSuggestions}>Bạn chưa điền Email</Text>
                            <TextInput
                                style={style.textInput}
                                placeholder="Email"
                                placeholderTextColor='#ca736a'
                                value={this.state.email}
                                onChangeText={(text) => {
                                    this.setState(() => {
                                        return {
                                            email: text
                                        }
                                    })
                                }}
                            ></TextInput>
                            <Text style={style.textSuggestions}>Bạn chưa điền mật khẩu</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={style.textInput}
                                placeholder="Mật khẩu"
                                placeholderTextColor='#ca736a'
                                value={this.state.password}
                                onChangeText={(text) => {
                                    this.setState(() => {
                                        return {
                                            password: text
                                        }
                                    })
                                }}
                            ></TextInput>
                            <Text style={style.textSuggestions}>Bạn chưa xác nhậ mật khẩu</Text>
                            <TextInput
                                secureTextEntry={true}
                                style={style.textInput}
                                placeholder="Xác nhận mật khẩu"
                                placeholderTextColor='#ca736a'
                                value={this.state.retypePassword}
                                onChangeText={(text) => {
                                    this.setState(() => {
                                        return {
                                            retypePassword: text
                                        }
                                    })
                                }}
                            ></TextInput>
                        </View>
                        <TouchableOpacity
                            style={style.buttonRegister}
                            onPress={() => {
                                this.onButtonSignUp(this.state.name, this.state.email, this.state.password, this.state.retypePassword)
                            }}
                        ><Text style={style.textButton}>Đăng ký</Text></TouchableOpacity>
                        <View style={style.line}></View>
                        <TouchableOpacity 
                        onPress={()=>{ this.props.navigation.navigate('Login',{
                            email:this.state.receiverEmail
                        })}}
                        style={style.buttonCancel}
                        ><Image source={require('../../../assets/images/btnClose.png')} style={{ width: 40, height: 40 }}></Image></TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        marginBottom: 10
                    }}>
                        <Text style={style.textDieuKhoan}>Bằng việc chọn vào nút Đăng ký, bạn đã đồng ý với</Text>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <Text style={style.textGetDieuKhoan}>Điều khoản sử dụng</Text>
                            <Text style={style.textDieuKhoan}> và </Text>
                            <Text style={style.textGetDieuKhoan}>Quy định bảo mật</Text>
                            <Text style={style.textDieuKhoan}> của HFilm</Text>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',


    },
    line: {
        height: 1,
        width: "100%",
        backgroundColor: '#ca736a'
    },
    contentForm: {
        flexDirection: 'column',
        width: 300,
        marginVertical: 10
    },
    textTitle: {
        fontSize: 25,
        color: 'white',
        marginBottom: 40
    },
    textSuggestions: {
        fontSize: 11,
        color: 'yellow',
        textAlign: 'left'
    },
    textInput: {
        borderBottomWidth: 1,
        borderBottomColor: '#ca736a',
        fontSize: 18,
        color: 'white'
    },
    buttonRegister: {
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
    textButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20
    },
    buttonCancel: {
        marginTop: 20
    },
    textDieuKhoan: {
        color: 'white'
    },
    textGetDieuKhoan: {
        color: '#fd6003',
        textDecorationLine: 'underline'
    }
})







