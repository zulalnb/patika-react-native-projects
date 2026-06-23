export default (errorCode: string) => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Geçersiz e-posta adresi.';

    case 'auth/email-already-in-use':
      return 'Bu e-posta zaten kayıtlı.';

    case 'auth/user-not-found':
    case 'auth/invalid-credential':
      return 'E-posta veya parola hatalı.';

    case 'auth/weak-password':
      return 'Parola çok zayıf.';

    case 'auth/too-many-requests':
      return 'Çok fazla deneme yaptınız. Lütfen daha sonra tekrar deneyin.';

    case 'auth/network-request-failed':
      return 'İnternet bağlantınızı kontrol edin.';

    case 'auth/user-disabled':
      return 'Bu hesap devre dışı bırakılmış.';

    case 'auth/requires-recent-login':
      return 'Bu işlem için tekrar giriş yapmanız gerekiyor.';

    default:
      return 'Beklenmeyen bir hata oluştu.';
  }
};
