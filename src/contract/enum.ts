export enum Features {
  /**
   * enable `/login` for view and login functionality
   */
  enableLogin = 'enable-login-view',

  /**
   * enable `/register` for view and register functionality
   */
  enableRegister = 'enable-register-view',

  enableForgotPassword = 'enable-forgot-password-view',

  enableResetPassword = 'enable-reset-password-view',

  enableTwofactorAuth = 'enable-two-factor-auth-view',

  enableVerifyEmail = 'enable-verify-email-view',

  enableDeleteUserProfile = 'enable-delete-user-profile',
}

export enum Algorithem {
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
