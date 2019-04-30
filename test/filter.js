'use strict';

const Fs = require('fs');

const Broccoli = require('broccoli');
const Code = require('@hapi/code');
const ImageminJpegTran = require('imagemin-jpegtran');
const ImageminFilter = require('..');
const Lab = require('@hapi/lab');


const FIXTURE_DIR = `${__dirname}/fixtures`;


const lab = exports.lab = Lab.script();
const { afterEach, before, describe, it } = lab;
const { expect } = Code;


describe('ImageminFilter', () => {

    describe('processing', () => {

        const fixtures = {};
        let builder;

        const makeBuild = (options) => {

            builder = new Broccoli.Builder(new ImageminFilter(FIXTURE_DIR, options));

            return builder.build().then(() => {

                const outStats = {};
                Fs.readdirSync(builder.outputPath).forEach((e) => {

                    outStats[e] = Fs.statSync(`${builder.outputPath}/${e}`);
                });

                return outStats;
            });
        };

        before(() => {

            Fs.readdirSync(FIXTURE_DIR).forEach((e) => {

                fixtures[e] = Fs.statSync(`${FIXTURE_DIR}/${e}`);
            });
        });

        afterEach(() => {

            const b = builder;
            builder = null;
            if (b) {
                b.cleanup();
            }
        });

        it('produces smaller files', () => {

            return makeBuild({
                plugins: ImageminJpegTran()
            }).then((stats) => {

                expect(stats['test.jpg'].size).to.be.lessThan(fixtures['test.jpg'].size);
            });
        });

        it('supports custom extensions', () => {

            let called = 0;

            const plugin = (buffer) => {

                ++called;
                return Promise.resolve(buffer);
            };

            return makeBuild({
                plugins: plugin,
                extensions: 'jpg'
            }).then(() => {

                expect(called).to.equal(1);
            });
        });
    });
});
