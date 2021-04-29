/**
 * @author Shaffer
 * @date 2021-04-27 20:38
 */
import {Http} from "../utils/http";

class Banner {
    static locationB = 'b-1';
    static locationG = 'b-2';

    /**
     * 获取首页轮播图
     */
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }

    static async getHomeLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.locationG}`
        })
    }
}

export {
    Banner
}