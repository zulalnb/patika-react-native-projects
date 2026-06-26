import { useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { StackScreenProps } from '@react-navigation/stack';
import {
  getAuth,
  signInWithEmailAndPassword,
} from '@react-native-firebase/auth';
import { showMessage } from 'react-native-flash-message';
import { Formik } from 'formik';
import authErrorMessageParser from '@/utils/authErrorMessageParser';

import styles from './Login.style';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { AuthStackParamList } from '@/types/navigation';

interface LoginFormValues {
  usermail: string;
  password: string;
}

type Props = StackScreenProps<AuthStackParamList, 'LoginScreen'>;

const initalFormValues: LoginFormValues = {
  usermail: '',
  password: '',
};

const Login = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    navigation.navigate('SignupScreen');
  };

  const handleFormSubmit = async (formValues: LoginFormValues) => {
    try {
      setLoading(true);
      console.log(formValues);

      await signInWithEmailAndPassword(
        getAuth(),
        formValues.usermail,
        formValues.password,
      );
      setLoading(false);
    } catch (error) {
      console.log(error);

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
            <Button text="Giriş Yap" onPress={handleSubmit} loading={loading} />
          </>
        )}
      </Formik>

      <Button text="Kayıt Ol" theme="secondary" onPress={handleSignUp} />
    </SafeAreaView>
  );
};

export default Login;
