import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, FlatList, StatusBar } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
//import ItemFilmComponent from './ItemFilmComponent';

import { fetchFilm, likeFilm, xemFilm } from '../actions/index';

class MyItemFlatlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId: this.props.movieId,
            imageMovie: this.props.imageMovie,
            title: this.props.title,
            description: this.props.description,
            views: this.props.views,
            liked: this.props.liked,
            urlImageLike: this.props.urlImageLike,
            textButtonLike: this.props.textButtonLike,
            colorTextLike: this.props.colorTextLike
        }
        this.onSearchTitleEnglish = this.onSearchTitleEnglish.bind(this)
        this.onSearchTitleVN = this.onSearchTitleVN.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        //  console.log("componentWillReceiveProps", nextProps.movieId);
        this.setState({
            movieId: nextProps.movieId,
            imageMovie: nextProps.imageMovie,
            title: nextProps.title,
            description: nextProps.description,
            views: nextProps.views,
            liked: nextProps.liked,
            urlImageLike: nextProps.urlImageLike,
            textButtonLike: nextProps.textButtonLike,
            colorTextLike: nextProps.colorTextLike
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        //  console.log('shouldComponentUpdate', nextState.liked);
        const liked = nextState.liked
        const oldLiked = this.state.liked

        // If "liked" or "likeCount" is different, then update
        return liked !== oldLiked
    }

    onSearchTitleEnglish(value) {
        var pos = value.lastIndexOf("/");
        // console.log('vi tri dau / = ',pos);
        if (pos > -1) {
            return value.slice(0, pos)
        } else {
            return value
        }
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

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={style.container}>
                    <Image
                        style={style.image}
                        source={{ uri: this.state.imageMovie }}
                    ></Image>
                    <View style={style.content}>
                        <Text style={style.titleEnglish}>{this.onSearchTitleEnglish(this.state.title)}</Text>
                        <Text style={style.titleVN}>{this.onSearchTitleVN(this.state.title)}</Text>
                        <Text style={style.textView}>Lượt xem: {this.state.views}</Text>
                        <Text
                            style={style.textContent}
                            numberOfLines={4}
                        >{this.state.description}</Text>
                        <View style={style.containerButton}>
                            <View style={style.containerButton}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.onClickButtonLike(this.state.movieId)
                                    }}
                                ><Image source={this.state.urlImageLike} style={{ width: 18, height: 15 }}></Image>
                                </TouchableOpacity>
                                <Text style={{
                                    color: `${this.state.colorTextLike}`,
                                    marginLeft: 5,
                                    fontSize: 15
                                }}>{this.state.textButtonLike}</Text>
                            </View>
                            <TouchableOpacity style={style.buttonView}
                                onPress={() => {
                                    this.props.onClickButtonWatchMovie(this.state.movieId)
                                }}
                            ><Text style={style.textButton}>Xem phim</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: '#c68368' }}></View>
            </View>
        )
    }
}


