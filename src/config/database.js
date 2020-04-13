module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'helloworld',
  database: 'contact_schedule',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
