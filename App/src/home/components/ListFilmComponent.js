import React, { Component } from 'react';
import { View, StyleSheet, ImageBackground, FlatList, StatusBar, Image, TouchableOpacity, Text } from 'react-native';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";
import Modal from "react-native-simple-modal";


import MyItemFlatlist from './MyItemFlatlist';

export default class ListFilmComponent extends Component {

        constructor (props) {
                super(props)
                this.state = {
                        valuesListMovies: [],
                        isFetching: false,
                        current_page: 1,
                        total_pages: 1,
                        user: null,
                        selectMovie: null,
                        textRef: React.createRef(),
                        menuRef: null,
                        open: false,
                        userLocal: null
                }
                this.onClickButtonLike = this.onClickButtonLike.bind(this)
                this.onClickButtonWatchMovie = this.onClickButtonWatchMovie.bind(this)
                this.onSearchTitleEnglish = this.onSearchTitleEnglish.bind(this)
                this.onRefresh = this.onRefresh.bind(this)

        }

        componentDidMount () {
                this.setState({
                        isFetching: true,
                        user: this.props.navigation.getParam('user', null)
                });
                this.props.onFetchFilm({ page: 1, user: this.state.user });
        }


        // nhận dữ liệu từ container mapStateToProps
        componentWillReceiveProps (nextProps) {

                if (nextProps.userLocal != undefined) {
                        console.log('componentWillReceiveProps: ', nextProps.userLocal);
                        this.setState({
                                userLocal: nextProps.userLocal,
                        })
                }
                let user = nextProps.navigation.getParam('user', null)
                if (nextProps.movies === undefined) {
                        this.setState({
                                user: user,
                                isFetching: this.state.isFetching,
                                valuesListMovies: this.state.valuesListMovies,
                        });
                } else {
                        this.setState({
                                user: user,
                                isFetching: nextProps.isLoading,
                                valuesListMovies: this.state.valuesListMovies.concat(nextProps.movies.data),
                        });
                }

        }
        componentWillMount () {
                //      console.log('componentWillMount: ');
                this.setState({
                        user: this.props.navigation.getParam('user', null),
                })
        }

        shouldComponentUpdate (nextProps, nextState) {
                //   console.log('shouldComponentUpdate: ');
                const user = nextProps.navigation.getParam('user', null)
                const oldUser = this.state.user
                //    console.log(`new user: ${user} old user: ${oldUser}`);
                return true
        }



