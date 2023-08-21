declare module 'adonis-rapid/enum' {
  enum Features {
    enableLoginView = 'enable-login-view',
    enableRegisterView = 'enable-register-view',
    enableForgotPasswordView = 'enable-forgot-password-view',
    enableResetPasswordView = 'enable-reset-password-view',
    enableTwofactorAuthView = 'enable-two-factor-auth-view',
    enableVerifyEmailView = 'enable-verify-email-view',
  }

  enum Algorithem {
    SHA1 = 'SHA1',
    SHA224 = 'SHA224',
    SHA256 = 'SHA256',
    SHA384 = 'SHA384',
    SHA512 = 'SHA512',
    SHA3224 = 'SHA3224',
    SHA3256 = 'SHA3256',
    SHA3384 = 'SHA3384',
    SHA3512 = 'SHA3512',
  }
}
