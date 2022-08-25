import React, { useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Dialog, Button } from '@rneui/themed';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { getContacts, toggleDialog, modalInfo } from '../../store/services/contactSlice';
import Spinner from '../UI/Spinner/Spinner';

const ListItem = () => {
    const { contacts, isLoading, contact, visible } = useSelector(state => state, shallowEqual);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    return (
        <>
            {isLoading ? <Spinner /> :
                <ScrollView>
                    <View
                        style={styles.container}
                    >
                        {contacts.map((contact) => (
                            <View
                                key={contact.id}
                                style={styles.item}
                            >
                                <Avatar
                                    size={64}
                                    rounded
                                    source={contact.photo ? { uri: contact.photo } : {}}
                                />
                                <TouchableOpacity>
                                    <Text onPress={() => dispatch(modalInfo(contact.id))} style={styles.text}>{contact.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                        <Dialog
                            isVisible={visible}
                            onBackdropPress={() => dispatch(toggleDialog(true))}
                        >
                            {contact !== null ? contact.map((user) => (
                                <View key={user.id}>
                                    <Dialog.Title title={user.name} />
                                    <Avatar
                                        size={128}
                                        source={user.photo ? { uri: user.photo } : {}}
                                    />
                                    <Text><Text style={styles.decor}>Number:</Text> {user.phone}</Text>
                                    <Text><Text style={styles.decor}>Email:</Text> {user.email}</Text>
                                    <Button
                                        title="Back to list"
                                        icon={{
                                            name: 'home',
                                            type: 'font-awesome',
                                            size: 15,
                                            color: 'white',
                                        }}
                                        iconContainerStyle={{ marginRight: 10 }}
                                        titleStyle={{ fontWeight: '700' }}
                                        buttonStyle={{
                                            backgroundColor: 'rgba(90, 154, 230, 1)',
                                            borderColor: 'transparent',
                                            borderWidth: 0,
                                            borderRadius: 30,
                                        }}
                                        containerStyle={{
                                            width: 200,
                                            marginHorizontal: 50,
                                            marginVertical: 10,
                                        }}
                                        onPress={() => dispatch(toggleDialog(false))}
                                    />
                                </View>
                            )) : null}

                        </Dialog>
                    </View>
                </ScrollView>}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
    },
    item: {
        borderColor: '#000',
        borderBottomWidth: 2,
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',

    },
    text: {
        color: 'black',
        fontSize: 20,
        fontWeight: '600',
        marginLeft: 20
    },
    decor: {
        fontSize: 16,
        fontWeight: '700',
    }

})

export default ListItem;