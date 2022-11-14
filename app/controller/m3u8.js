const ffmpeg = require("fluent-ffmpeg");
const log = require('single-line-log').stdout;
const fs = require("fs");
const { resolve } = require("path");
const path = require("path");

/**
 * A class to convert M3U8 to MP4
 * @class
 */
class m3u8ToMp4Converter {
    /**
     * Sets the input file
     * @param {String} filename M3U8 file path. You can use remote URL
     * @returns {Function}
     */
    setInputFile(filename) {
        if (!filename) throw new Error("您必须指定M3U8文件地址");
        this.M3U8_FILE = filename;

        return this;
    }

    /**
     * Sets the output file
     * @param {String} filename Output file path. Has to be local :)
     * @returns {Function}
     */
    setOutputFile(filename) {
        if (!filename) throw new Error("您必须指定文件路径和名称");
        this.OUTPUT_FILE = filename;

        return this;
    }

    /**
     * Starts the process
     */
    start() {
        return new Promise((resolve, reject) => {
            if (!this.M3U8_FILE || !this.OUTPUT_FILE) {
                reject(new Error("您必须指定输入和输出文件"));
                return;
            }

            console.log('=========================');

            ffmpeg(this.M3U8_FILE)
                .on("error", error => {
                    reject(new Error(error));
                })
                .on('progress', function (progress) {
                    log('下载进度: 已完成 ' + (progress.percent).toFixed(2) + '%。');
                })
                .on("end", () => {
                    log('下载进度: 已完成 100%。\n');
                    console.log('=========================');
                    resolve();
                })
                .outputOptions("-c copy")
                .outputOptions("-bsf:a aac_adtstoasc")
                .output(this.OUTPUT_FILE)
                .run();
        });
    }
}

const converter = new m3u8ToMp4Converter();


// 不能将其作为一个async函数，否则请求只能在下载完成时结束
function downloadMedia(opt) {
    // 测试视频，如果链接失效的话就自己找一个
    let url = opt.url || "https://www.hkg.haokan333.com/201903/07/qM3F7ntN/800kb/hls/index.m3u8";
    let output = opt.output || 'video';
    let filename = opt.filename + '.mp4' || 'video.mp4';

    if (!fs.existsSync(output)) {
        fs.mkdirSync(output, {
            recursive: true,
        });
    }

    (async function () {
        try {
            console.log("准备下载...");

            await converter
                .setInputFile(url)
                .setOutputFile(path.join(output, filename))
                .start();

            console.log("下载完成!");

            if (typeof callback === 'function') callback();
        } catch (error) {
            throw new Error("哎呀，出错啦! 检查一下参数传对了没喔。", error);
        }
    })();
}

module.exports = { downloadMedia };