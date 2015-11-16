import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import getDataConnector from '../../src/getDataConnector';
import Bundle from '../../src/model/bundle';

chai.use(chaiAsPromised);

let knex = getDataConnector();
let expect = chai.expect;

describe('Bundle Model', () => {
    beforeEach((next) => {
        knex.migrate.latest()
            .then(() => {
                return knex.seed.run();
            })
            .then(() => {
                next();
            });
    });

    describe('get', () => {
        it('should fetch bundle data by id', () => {
            return expect(Bundle.get('de305d54-75b4-431b-adb2-eb6b9e546014'))
                .to.eventually.have.property('app_id')
                .and.equal('com.example.MyApp');
        });

        it('should fetch bundle data by id (2)', () => {
            return expect(Bundle.get('de305d54-75b4-431b-adb2-eb6b9e546021'))
                .to.eventually.have.property('app_id')
                .and.equal('com.example.TestingApp');
        });

        it('should be resolved with undefined when bundle does not exists', () => {
            return expect(Bundle.get('de305d54-75b4-431b-adb2-eb6b9e546099'))
                .to.eventually.be.an('undefined');
        });
    });

    describe('create', () => {
        it('should assign unique id for created bundle', () => {
            let bundle = {
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.eventually.have.property('id');
        });

        it('should fill created_at field for created bundle', () => {
            let bundle = {
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.eventually.have.property('created_at')
                .and.not.equal(null);
        });

        it('should fill updated_at field for created bundle', () => {
            let bundle = {
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.eventually.have.property('updated_at')
                .and.not.equal(null);
        });

        it('should accept overriden manifest url', () => {
            let bundle = {
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa',
                manifest_url: 'http://example.com/just-for-test.plist'
            };

            return expect(Bundle.create(bundle))
                .to.eventually.have.property('manifest_url')
                .and.equal('http://example.com/just-for-test.plist');
        });

        it('should ignore given id for created bundle', () => {
            let bundle = {
                id: 'de305d54-75b4-431b-adb2-eb6b9e546000',
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.eventually.have.property('id')
                .and.not.equal('de305d54-75b4-431b-adb2-eb6b9e546000');
        });

        it('should reject bundle without app_id', () => {
            let bundle = {
                id: 'de305d54-75b4-431b-adb2-eb6b9e546000',
                name: 'Just For Test',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.be.rejected;
        });

        it('should reject bundle without name', () => {
            let bundle = {
                id: 'de305d54-75b4-431b-adb2-eb6b9e546000',
                app_id: 'com.example.JustForTest',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.be.rejected;
        });

        it('should reject bundle without version', () => {
            let bundle = {
                id: 'de305d54-75b4-431b-adb2-eb6b9e546000',
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.be.rejected;
        });

        it('should reject bundle without url', () => {
            let bundle = {
                id: 'de305d54-75b4-431b-adb2-eb6b9e546000',
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                version: '1.0.0'
            };

            return expect(Bundle.create(bundle))
                .to.be.rejected;
        });
    });

    describe('list', () => {
        it('should first page of bundles', () => {
            return expect(Bundle.list())
                .to.eventually.have.length(10)
        });

        it('should second page of bundles', () => {
            var params = {
                page: 2
            };

            return expect(Bundle.list(params))
                .to.eventually.have.length(4)
        });

        it('should allow set page size', () => {
            var params = {
                pageSize: 5
            };

            return expect(Bundle.list(params))
                .to.eventually.have.length(5)
        });

        it('should sort by created_at DESC', () => {
            return expect(Bundle.list().then(list => list[0]))
                .to.eventually.have.property('created_at')
                .and.equal(100)
        });
    });
});
