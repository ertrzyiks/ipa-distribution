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
});
