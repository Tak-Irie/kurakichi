import * as Sentry from '@sentry/node';
// import * as Tracing from '@sentry/tracing';

export const sentryTest = () => {
  Sentry.init({
    dsn: 'https://42dc821fd601459da88a8a3966ec911f@o545615.ingest.sentry.io/5667857',

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });

  const transaction = Sentry.startTransaction({
    op: 'test',
    name: 'My First Test Transaction',
  });

  setTimeout(() => {
    try {
      console.log('sentry test:');
    } catch (e) {
      Sentry.captureException(e);
    } finally {
      transaction.finish();
    }
  }, 99);
};
