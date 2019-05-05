import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, StatusBar } from 'react-native';


import { fetchFilm, likeFilm, xemFilm } from '../actions/index';

import MyItemFlatlist from './MyItemFlatlist';

export default class ListFilmComponent extends Component {
    userId = null
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
            user: null
        }
        this.onClickButtonLike = this.onClickButtonLike.bind(this)
        this.onClickButtonWatchMovie = this.onClickButtonWatchMovie.bind(this)
        this.onSearchTitleEnglish = this.onSearchTitleEnglish.bind(this)

    }

    componentDidMount() {
        this.props.onFetchFilm(1)
    }


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
            user: this.props.navigation.getParam('user', null)
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

    // nút like chưa chuyển đổi do không thực hiện được các lệnh bên trong
    onClickButtonLike(movieId) {
        console.log('nhan uer = ', userId)
        if (userId==null) {
            console.log('chua co user ', userId);
            this.props.navigation.navigate('Login')
        } else {
            var listMovies = this.state.valuesListMovies
              console.log('da co user ',userId);
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
               console.log('id movie = ',movieId);
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
        const { navigation } = this.props;
         userId = navigation.getParam('user',null);
        console.log("nhan tu man hinh ",userId);
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
                                 //   userLogin = {userLogin}
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
