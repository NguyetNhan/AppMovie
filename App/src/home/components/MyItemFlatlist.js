/* eslint-disable indent */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

export default class MyItemFlatlist extends Component {
        constructor (props) {
                super(props);
                this.state = {
                        movieId: this.props.movieId,
                        imageMovie: this.props.imageMovie,
                        title: this.props.title,
                        description: this.props.description,
                        views: this.props.views,
                        liked: this.props.liked,
                        urlImageLike: this.props.urlImageLike,
                        textButtonLike: this.props.textButtonLike,
                        colorTextLike: this.props.colorTextLike,
                        //    userLogin:this.props.userLogin
                };
                this.onSearchTitleEnglish = this.onSearchTitleEnglish.bind(this);
                this.onSearchTitleVN = this.onSearchTitleVN.bind(this);
        }


        componentWillReceiveProps (nextProps) {
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
                        colorTextLike: nextProps.colorTextLike,
                        //    userLogin :nextProps.userLogin
                });
        }

        shouldComponentUpdate (nextProps, nextState) {
                //  console.log('shouldComponentUpdate', nextState.liked);
                const liked = nextState.liked;
                const oldLiked = this.state.liked;

                // If "liked" or "likeCount" is different, then update
                return liked !== oldLiked;
        }

        onSearchTitleEnglish (value) {
                var pos = value.lastIndexOf('/');
                // console.log('vi tri dau / = ',pos);
                if (pos > -1) {
                        return value.slice(0, pos);
                } else {
                        return value;
                }
        }

        onSearchTitleVN (value) {
                var pos = value.lastIndexOf('/');

                // console.log('vi tri dau / = ',pos);
                if (pos > -1) {
                        return value.slice(pos + 2);
                } else {
                        return value;
                }
        }

        render () {

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
                                                        <TouchableOpacity style={style.containerButton}
                                                                onPress={() => {
                                                                        this.props.onClickButtonLike(this.state.movieId);
                                                                }}
                                                        ><Image source={this.state.urlImageLike} style={{ width: 18, height: 15 }}></Image>
                                                                <Text style={{
                                                                        color: `${this.state.colorTextLike}`,
                                                                        marginLeft: 5,
                                                                        fontSize: 15,
                                                                        fontFamily: 'OpenSans-Regular',
                                                                }}>{this.state.textButtonLike}</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={style.buttonView}
                                                                onPress={() => {
                                                                        this.props.onClickButtonWatchMovie(this.state.movieId);
                                                                }}
                                                        ><Text style={style.textButton}>Xem phim</Text></TouchableOpacity>
                                                </View>
                                        </View>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#c68368' }}></View>
                        </View>
                );
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
                fontFamily: 'OpenSans-Bold',
        },
        titleVN: {
                color: 'white',
                fontSize: 15,
                textTransform: 'capitalize',
                fontFamily: 'OpenSans-Bold',
        },
        textView: {
                color: '#fea46f',
                fontSize: 13,
                fontFamily: 'OpenSans-Italic',
        },
        textContent: {
                color: 'white',
                fontSize: 15,
                marginVertical: 10,
                fontFamily: 'OpenSans-Regular',
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
                fontFamily: 'OpenSans-Regular',
        }
});
