import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableWithoutFeedback, Text, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
//import ItemFilmComponent from './ItemFilmComponent';

import { fetchFilm, likeFilm, xemFilm } from '../actions/index';




export default class ListFilmComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            valuesListMovies: [],
            isFetching: false,
            current_page: 1,
            total_pages: 1,
            imageButtonLike: require('../../../assets/images/ic_like.png'),
            flatButtonLike: false
        };
    }
    componentDidMount() {
        this.props.onFetchFilm(1)
    }

    // nhận dữ liệu từ container mapStateToProps
    componentWillReceiveProps(nextProps) {
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

    onClickButtonLike() {
        if (this.state.flatButtonLike) {
            this.setState({
                imageButtonLike: require('../../../assets/images/ic_like.png'),
                flatButtonLike: false
            })
        } else {
            this.setState({
                imageButtonLike: require('../../../assets/images/ic_like_orange.png'),
                flatButtonLike: true
            })
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
                        extraData={ this.state}
                        data={this.state.valuesListMovies}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <View style={style.container}>
                                        <Image
                                            style={style.image}
                                            source={{ uri: item.image }}
                                        ></Image>
                                        <View style={style.content}>
                                            <Text style={style.titleEnglish}>{item.title}</Text>
                                            <Text style={style.titleVN}>{item.title}</Text>
                                            <Text style={style.textView}>Lượt xem: {item.views}</Text>
                                            <Text
                                                style={style.textContent}
                                                numberOfLines={4}
                                            >{item.description}</Text>
                                            <View style={style.containerButton}>
                                                <View style={style.containerButton}>
                                                    <TouchableWithoutFeedback
                                                        onPress={() => {
                                                            this.onClickButtonLike()
                                                        }}
                                                    ><Image source={this.state.imageButtonLike} style={{ width: 15, height: 15 }}></Image>
                                                    </TouchableWithoutFeedback>
                                                    <Text style={style.textLike}>Thich</Text>
                                                </View>
                                                <TouchableOpacity style={style.buttonView}

                                                ><Text style={style.textButton}>Xem phim</Text></TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: 1, backgroundColor: 'white' }}></View>
                                </View>
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
