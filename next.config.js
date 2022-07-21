console.log(`>>>NEXT_PUBLIC_ENV`, process.env.NEXT_PUBLIC_ENV);
console.log(`>>>NEXT_PUBLIC_VERCEL_ENV`, process.env.NEXT_PUBLIC_VERCEL_ENV);

module.exports = {
  env: {
    PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
    VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  },
};
