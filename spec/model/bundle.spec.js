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
            return expect(Bundle.get('de305d54-75b4-431b-adb2-eb6b9e546015'))
                .to.eventually.have.property('app_id')
                .and.equal('com.example.TestingApp');
        });

        it('should be resolved with undefined when bundle does not exists', () => {
            return expect(Bundle.get('de305d54-75b4-431b-adb2-eb6b9e546016'))
                .to.eventually.be.an('undefined');
        });
    });

    describe('create', () => {
        it('should  assign unique id for created bundle', () => {
            let bundle = {
                app_id: 'com.example.JustForTest',
                name: 'Just For Test',
                version: '1.0.0',
                url: 'http://example.com/just-for-test.ipa'
            };

            return expect(Bundle.create(bundle))
                .to.eventually.have.property('id');
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
});
