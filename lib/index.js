'use strict';

const BroccoliFilter = require('broccoli-filter');
const PromisePipe = require('promise.pipe');
const Joi = require('joi');


const defaultExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
const optionsSchema = Joi.object().keys({
    annotation: Joi.string().optional(),
    extensions: Joi.array().items(Joi.string()).single().default(defaultExtensions).optional(),

    plugins: Joi.array().items(Joi.func()).single().required()
});


class ImageminFilter extends BroccoliFilter {

    constructor(inputNode, options) {

        options = Joi.attempt(options, optionsSchema);

        super(inputNode, {
            annotation: options.annotation,
            extensions: options.extensions,
            inputEncoding: null,
            outputEncoding: null
        });

        this.plugins = options.plugins;

        // broccoli-filter is bugged, and doesn't actually apply these option...
        // see https://github.com/broccolijs/broccoli-filter/issues/47
        this.inputEncoding = null;
        this.inputEncoding = null;

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
