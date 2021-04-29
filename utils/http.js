/**
 * @author Shaffer
 * @date 2021-04-26 19:32
 */
import {config} from "../pages/config/config";
import {promisic} from "./util";

class Http {
    static async request({
                             url,
                             data,
                             method = 'GET'
                         }) {
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            }
        });
        return res.data;
    }
}

export {
    Http
}