        onRefresh () {
                //    console.log('this.state.user: ', this.state.user);
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
                console.log('this.state.user ', this.state.user);
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

        onLogout (user) {
                //  console.log('user: ', user);
                this.state.menuRef.hide();
                this.props.onClickLogout(user.access_token);
                this.props.navigation.setParams({
                        user: null
                })
                this.onRefresh();
        }

        // hiện popup menu

        //   menuRef = null;
        setMenuRef = ref => {
                this.setState({
                        menuRef: ref
                })
        }
        hideMenu = () => this.state.menuRef.hide();
        showMenu = () => this.state.menuRef.show(this.state.textRef.current, stickTo = Position.BOTTOM_CENTER);

        // popup information 
        /* modalDidOpen = () => console.log("Modal did open.");

        modalDidClose = () => {
                this.setState({ open: false });
                console.log("Modal did close.");
        }; */

        moveUp = () => this.setState({ offset: -100 });

        resetPosition = () => this.setState({ offset: 0 });

        openModal = () => {
                //   console.log('this.state.userLocal', JSON.parse(this.state.userLocal));
                this.state.menuRef.hide();
                this.props.onFetchInfoUserLocal(this.state.user);
                this.setState({
                        open: true
                })
                /*    setTimeout(() => {
                           this.setState({
                                   isFetching: false,
                                   open: true
                           });
                   }, 1000) */
        }

        closeModal = () => this.setState({ open: false });

        render () {
                return (
                        <ImageBackground source={require('../../../assets/images/bg.png')} style={{ width: '100%', height: '100%', }}>
                                {/* đổi màu thanh trạng thái */}
                                <StatusBar
                                        barStyle="light-content"
                                        backgroundColor="#fd6003"
                                />
                                <View style={{ width: '100%', height: 50, flexDirection: 'row', backgroundColor: '#fd6003', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{
                                                textAlign: "center",
                                                flex: 1,
                                                textTransform: 'uppercase',
                                                fontFamily: 'UVN-Baisau-Bold',
                                                color: 'white',
                                                fontSize: 25,
                                        }}>hfilm</Text>
                                        <TouchableOpacity
                                                ref={this.state.textRef}
                                                onPress={this.showMenu}
                                        >
                                                <Image source={require('../../../assets/images/profile.png')} style={{ height: 25, width: 25 }}></Image>
                                        </TouchableOpacity>
                                </View>
                                {/*    popup menu */}
                                {
                                        this.state.user === null ? <Menu ref={this.setMenuRef}>
                                                <MenuItem onPress={() => {
                                                        this.props.navigation.replace('Login')
                                                }} ><Image source={require('../../../assets/images/login.png')} style={{ height: 20, width: 20, marginRight: 10 }} /> <Text>Đăng nhập</Text></MenuItem>

                                        </Menu> : <Menu ref={this.setMenuRef}>
                                                        <MenuItem onPress={
                                                                this.openModal
                                                        } ><Image source={require('../../../assets/images/info.png')} style={{ height: 20, width: 20, marginRight: 10 }} /> <Text>Hồ sơ</Text></MenuItem>
                                                        <MenuItem onPress={() => {
                                                                this.onLogout(this.state.user)
                                                        }}><Image source={require('../../../assets/images/logout.png')} style={{ height: 20, width: 20, marginRight: 10 }} /> <Text>Đăng xuất</Text></MenuItem>
                                                </Menu>
                                }
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
                                        {/*   popup information user */}
                                        {
                                                this.state.user === null ? null : this.state.userLocal === null ? null : <Modal
                                                        offset={this.state.offset}
                                                        open={this.state.open}
                                                        //   modalDidOpen={this.modalDidOpen}
                                                        //  modalDidClose={this.modalDidClose}
                                                        style={{ alignItems: "center", borderRadius: 20, }}
                                                >
                                                        <View style={{ alignItems: "center" }}>
                                                                <Text style={{ fontSize: 20, marginBottom: 10, fontSize: 25, fontFamily: 'OpenSans-Bold', color: 'black' }}>Thông tin</Text>
                                                                <Text style={style.textTitleInfo}>Họ tên</Text>
                                                                <Text style={style.textContentInfo}>{JSON.parse(this.state.userLocal).full_name}</Text>
                                                                <Text style={style.textTitleInfo}>Email</Text>
                                                                <Text style={style.textContentInfo}>{JSON.parse(this.state.userLocal).email}</Text>
                                                                <Text style={style.textTitleInfo}>Giới tính</Text>
                                                                <Text style={style.textContentInfo}>{JSON.parse(this.state.userLocal).gender}</Text>
                                                                <Text style={style.textTitleInfo}>Ngày sinh</Text>
                                                                <Text style={style.textContentInfo}>{JSON.parse(this.state.userLocal).birthday}</Text>
                                                                <TouchableOpacity onPress={() => {
                                                                        this.closeModal();
                                                                        let user = {
                                                                                id: this.state.user.id,
                                                                                full_name: JSON.parse(this.state.userLocal).full_name,
                                                                                email: JSON.parse(this.state.userLocal).email,
                                                                                gender: JSON.parse(this.state.userLocal).gender,
                                                                                birthday: JSON.parse(this.state.userLocal).birthday,
                                                                        }
                                                                        this.props.navigation.navigate('EditInfoUser', {
                                                                                userLocal: user
                                                                        });
                                                                }}><Text style={style.textButtonInfo}>Chỉnh sửa</Text></TouchableOpacity>
                                                                <TouchableOpacity onPress={this.closeModal}><Text style={style.textButtonInfo}>Hủy</Text></TouchableOpacity>
                                                        </View>


                                                </Modal>
                                        }

                                </View >
                        </ImageBackground>
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
        },
        textTitleInfo: {
                fontFamily: 'OpenSans-Regular',
                fontSize: 18,
                color: '#fd6003',
                marginVertical: 5,

        },
        textContentInfo: {
                fontFamily: 'OpenSans-Regular',
                fontSize: 18,
                width: 300,
                backgroundColor: 'rgba(153, 153, 153, 0.3)',
                padding: 10,
                borderRadius: 15,
                textAlign: 'center'
        },
        textButtonInfo: {
                fontSize: 20,
                textDecorationLine: 'underline',
                marginTop: 10,
                color: 'blue',
                fontFamily: 'UVN-Baisau-Regular',
        }
})
