import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, getAuth } from '@react-native-firebase/auth/lib/modular';
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

const signupSchema = z
  .object({
    email: z.email('Geçerli bir e-posta girin'),
    password: z.string().min(6, 'Şifre en az 6 karakter olmalı'),
    confirmPassword: z.string().min(1, 'Şifre tekrarı zorunlu'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Şifreler eşleşmiyor',
    path: ['confirmPassword'],
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { control, handleSubmit } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupForm) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(getAuth(), data.email, data.password);
      showMessage({
        message: 'Kayıt başarılı!',
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
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  placeholder="e-postanızı giriniz.."
                  keyboardType="email-address"
                  value={value}
                  onType={onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  placeholder="şifrenizi giriniz.."
                  isSecure
                  value={value}
                  onType={onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { value, onChange }, fieldState }) => (
                <Input
                  placeholder="şifrenizi tekrar giriniz.."
                  isSecure
                  value={value}
                  onType={onChange}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Button text="Kayıt Ol" loading={loading} onPress={handleSubmit(onSubmit)} />
            <Button text="Geri" theme="secondary" onPress={() => router.back()} />
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
    padding: 12,
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
