/**
 * Created by xiajing on 2016/10/14.
 */
module.exports = {
    base64: {
        src: 'css/*.css',
        dist: 'css',
        options: {
            baseDir: build,
            extensions: ['png'],
            maxImageSize: 20 * 1024, // bytes
            debug: false
        }
    }
}