import { zodResolver } from '@hookform/resolvers/zod';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { KeyboardAvoidingView, KeyboardController } from 'react-native-keyboard-controller';
import { z } from 'zod';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import colors from '@/styles/colors';
import authErrorMessageParser from '@/utils/authErrorMessageParser';

const loginSchema = z.object({
  email: z.email('Geçerli bir e-posta girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), data.email, data.password);
      showMessage({
        message: 'Giriş başarılı!',
        type: 'success',
      });
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        showMessage({
          message: authErrorMessageParser(error.code as string),
          type: 'danger',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <TouchableWithoutFeedback onPress={() => KeyboardController.dismiss()}>
        <View style={styles.inner}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>codetalks</Text>
          </View>

          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="e-postanızı giriniz.."
                  keyboardType="email-address"
                  value={value}
                  onType={onChange}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="şifrenizi giriniz.."
                  isSecure
                  value={value}
                  onType={onChange}
                  error={errors.password?.message}
                />
              )}
            />

            <Button text="Giriş Yap" loading={loading} onPress={handleSubmit(onSubmit)} />

            <Button text="Kayıt Ol" theme="secondary" onPress={() => router.push('/signup')} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkOrange,
  },
  inner: {
    flex: 1,
    padding: 12,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    margin: 5,
    fontSize: 32,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
