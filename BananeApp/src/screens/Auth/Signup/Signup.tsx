import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { Formik } from 'formik';

import authErrorMessageParser from '@/utils/authErrorMessageParser';

import styles from './Signup.style';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { AuthStackParamList } from '@/types/navigation';

interface SignupFormValues {
  usermail: string;
  password: string;
  repassword: string;
}

type Props = StackScreenProps<AuthStackParamList, 'SignupScreen'>;

const initalFormValues: SignupFormValues = {
  usermail: '',
  password: '',
  repassword: '',
};

const Sign = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    navigation.goBack();
  };

  const handleFormSubmit = async (formValues: SignupFormValues) => {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return;
    }

    try {
      setLoading(true);
      console.log(formValues);

      await createUserWithEmailAndPassword(
        getAuth(),
        formValues.usermail,
        formValues.password,
      );
      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
      });
      setLoading(false);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        showMessage({
          message: authErrorMessageParser(error.code as string),
          type: 'danger',
        });
      }
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>bana ne?</Text>
      <Formik initialValues={initalFormValues} onSubmit={handleFormSubmit}>
        {({ values, handleChange, handleSubmit }) => (
          <>
            <Input
              value={values.usermail}
              onType={handleChange('usermail')}
              placeholder="e-postanızı giriniz.."
              keyboardType="email-address"
            />
            <Input
              value={values.password}
              onType={handleChange('password')}
              placeholder="şifrenizi giriniz.."
              isSecure
            />
            <Input
              value={values.repassword}
              onType={handleChange('repassword')}
              placeholder="şifrenizi tekrar giriniz.."
              isSecure
            />
            <Button text="Kayıt Ol" loading={loading} onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <Button text="Giriş Yap" theme="secondary" onPress={handleLogin} />
    </SafeAreaView>
  );
};

export default Sign;
