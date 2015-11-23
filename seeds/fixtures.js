
exports.seed = function(knex, Promise) {
    return Promise.join(
        knex('bundles').del(),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546014',
            app_id: 'com.example.MyApp',
            name: 'MyApp',
            version: '1.0.0',
            url: 'http://example.com/MyApp-1.0.0.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546015',
            app_id: 'com.example.MyApp',
            name: 'MyApp',
            version: '1.0.1',
            url: 'http://example.com/MyApp-1.0.1.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546016',
            app_id: 'com.example.MyApp',
            name: 'MyApp',
            version: '1.0.2',
            url: 'http://example.com/MyApp-1.0.2.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546017',
            app_id: 'com.example.MyApp',
            name: 'MyApp',
            version: '1.0.3',
            url: 'http://example.com/MyApp-1.0.3.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546018',
            app_id: 'com.example.MyApp',
            name: 'MyApp',
            version: '1.0.4',
            url: 'http://example.com/MyApp-1.0.4.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546019',
            app_id: 'com.example.MyApp',
            name: 'MyApp',
            version: '1.0.5',
            url: 'http://example.com/MyApp-1.0.5.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546020',
            app_id: 'com.example.MyApp',
            name: 'MyApp',
            version: '1.0.6',
            url: 'http://example.com/MyApp-1.0.6.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546021',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.0',
            url: 'http://example.com/TestingApp-1.0.0.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546022',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.1',
            url: 'http://example.com/TestingApp-1.0.1.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546023',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.2',
            url: 'http://example.com/TestingApp-1.0.2.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546024',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.3',
            url: 'http://example.com/TestingApp-1.0.3.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546025',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.4',
            url: 'http://example.com/TestingApp-1.0.4.ipa',
            created_at: 100,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546026',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.5',
            url: 'http://example.com/TestingApp-1.0.5.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: 'de305d54-75b4-431b-adb2-eb6b9e546027',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.6',
            url: 'http://example.com/TestingApp-1.0.6.ipa',
            created_at: 0,
            updated_at: 0,
            published: 1
        }),

        knex('bundles').insert({
            id: '79dbdd38-1233-42f8-9d32-a1dad5871b52',
            app_id: 'com.example.TestingApp',
            name: 'TestingApp',
            version: '1.0.7',
            url: 'http://example.com/TestingApp-1.0.7.ipa',
            created_at: 0,
            updated_at: 0,
            published: 0
        })
  );
};
