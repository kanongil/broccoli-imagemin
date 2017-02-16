# broccoli--imagemin

Broccoli filter for compressing images with [imagemin](https://github.com/imagemin/imagemin), using v5 configuration syntax.

## Installation

```sh
npm install broccoli--imagemin
```

## Usage

```js
/* Brocfile.js */

const BroccoliImagemin = require('broccoli--imagemin');

module.exports = new BroccoliImagemin('images', {
    plugins: [
        require('imagemin-mozjpeg')(),
        require('imagemin-pngquant')({ quality: '65-80' })
    ]
});
```

## Options

The options object support the following:

 * `plugins` - Array of Imagemin plugins, passed on to `imagemin` (required).
 * `extensions` - Array of file extensions to process. Default: `['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']`.
 * `annotation` - String with optional broccoli annotation. Default: `undefined`.

## License

Copyright (c) 2017, Gil Pedersen <gpdev@gpost.dk>
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
