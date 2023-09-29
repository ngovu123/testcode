import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import { fetchRandomContact } from '../utils/api';
import colors from '../utils/colors';

const Profile = ({ route }) => {
  const { contact } = route.params;
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cell, setCell] = useState('');

  useEffect(() => {
    fetchRandomContact()
      .then((contact) => {
        setAvatar(contact.avatar);
        setName(contact.name);
        setEmail(contact.email);
        setPhone(contact.phone);
        setCell(contact.cell);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.avatarSection}>
        <ContactThumbnail avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <DetailListItem icon="mail" title="Email" subtitle={email} />
        <DetailListItem icon="phone" title="Work" subtitle={phone} />
        <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default Profile;
