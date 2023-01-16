module.exports = async () => {
  process.env.TZ = 'Asia/Tokyo';
  process.env.LANG = 'ja_JP.UTF-8';
  process.env.DATABASE_URL = 'postgresql://pguser:password@localhost:5432/appdb?schema=public';
};
