declare module 'Rapid/Middleware/Auth' {
  const authMiddleware: import('../app/Middleware/Auth').default

  export default authMiddleware
}

declare module 'Rapid/Middleware/Guest' {
  const guestMiddleware: import('../app/Middleware/Guest').default

  export default guestMiddleware
}

declare module 'Rapid/Middleware/SilentAuth' {
  const silentAuthMiddleware: import('../app/Middleware/SilentAuth').default

  export default silentAuthMiddleware
}

declare module 'Rapid/Controllers/Http/ConfirmPasswordController' {
  const confirmPasswordController: import('../app/Controllers/Http/')
}
