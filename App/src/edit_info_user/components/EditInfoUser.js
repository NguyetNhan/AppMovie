import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Image, StatusBar } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import Loader from '../../components/loader';

var radio_props = [
        { label: 'Nam', value: 'Nam' },
        { label: 'Nữ', value: 'Nữ' }
];


export default class EditInfoUser extends Component {

        constructor (props) {
                super(props);
                this.state = {
                        user: null,
                        onLoading: false,
                        full_name: null,
                        birthday: null,
                        gender: null,
                        message: null
                };
        }


        componentWillMount () {
                console.log('componentWillMount: ', this.props.navigation.getParam('userLocal', null));
                this.setState({
                        user: this.props.navigation.getParam('userLocal', null)
                });
        }

        componentWillReceiveProps (nextProps) {
                //EditInfoUser.js    console.log('componentWillReceiveProps: ', nextProps.loading);
                this.setState({
                        //  message: nextProps.message,
                        onLoading: nextProps.loading,
                });
        }

        onClickXacNhan () {
                /*    this.setState({
                           onLoading: true
                   }); */
                let data = {
                        'id': this.state.user.id,
                        'email': this.state.user.email,
                        'password': this.state.user.password,
                        'full_name': this.state.full_name,
                        'gender': this.state.gender,
                        'birthday': this.state.birthday,
                        'facebook_id': this.state.user.facebook_id,
                        'google_id': this.state.user.google_id,
                        'access_token': this.state.user.access_token,
                        'created_at': this.state.user.created_at,
                        'updated_at': this.state.user.updated_at
                };
                this.props.onClickUpdateUser(data);
                this.props.navigation.state.params.callback();
                this.props.navigation.goBack();
        }
        render () {
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
                                                <Text style={style.textTitle}>Chỉnh sửa</Text>
                                                <View style={style.line}></View>
                                                <View style={style.contentForm}>
                                                        <Text style={style.textSuggestions}>Họ Tên</Text>
                                                        <TextInput
                                                                style={style.textInput}
                                                                placeholder={this.state.user.full_name}
                                                                placeholderTextColor='#ca736a'
                                                                onChangeText={(text) => {
                                                                        this.setState(() => {
                                                                                return {
                                                                                        full_name: text
                                                                                };
                                                                        });
                                                                }}
                                                        ></TextInput>
                                                        <Text style={style.textSuggestions}>Giới tính</Text>
                                                        {/* <TextInput
                                                                style={style.textInput}
                                                                placeholder={this.state.user.gender}
                                                                placeholderTextColor='#ca736a'
                                                                onChangeText={(text) => {
                                                                        this.setState(() => {
                                                                                return {
                                                                                        gender: text
                                                                                };
                                                                        });
                                                                }}
                                                        ></TextInput> */}
                                                        <RadioForm
                                                                style={{ marginVertical: 10 }}
                                                                radio_props={radio_props}
                                                                initial={0}
                                                                animation={true}
                                                                labelHorizontal={true}
                                                                formHorizontal={true}
                                                                buttonSize={10}
                                                                buttonOuterSize={20}
                                                                buttonColor={'#fd6003'}
                                                                labelStyle={{ fontSize: 20, color: 'white' }}
                                                                onPress={(value) => { this.setState({ gender: value }); }}
                                                        />
                                                        <Text style={style.textSuggestions}>Ngày sinh</Text>
                                                        <TextInput
                                                                style={style.textInput}
                                                                placeholder={this.state.user.birthday}
                                                                placeholderTextColor='#ca736a'
                                                                onChangeText={(text) => {
                                                                        this.setState(() => {
                                                                                return {
                                                                                        birthday: text
                                                                                };
                                                                        });
                                                                }}
                                                        ></TextInput>
                                                </View>
                                                <TouchableOpacity
                                                        style={style.buttonRegister}
                                                        onPress={() => {
                                                                this.onClickXacNhan();
                                                        }}
                                                ><Text style={style.textButton}>Xác nhận</Text></TouchableOpacity>
                                                <View style={style.line}></View>
                                                <TouchableOpacity
                                                        onPress={() => {
                                                                this.props.navigation.goBack();
                                                        }}
                                                        style={style.buttonCancel}
                                                ><Image source={require('../../../assets/images/btnClose.png')} style={{ width: 40, height: 40 }}></Image></TouchableOpacity>
                                        </View>
                                </View>
                        </ImageBackground>
                );
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
                width: '100%',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',


        },
        line: {
                height: 1,
                width: '100%',
                backgroundColor: '#ca736a'
        },
        contentForm: {
                flexDirection: 'column',
                width: 300,
                marginVertical: 15
        },
        textTitle: {
                fontSize: 30,
                color: 'white',
                marginBottom: 40,
                fontFamily: 'UVN-Baisau-Regular'
        },
        textSuggestions: {
                fontSize: 11,
                color: 'yellow',
                textAlign: 'left',
                fontFamily: 'OpenSans-Regular',
                marginTop: 10
        },
        textInput: {
                borderBottomWidth: 1,
                borderBottomColor: '#ca736a',
                fontSize: 18,
                color: 'white',
                fontFamily: 'OpenSans-Regular'
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
                fontSize: 20,
                fontFamily: 'OpenSans-Regular'
        },
        buttonCancel: {
                marginTop: 20
        },
});

