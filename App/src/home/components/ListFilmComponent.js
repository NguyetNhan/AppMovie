import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
//import ItemFilmComponent from './ItemFilmComponent';

import { fetchFilm, likeFilm, xemFilm } from '../actions/index';

class MyItemFlatlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieId: this.props.movieId,
            imageMovie: this.props.imageMovie,
            titleEnglish: this.props.titleEnglish,
            titleVN: this.props.titleVN,
            description: this.props.description,
            views: this.props.views,
            liked: this.props.liked,
            urlImageLike: this.props.urlImageLike,
            textButtonLike:this.props.textButtonLike
        }
    }


    componentWillReceiveProps(nextProps) {
        //  console.log("componentWillReceiveProps", nextProps.movieId);
        this.setState({
            movieId: nextProps.movieId,
            imageMovie: nextProps.imageMovie,
            titleEnglish: nextProps.titleEnglish,
            titleVN: nextProps.titleVN,
            description: nextProps.description,
            views: nextProps.views,
            liked: nextProps.liked,
            urlImageLike: nextProps.urlImageLike,
            textButtonLike: nextProps.textButtonLike
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate', nextState.liked);
        const liked = nextState.liked
        const oldLiked = this.state.liked

        // If "liked" or "likeCount" is different, then update
        return liked !== oldLiked
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
                        <Text style={style.titleEnglish}>{this.state.titleEnglish}</Text>
                        <Text style={style.titleVN}>{this.state.titleVN}</Text>
                        <Text style={style.textView}>Lượt xem: {this.state.views}</Text>
                        <Text
                            style={style.textContent}
                            numberOfLines={4}
                        >{this.state.description}</Text>
                        <View style={style.containerButton}>
                            <View style={style.containerButton}>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.onClickButtonLike(this.state.movieId)
                                    }}
                                ><Image source={this.state.urlImageLike} style={{ width: 15, height: 15 }}></Image>
                                </TouchableWithoutFeedback>
                                <Text style={style.textLike}>{this.state.textButtonLike}</Text>
                            </View>
                            <TouchableOpacity style={style.buttonView}

                            ><Text style={style.textButton}>Xem phim</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ height: 1, backgroundColor: 'white' }}></View>
            </View>
        )
    }
}


export default class ListFilmComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valuesListMovies: [],
            isFetching: false,
            current_page: 1,
            total_pages: 1,
        };
        this.onClickButtonLike = this.onClickButtonLike.bind(this)
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
        }
        this.setState({
            valuesListMovies: this.state.valuesListMovies.concat(nextProps.movies.data),
            isFetching: nextProps.isLoading,
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
        //   console.log('id movie = ',movieId);
        var listMovies = this.state.valuesListMovies
        for (i = 0; i < listMovies.length; i++) {
            if (listMovies[i].id == movieId) {
                //     console.log(this.state.valuesListMovies[i]);
                var movie = listMovies[i];
                if (listMovies[i].liked) {
                    movie.liked = false
                    movie.urlImageLike = require('../../../assets/images/ic_like.png')
                    movie.textButtonLike = 'Thích'
                    listMovies[i] = movie
                } else {
                    movie.liked = true
                    movie.urlImageLike = require('../../../assets/images/ic_like_orange.png')
                    movie.textButtonLike = 'Đã thích'
                    listMovies[i] = movie
                }
                this.setState({
                    valuesListMovies: listMovies
                })

            }
        }
    }
    render() {
        return (
            <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width: '100%', height: '100%' }}>
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
                                    titleEnglish={item.item.title}
                                    titleVN={item.item.title}
                                    description={item.item.description}
                                    views={item.item.views}
                                    liked={item.item.liked}
                                    urlImageLike={item.item.urlImageLike}
                                    onClickButtonLike={this.onClickButtonLike}
                                    textButtonLike = {item.item.textButtonLike}
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
        backgroundColor: 'red',
        height: 200,
    },
    content: {
        flex: 2,
        paddingLeft: 10,
        flexDirection: 'column',
    },
    titleEnglish: {
        color: '#fd6003',
        fontSize: 15,
        textTransform: 'uppercase'
    },
    titleVN: {
        color: 'white',
        fontSize: 15,
    },
    textView: {
        color: '#fea46f',
        fontSize: 13,
    },
    textContent: {
        color: 'white',
        fontSize: 15,
    },
    containerButton: {
        flexDirection: 'row',
        marginTop: 5,
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    textLike: {
        color: 'white',
        marginLeft: 5,
        fontSize: 15
    },
    buttonView: {
        backgroundColor: '#fd6003',
        width: 100,
        height: 35,
        borderBottomEndRadius: 5,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        padding: 5
    },
    textButton: {
        color: 'white',
        fontSize: 15,
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
