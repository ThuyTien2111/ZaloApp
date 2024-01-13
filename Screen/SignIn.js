import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

import { setUser, setUserList } from "../Redux/Action";
import { useDispatch, useSelector } from 'react-redux';
export default function SignIn({ navigation }) {
    //redux
    var dispatch = useDispatch()
    var { user, userList } = useSelector((state) => state.zalochat)

    var [name, setName] = useState('');
    var [phone, setPhone] = useState('');
    var [pass, setPass] = useState('');
    function isFormValid() {
        return (
            name.trim() !== '' &&
            phone.trim() !== '' &&
            pass.trim() !== ''
        );
    }
    function handleSignin() {
        if(userList.find((u)=>u.phone==phone)){
            alert('Số điện thoại đã đăng ký')
        }else{
            dispatch(setUser({
                id: 4,
                username: name,
                phone: phone,
                pass: pass,
                mess: []
            }))
            dispatch(setUserList())
            navigation.navigate('LogIn')
        }
    }
    function handleLogin() {
        navigation.navigate('LogIn')
    }

    function isPhoneValid() {
        return /^0\d{9,11}$/.test(phone);
    }

    function isPasswordValid() {
        // Kiểm tra mật khẩu phải từ 8 ký tự trở lên và phải chứa ít nhất một chữ số
        return pass.length >= 8 && /\d/.test(pass);
    }
    console.log(userList)
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('./img/logo.png')} />
            <Text style={styles.title}>Create account</Text>
            <View style={styles.input}>
                <FontAwesome name="user-o" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Tên người dùng"
                    placeholderTextColor="black"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.input}>
                <MaterialCommunityIcons name="phone-settings-outline" size={24} color="black" style={styles.icon} />                <TextInput
                    style={styles.inputText}
                    placeholder="Số điện thoại"
                    placeholderTextColor="black"
                    value={phone}
                    onChangeText={(text) => setPhone(text)} />
            </View>
            {!isPhoneValid() && <Text style={styles.errorText}>Số điện thoại không hợp lệ</Text>}
            <View style={styles.input}>
                <MaterialIcons name="lock-outline" size={24} color="black" style={styles.icon} />
                <TextInput
                    style={styles.inputText}
                    placeholder="Mật khẩu"
                    placeholderTextColor="black"
                    value={pass}
                    onChangeText={(text) => setPass(text)} 
                    secureTextEntry/>
            </View>
            {!isPasswordValid() && <Text style={styles.errorText}>Mật khẩu phải từ 8 ký tự trở lên và chứa ít nhất 1 chữ số</Text>}
            <TouchableOpacity style={isFormValid() ? styles.button : styles.buttonDisabled}
                disabled={!isFormValid()} onPress={()=>handleSignin()}>
                <Text style={styles.buttonText}>ĐĂNG KÝ TÀI KHOẢN</Text>
            </TouchableOpacity>

            <View style={styles.bottomTitle}>
                <Text style={styles.bottomText}>Đã có tài khoản? </Text>
                <TouchableOpacity onPress={()=>handleLogin()}>
                    <Text style={styles.bottomText2}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 64,
        width: 180,
        marginBottom: 15,
    },
    title: {
        height: 50,
        fontSize: 30,
        fontWeight: '700',
        marginBottom: 50,
    },
    input: {
        width: 300,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#0068FF',
        paddingBottom: 10,
        marginBottom: 35,

    },
    bottomTitle: {
        position: 'absolute',
        width: 300,
        flexDirection: 'row',
        marginTop: 580
    },
    icon: {
        marginRight: 20
    },
    inputText: {
        paddingRight: 50
    },
    button: {
        marginTop: 26,
        backgroundColor: '#0068FF'
    },
    buttonDisabled: {
        marginTop: 26,
        backgroundColor: 'gray'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        paddingHorizontal: 50,
        paddingVertical: 10,
    },
    bottomText: {
        fontSize: 16,
        fontWeight: 500
    },
    bottomText2: {
        fontSize: 16,
        fontWeight: 700,
        color: '#0068FF'
    },
    errorText: {
        width:200,
        color: 'red',
        marginLeft:-90,
        marginBottom:10,
        marginTop:-30,
    },
});
