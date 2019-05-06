import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ImageBackground, StatusBar, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

export default class DetailFilmComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('titleMovie', 'Detail Film'),
            headerStyle: {
                backgroundColor: '#fd6003',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                textAlign: "center",
                flex: 1,
                textTransform: 'uppercase',
                fontFamily:'OpenSans-Bold'
            },
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            movie: '',
            maxOfLine: 4,
            showWatch: false
        }
        this.onSearchTitleVN = this.onSearchTitleVN.bind(this)
        this.onUpdateLinkVideo = this.onUpdateLinkVideo.bind(this)
        this.onClickTextXemThem = this.onClickTextXemThem.bind(this)
        this.onClickButtonLike = this.onClickButtonLike.bind(this)
    }

    componentWillMount() {
        this.setState({
            movie: this.props.navigation.getParam('movie', ' ')
        })
    }

    onSearchTitleVN(value) {
        var pos = value.lastIndexOf("/");

        // console.log('vi tri dau / = ',pos);
        if (pos > -1) {
            return value.slice(pos + 2)
        } else {
            return value
        }
    }

    onUpdateLinkVideo(value) {
        var pos = value.lastIndexOf("=");
        let link = value.slice(++pos)
        var url = 'http://www.youtube.com/watch_popup?v='
        return url.concat(link)
    }

    onClickTextXemThem() {
        this.setState({
            maxOfLine: 10,
            showWatch: true
        })
    }

    onClickButtonLike() {
        var movie = this.state.movie
        if (this.state.movie.liked) {
            movie.liked = false
            movie.urlImageLike = require('../../../assets/images/ic_like.png')
            movie.textButtonLike = 'Thích'
            movie.colorTextLike = 'white'
            this.setState({
                movie: movie
            })
        }else{
            movie.liked = true
            movie.urlImageLike = require('../../../assets/images/ic_like_orange.png')
            movie.textButtonLike = 'Đã thích'
            movie.colorTextLike = '#fd6003'
            this.setState({
                movie: movie
            })
        }
    }


    render() {
        return (
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#fd6003"
                />
                <View style={{ backgroundColor: 'white', height: 1 }}></View>
                <View style={{ flex: 1, flexDirection: 'column' }} >
                    <View style={style.container}>
                        <View style={style.contentInfor}>
                            <Image style={style.imageFilm} source={{ uri: this.state.movie.image }} />
                            <View style={style.textInfor}>
                                <Text style={style.textTitle}>{this.onSearchTitleVN(this.state.movie.title)}</Text>
                                <Text style={style.textViews}>Lượt xem: {this.state.movie.views}</Text>
                                <Text style={style.textGioiThieu}><Text style={{  fontFamily:'OpenSans-Bold' }}>Genres:</Text> {this.state.movie.category}</Text>
                                <Text style={style.textGioiThieu}><Text style={{  fontFamily:'OpenSans-Bold' }}>Actor:</Text> {this.state.movie.actor}</Text>
                                <Text style={style.textGioiThieu}><Text style={{  fontFamily:'OpenSans-Bold'}}>Director:</Text> {this.state.movie.director}</Text>
                                <Text style={style.textGioiThieu}><Text style={{ fontFamily:'OpenSans-Bold' }}>Manufacturer:</Text> {this.state.movie.manufacturer}</Text>
                                <Text style={style.textGioiThieu}><Text style={{ fontFamily:'OpenSans-Bold' }}>Thời lượng phim:</Text> {this.state.movie.duration} minute</Text>
                                <TouchableOpacity style={style.buttonLike} onPress={()=>{
                                    this.onClickButtonLike()
                                }}>
                                    <Image style={{ width: 18, height: 15 }} source={this.state.movie.urlImageLike}></Image>
                                    <Text style={{
                                        color: `${this.state.movie.colorTextLike}`,
                                        marginLeft: 5,
                                        fontSize: 15
                                    }}>{this.state.movie.textButtonLike}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={{ height: 300, marginVertical: 10 }}>
                            <Text style={style.textDescription} numberOfLines={this.state.maxOfLine}>{this.state.movie.description}</Text>
                        </ScrollView>
                        {
                            this.state.showWatch ? null : <Text style={style.textXemThem} onPress={() => { this.onClickTextXemThem() }} >Xem thêm</Text>
                        }
                        <View style={{ height: 1, backgroundColor: '#c68368', marginVertical: 15 }}></View>
                        <Text style={style.textTrailer}>Xem Trailer</Text>
                    </View>
                    <WebView style={{ height: 300, flex: 1 }} source={{ uri: this.onUpdateLinkVideo(this.state.movie.link) }} />
                </View>
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'column',
        padding: 10,
    },
    contentInfor: {
        flexDirection: 'row'
    },
    imageFilm: {
        flex: 1,
        backgroundColor: 'red',
        height: 200,
        borderWidth: 1,
        borderColor: 'white'
    },
    textInfor: {
        flex: 2,
        flexDirection: 'column',
        marginLeft: 10,
   
    },
    textTitle: {
        fontSize: 13,
        color: 'white',
        textTransform: 'uppercase',
        fontFamily:'OpenSans-Bold'
    },
    textViews: {
        fontSize: 13,
        fontFamily:'OpenSans-Italic',
        color: '#fea46f',
        marginVertical: 10,
    },
    textGioiThieu: {
        fontSize: 13,
        color: 'white',
        fontFamily:'OpenSans-Regular'
    },
    buttonLike: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        fontFamily:'OpenSans-Bold'
    },
    textDescription: {
        color: 'white',
        fontSize: 13,
        fontFamily:'OpenSans-Regular'

    },
    textXemThem: {
        fontFamily:'OpenSans-Italic',
        color: '#fea46f',
        textDecorationLine: 'underline',
        textAlign: 'right'
    },
    textTrailer: {
        color: '#fd6003',
        textTransform: 'uppercase',
        fontFamily:'OpenSans-Bold'
    }







})