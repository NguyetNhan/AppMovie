import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, StatusBar, Image, TouchableOpacity } from 'react-native';


import { fetchFilm, likeFilm, xemFilm } from '../actions/index';

import MyItemFlatlist from './MyItemFlatlist';

export default class ListFilmComponent extends Component {
        static navigationOptions = ({ navigation }) => {
                return {
                        title: 'HFILM',
                        headerStyle: {
                                backgroundColor: '#fd6003',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                                textAlign: "center",
                                fontFamily: 'UVN-Baisau-Bold',
                                fontWeight: "200",
                                flex: 1,
                        },
                        headerRight: (
                                <TouchableOpacity onPress={() => {
                                        //       params.onClickButtonProfile()
                                }}>
                                        <Image source={require('../../../assets/images/profile.png')} style={{ height: 25, width: 25 }}></Image>
                                </TouchableOpacity>
                        )
                }
        }

        constructor (props) {
                super(props)
                this.state = {
                        valuesListMovies: [],
                        isFetching: false,
                        current_page: 1,
                        total_pages: 1,
                        user: null,
                        selectMovie: null
                }
                this.onClickButtonLike = this.onClickButtonLike.bind(this)
                this.onClickButtonWatchMovie = this.onClickButtonWatchMovie.bind(this)
                this.onSearchTitleEnglish = this.onSearchTitleEnglish.bind(this)
                this.onRefresh = this.onRefresh.bind(this)


        }
        // bắt sự kiện thay thế màn hình
        /* replaceScreen = () => {
            const { locations, position } = this.props.navigation.state.params;
            this.props.navigation.dispatch({
              key: 'Login',
              type: 'ReplaceCurrentScreen',
              routeName: 'Login',
              params: { locations, position },
            });
          }; */

        componentDidMount () {
                //    console.log('componentDidMount: ');
                this.setState({
                        isFetching: true,
                        user: this.props.navigation.getParam('user', null)
                });
                this.props.onFetchFilm({ page: 1, user: this.state.user });
                //      this.props.navigation.setParams({ onClickButtonProfile: this._onClickButtonProfile.bind(this) })
        }


        // nhận dữ liệu từ container mapStateToProps
        componentWillReceiveProps (nextProps) {
                //       console.log('componentWillReceiveProps: ', nextProps.movies.data);
                let user = nextProps.navigation.getParam('user', null)
                this.setState({
                        user: user,
                        isFetching: nextProps.isLoading,
                        valuesListMovies: this.state.valuesListMovies.concat(nextProps.movies.data),
                });
        }
        componentWillMount () {
                //      console.log('componentWillMount: ');
                this.setState({
                        user: this.props.navigation.getParam('user', null)
                })
        }
        shouldComponentUpdate (nextProps, nextState) {
                //   console.log('shouldComponentUpdate: ');
                const user = nextProps.navigation.getParam('user', null)
                const oldUser = this.state.user
                //    console.log(`new user: ${user} old user: ${oldUser}`);
                return true
        }

        _onClickButtonProfile () {
                alert('anh nhan')
        }

        // chưa xử lí đưa mảng về rỗng
        onRefresh () {
                this.setState({ isFetching: true, valuesListMovies: [], })
                this.props.onFetchFilm({ page: 1, user: this.state.user })
        }

        onLoadingMovies () {
                var page = this.props.movies.paging.current_page
                //   console.log('page: ', page);
                const total_pages = this.props.movies.paging.total_pages
                //   console.log('total_pages: ', total_pages);
                if (this.state.isFetching) {
                        return
                } else {
                        if (page < total_pages) {
                                this.setState({ isFetching: true })
                                this.props.onFetchFilm({ page: ++page, user: this.state.user })
                        } else if (page >= total_pages)
                                return
                }
        }


        // nút like chưa chuyển đổi do không thực hiện được các lệnh bên trong
        onClickButtonLike (movieId) {
                // console.log('this.state.user ', this.state.user);
                const user = this.state.user
                if (user == null) {
                        this.props.navigation.replace('Login')
                } else {
                        this.props.onClickLikeFilm({ user: user.id, movieId })
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

        onRefreshItemFromDetailFilm (movie) {
                var listMovies = this.state.valuesListMovies
                for (i = 0; i < listMovies.length; i++) {
                        if (listMovies[i].id == movie.id) {
                                listMovies[i] = movie;
                                this.setState({
                                        valuesListMovies: listMovies
                                })
                        }
                }
        }

        onCallbackWatchMovie (movieId, user) {
                var listMovies = this.state.valuesListMovies
                for (i = 0; i < listMovies.length; i++) {
                        if (listMovies[i].id == movieId) {
                                var movie = listMovies[i];
                                this.props.navigation.navigate('DetailFilm', {
                                        movie: movie,
                                        user: user,
                                        titleMovie: this.onSearchTitleEnglish(movie.title),
                                        callback: this.onRefreshItemFromDetailFilm.bind(this)
                                })
                        }
                }
        }

        // button xem phim
        onClickButtonWatchMovie (movieId) {
                const user = this.state.user
                var listMovies = this.state.valuesListMovies
                for (i = 0; i < listMovies.length; i++) {
                        if (listMovies[i].id == movieId) {
                                if (user == null) {
                                        var movie = listMovies[i];
                                        this.props.navigation.replace('Login', {
                                                movie: movie.id,
                                                callback: this.onCallbackWatchMovie.bind(this)
                                        })
                                } else {
                                        var movie = listMovies[i];
                                        this.props.navigation.navigate('DetailFilm', {
                                                movie: movie,
                                                user: this.state.user,
                                                titleMovie: this.onSearchTitleEnglish(movie.title),
                                                callback: this.onRefreshItemFromDetailFilm.bind(this)
                                        })
                                }
                        }
                }
        }

        onSearchTitleEnglish (value) {
                var pos = value.lastIndexOf("/");
                // console.log('vi tri dau / = ',pos);
                if (pos > -1) {
                        return value.slice(0, pos)
                } else {
                        return value
                }
        }

        render () {
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
                                                onEndReachedThreshold={1}
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
