export const googleOidcRegExp = new RegExp(
  'https://accounts.google.com/o/oauth2/v2/auth?client_id=404872968174-btvd5ovkt88k12u3ua3ia5pnli55mmtr.apps.googleusercontent.com&scope=openid%20email&response_type=code&redirect_uri=https%3A%2F%2Flocalhost%2Fgoogle%2Fcallback&response_mode=form_post&nonce=[w-]{43}&state=',
);

// https://accounts.google.com/o/oauth2/v2/
// auth?client_id=404872968174-btvd5ovkt88k12u3ua3ia5pnli55mmtr.apps.googleusercontent.com&
// scope=openid%20email&response_type=code&redirect_uri=
// https%3A%2F%2Flocalhost%2Fgoogle%2Fcallback&response_mode=form_post&nonce=
// 6OlwNt6bdAaKZsL4uf1oPT5n9vO6PoeRK4ezzRefHko&state=
// eyJyZXR1cm5UbyI6Imh0dHBzOi8vbG9jYWxob3N0L2dvb2dsZSJ9&
// code_challenge_method=S256&code_challenge=eV1gw5mNoAQjxTpugMkcbcDHjX-e8bIeYdv5v0L0TY0