export default class ListFilmComponent extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'HFILM',
            headerStyle: {
                backgroundColor: '#fd6003',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                textAlign: "center",
                flex: 1,
                textTransform: 'uppercase',
            },
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            valuesListMovies: [],
            isFetching: false,
            current_page: 1,
            total_pages: 1,
            user:  this.props.navigation.getParam('user',null)
        }
        this.onClickButtonLike = this.onClickButtonLike.bind(this)
        this.onClickButtonWatchMovie = this.onClickButtonWatchMovie.bind(this)
        this.onSearchTitleEnglish = this.onSearchTitleEnglish.bind(this)
    }
    componentDidMount() {
        this.props.onFetchFilm(1)
    }

    // nhận dữ liệu từ màn hình login chuyển qua
    /* componentWillMount() {
        this.setState({
            user: this.props.navigation.getParam('user',null)
        })
        console.log('nhan uer = ',this.state.user);
    } */

    // nhận dữ liệu từ container mapStateToProps
    componentWillReceiveProps(nextProps) {
        for (i = 0; i < nextProps.movies.data.length; i++) {
            nextProps.movies.data[i].liked = false
            nextProps.movies.data[i].urlImageLike = require('../../../assets/images/ic_like.png')
            nextProps.movies.data[i].textButtonLike = 'Thích'
            nextProps.movies.data[i].colorTextLike = "white"
        }
        this.setState({
            valuesListMovies: this.state.valuesListMovies.concat(nextProps.movies.data),
            isFetching: nextProps.isLoading,

            // nhận dữ liệu từ màn hình login
            user: this.props.navigation.getParam('user',null)
        });
    }

    // chưa xử lí đưa mảng về rỗng
    onRefresh() {
        this.setState({ isFetching: true }, function () { this.props.onFetchFilm(1) });
    }

    onLoadingMovies() {
        let page = this.props.movies.paging.current_page
        let total_pages = this.props.movies.paging.total_pages
        if (page < total_pages) {
            this.setState({ isFetching: true }, function () { this.props.onFetchFilm(++this.state.current_page) });
        } else if (page == total_pages)
            return
    }

    onClickButtonLike(movieId) {
        if (this.state.user == null) {
            console.log(this.state.user);
            this.props.navigation.navigate('Login')
        } else {
            console.log('da co user ',this.state.user);
            //   console.log('id movie = ',movieId);
            var listMovies = this.state.valuesListMovies
            for (i = 0; i < listMovies.length; i++) {
                if (listMovies[i].id == movieId) {
                    var movie = listMovies[i];
                    if (listMovies[i].liked) {
                        movie.liked = false
                        movie.urlImageLike = require('../../../assets/images/ic_like.png')
                        movie.textButtonLike = 'Thích'
                        movie.colorTextLike = 'white'
                        listMovies[i] = movie
                    } else {
                        movie.liked = true
                        movie.urlImageLike = require('../../../assets/images/ic_like_orange.png')
                        movie.textButtonLike = 'Đã thích'
                        movie.colorTextLike = '#fd6003'
                        listMovies[i] = movie
                    }
                    this.setState({
                        valuesListMovies: listMovies
                    })
                }
            }
        }

    }

    // button xem phim

    onClickButtonWatchMovie(movieId) {
        var listMovies = this.state.valuesListMovies
        for (i = 0; i < listMovies.length; i++) {
            if (listMovies[i].id == movieId) {
                var movie = listMovies[i];
                this.props.navigation.navigate('DetailFilm', {
                    movie: movie,
                    titleMovie: this.onSearchTitleEnglish(movie.title)
                })
            }
        }
    }

    onSearchTitleEnglish(value) {
        var pos = value.lastIndexOf("/");
        // console.log('vi tri dau / = ',pos);
        if (pos > -1) {
            return value.slice(0, pos)
        } else {
            return value
        }
    }


    render() {
        return (
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
                {/* đổi màu thanh trạng thái */}
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#fd6003"
                />
                <View style={{ height: 1, backgroundColor: 'white' }}></View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref="listMovies"
                        //on refresh
                        onRefresh={() => { this.onRefresh() }}
                        refreshing={this.state.isFetching}
                        // on loadmore
                        onEndReached={this.onLoadingMovies.bind(this)}
                        onEndReachedThreshold={0.4}
                        extraData={this.state}
                        data={this.state.valuesListMovies}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) => {
                            return (
                                <MyItemFlatlist
                                    movieId={item.item.id}
                                    imageMovie={item.item.image}
                                    title={item.item.title}
                                    description={item.item.description}
                                    views={item.item.views}
                                    liked={item.item.liked}
                                    urlImageLike={item.item.urlImageLike}
                                    onClickButtonLike={this.onClickButtonLike}
                                    textButtonLike={item.item.textButtonLike}
                                    onClickButtonWatchMovie={this.onClickButtonWatchMovie}
                                    colorTextLike={item.item.colorTextLike}
                                />
                            )
                        }}
                    ></FlatList>
                </View >
            </ImageBackground>
        )
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
    },
    image: {
        flex: 1,
        height: 150,
        borderWidth: 1,
        borderColor: '#fd6003'
    },
    content: {
        flex: 2,
        paddingLeft: 10,
        flexDirection: 'column',
    },
    titleEnglish: {
        color: '#fd6003',
        fontSize: 15,
        textTransform: 'none',
        fontWeight: 'bold'
    },
    titleVN: {
        color: 'white',
        fontSize: 15,
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    textView: {
        color: '#fea46f',
        fontSize: 13,
        fontStyle: 'italic',
    },
    textContent: {
        color: 'white',
        fontSize: 15,
        marginVertical: 10
    },
    containerButton: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center'

    },

    buttonView: {
        backgroundColor: '#fd6003',
        width: 120,
        height: 30,
        borderBottomEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        padding: 5
    },
    textButton: {
        color: 'white',
        fontSize: 13,
        textAlign: 'center',
    }
})



/* onPress={() => {
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Details' })
      ],
    }))
  }} */
