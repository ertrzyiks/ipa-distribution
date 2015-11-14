
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('bundles').del(),

    knex('bundles').insert({
      id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
      app_id: 'com.example.MyApp',
      name: 'MyApp',
      version: '1.0.0',
      url: 'http://example.com/MyApp-1.0.0.ipa'
    }),

    knex('bundles').insert({
      id: 'de305d54-75b4-431b-adb2-eb6b9e546015',
      app_id: 'com.example.TestingApp',
      name: 'TestingApp',
      version: '1.0.1',
      url: 'http://example.com/TestingApp-1.0.1.ipa'
    })
  );
};
