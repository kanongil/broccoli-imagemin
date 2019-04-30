'use strict';

const BroccoliFilter = require('broccoli-filter');
const PromisePipe = require('promise.pipe');
const Joi = require('@hapi/joi');


const internals = {};


internals.defaultExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];


internals.schema = Joi.object().keys({
    annotation: Joi.string().optional(),
    extensions: Joi.array().items(Joi.string()).single().default(internals.defaultExtensions).optional(),

    plugins: Joi.array().items(Joi.func()).single().required()
});


class ImageminFilter extends BroccoliFilter {

    constructor(inputNode, options) {

        options = Joi.attempt(options, internals.schema);

        super(inputNode, {
            annotation: options.annotation,
            extensions: options.extensions,
            inputEncoding: null,
            outputEncoding: null
        });

        this.plugins = options.plugins;

        return this;
    }

    processString(input, relativePath) {

        // Use the plugins directly, instead of through imagemin

        return PromisePipe(this.plugins)(input).then((buf) => {

            return buf.length < input.length ? buf : input;      // Only return new buffer if it is actually smaller
        });
    }
}


module.exports = ImageminFilter;
