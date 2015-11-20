import chai from 'chai';
import sinon from 'sinon';
import getDataConnector from '../../src/getDataConnector';
import api from '../../src/api/app';
import request from 'supertest-as-promised';
import q from 'q';
import Bundle from '../../src/model/bundle';

let Promise = q.Promise;

let expect = chai.expect;

let knex = getDataConnector();

describe('Bundles API', () => {
    var apiRequest;
    var bundleUpdateStub;

    beforeEach((next) => {
        apiRequest = request(api);

        knex.migrate.latest()
            .then(() => {
                return knex.seed.run();
            })
            .then(() => {
                next();
            });
    });

    afterEach(() => {
        if (bundleUpdateStub) {
            bundleUpdateStub.restore();
            bundleUpdateStub = null;
        }
    });

    describe('get list', () => {
        it('should allow to get list of bundles', () => {

            return apiRequest
                .get('/v1/bundles')
                .expect(200)
                .expect((res) => {
                    let body = res.body;

                    expect(body).to.have.length(10);
                })
        });

        it('should allow to get other page of list of bundles', () => {

            return apiRequest
                .get('/v1/bundles?page=2')
                .expect(200)
                .expect((res) => {
                    let body = res.body;

                    expect(body).to.have.length(4);
                })
        });

        it('should return unpublished results for showunpublished in the query string', () => {

            return apiRequest
                .get('/v1/bundles?pageSize=100&showunpublished=true')
                .expect(200)
                .expect((res) => {
                    let body = res.body;
                    expect(body).to.have.length(15);

                    var unpublished = body.filter(el => el.published == false)
                    expect(unpublished).to.have.length(1);
                })
        });

        it('should include manifest url and download url', () => {

            return apiRequest
                .get('/v1/bundles')
                .expect(200)
                .expect((res) => {
                    let body = res.body;
                    let bundle = body[0];

                    expect(bundle).to.have.property('manifest_url')
                        .and.contain(`/v1/bundles/${bundle.id}/manifest.plist`);
                    expect(bundle).to.have.property('download_url')
                        .and.contain('itms-services://?action=download-manifest&url=')
                        .and.contain(bundle.manifest_url);
                })
        });
    });

    describe('get', () => {
        it('should allow to get info about bundle', () => {

            return apiRequest
                .get('/v1/bundles/de305d54-75b4-431b-adb2-eb6b9e546014')
                .expect(200)
                .expect('Content-type', /json/)
                .expect((res) => {
                    let body = res.body;

                    expect(body).to.have.property('id')
                        .and.equal('de305d54-75b4-431b-adb2-eb6b9e546014');
                    expect(body).to.have.property('app_id')
                        .and.equal('com.example.MyApp');
                    expect(body).to.have.property('name')
                        .and.equal('MyApp');
                    expect(body).to.have.property('version')
                        .and.equal('1.0.0');
                    expect(body).to.have.property('url')
                        .and.equal('http://example.com/MyApp-1.0.0.ipa');
                    expect(body).to.have.property('manifest_url')
                        .and.contain('/v1/bundles/de305d54-75b4-431b-adb2-eb6b9e546014/manifest.plist');
                    expect(body).to.have.property('download_url')
                        .and.contain('itms-services://?action=download-manifest&url=')
                        .and.contain(body.manifest_url);
                });
        });

        it('should respond with 404 error when requested with invalid id', () => {

            return apiRequest
                .get('/v1/bundles/de305d54-75b4-431b-adb2-eb6b9e546099')
                .expect(404);
        });
    });

    describe('get manifest', () => {
        it('should allow to get manifest xml for bundle', () => {

            return apiRequest
                .get('/v1/bundles/de305d54-75b4-431b-adb2-eb6b9e546014/manifest.plist')
                .expect(200)
                .expect('Content-type', /xml/)
                .expect((res) => {
                    let text = res.text;

                    expect(text).to.contain('1.0.0');
                    expect(text).to.contain('com.example.MyApp');
                    expect(text).to.contain('http://example.com/MyApp-1.0.0.ipa');
                    expect(text).not.to.contain('http://http://example.com/MyApp-1.0.0.ipa');
                })
        });

        it('should respond with 404 error when requested with invalid id', () => {

            return apiRequest
                .get('/v1/bundles/de305d54-75b4-431b-adb2-eb6b9e546099/manifest.plist')
                .expect(404);
        });
    });

    describe('post', () => {
        it('should allow to create bundle', () => {

            return apiRequest
                .post('/v1/bundles')
                .send({
                    app_id: 'com.example.PostTest',
                    name: 'PostTest',
                    version: '1.0.2',
                    url: 'http://example.com/PostTest-1.0.2.ipa',
                    published: true
                })
                .expect(200)
                .expect('Content-type', /json/)
                .expect((res) => {
                    let body = res.body;

                    expect(body).to.have.property('id');
                    expect(body).to.have.property('app_id')
                        .and.equal('com.example.PostTest');
                    expect(body).to.have.property('name')
                        .and.equal('PostTest');
                    expect(body).to.have.property('version')
                        .and.equal('1.0.2');
                    expect(body).to.have.property('url')
                        .and.equal('http://example.com/PostTest-1.0.2.ipa');
                    expect(body).to.have.property('manifest_url')
                        .and.contain(`manifest.plist`);
                    expect(body).to.have.property('download_url')
                        .and.contain('itms-services://?action=download-manifest&url=')
                        .and.contain(body.manifest_url);
                    expect(body).to.have.property('published')
                        .and.equal(1);
                });
        });

        it('should set published flag to false if omitted from request body', () => {

            return apiRequest
                .post('/v1/bundles')
                .send({
                    app_id: 'com.example.PostTest',
                    name: 'PostTest',
                    version: '1.0.2',
                    url: 'http://example.com/PostTest-1.0.2.ipa'
                })
                .expect(200)
                .expect('Content-type', /json/)
                .expect((res) => {
                    let body = res.body;

                    expect(body).to.have.property('published')
                        .and.equal(0);
                });
        });

        it('should allow to override manifest_url', () => {

            return apiRequest
                .post('/v1/bundles')
                .send({
                    app_id: 'com.example.PostTest',
                    name: 'PostTest',
                    version: '1.0.2',
                    url: 'http://example.com/PostTest-1.0.2.ipa',
                    manifest_url: 'http://example.com/PostTest-1.0.2.plist'
                })
                .expect(200)
                .expect('Content-type', /json/)
                .expect((res) => {
                    let body = res.body;

                    expect(body).to.have.property('id');
                    expect(body).to.have.property('app_id')
                        .and.equal('com.example.PostTest');
                    expect(body).to.have.property('name')
                        .and.equal('PostTest');
                    expect(body).to.have.property('version')
                        .and.equal('1.0.2');
                    expect(body).to.have.property('url')
                        .and.equal('http://example.com/PostTest-1.0.2.ipa');
                    expect(body).to.have.property('manifest_url')
                        .and.equal('http://example.com/PostTest-1.0.2.plist');
                    expect(body).to.have.property('download_url')
                        .and.contain('itms-services://?action=download-manifest&url=')
                        .and.contain(body.manifest_url);
                });
        });

        it('should reject payload without app_id', () => {

            return apiRequest
                .post('/v1/bundles')
                .send({
                    name: 'PostTest',
                    version: '1.0.2',
                    url: 'http://example.com/PostTest-1.0.2.ipa'
                })
                .expect(400);
        });

        it('should reject payload without name', () => {

            return apiRequest
                .post('/v1/bundles')
                .send({
                    app_id: 'com.example.PostTest',
                    version: '1.0.2',
                    url: 'http://example.com/PostTest-1.0.2.ipa'
                })
                .expect(400);
        });

        it('should reject payload without version', () => {

            return apiRequest
                .post('/v1/bundles')
                .send({
                    app_id: 'com.example.PostTest',
                    name: 'PostTest',
                    url: 'http://example.com/PostTest-1.0.2.ipa'
                })
                .expect(400);
        });

        it('should reject payload without url', () => {

            return apiRequest
                .post('/v1/bundles')
                .send({
                    app_id: 'com.example.PostTest',
                    name: 'PostTest',
                    version: '1.0.2'
                })
                .expect(400);
        });
    });


    describe('put', () => {

        it('should allow to update bundle by id', () => {
            apiRequest
                .put('/v1/bundles/79dbdd38-1233-42f8-9d32-a1dad5871b52')
                .send({
                    published: 1
                })
                .expect(200)
                .then(() => {
                    return apiRequest
                        .get('/v1/bundles/79dbdd38-1233-42f8-9d32-a1dad5871b52')
                        .expect(res => {
                            expect(res.body).to.have.property('published')
                                .and.equal(1);
                        });
                });
        });

        it('should reject update without any data', () => {

            return apiRequest
                .put('/v1/bundles/79dbdd38-1233-42f8-9d32-a1dad5871b52')
                .send({})
                .expect(400);
        });

        it('should return 500 on database error', () => {
            bundleUpdateStub = sinon.stub(Bundle, 'update').returns(Promise.reject());

            return apiRequest
                .put('/v1/bundles/79dbdd38-1233-42f8-9d32-a1dad5871b52')
                .send({
                    published: 1
                })
                .expect(500);
        });

        it('should not update id or created_at fields', () => {
            apiRequest
                .put('/v1/bundles/79dbdd38-1233-42f8-9d32-a1dad5871b52')
                .send({
                    published: 1,
                    created_at: 100,
                    id: "foo"
                })
                .expect(200)
                .then(() => {
                    return apiRequest
                        .get('/v1/bundles/79dbdd38-1233-42f8-9d32-a1dad5871b52')
                        .expect(res => {
                            var body = res.body

                            expect(body).to.have.property('published')
                                .and.equal(1);
                            expect(body).to.have.property('id')
                                .and.equal('79dbdd38-1233-42f8-9d32-a1dad5871b52');
                            expect(body).to.have.property('created_at')
                                .and.not.equal(100);
                        });
                });
        });

    });

});
