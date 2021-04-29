/**
 * @author Shaffer
 * @date 2021-04-29 03:52
 */
import {Http} from "./http";

class Paging {

    count;
    start;
    url;
    req; // req中包含完整的请求对象，url, data, method
    lock = false;  // 初始为未上锁状态
    accumulate = [];
    moreData = true;

    constructor(req, count = 10, start = 0) {
        this.req = req;
        this.url = req.url;
        this.start = start;
        this.count = count;
    }

    async getMoreData() {
        // 发送请求，获取分页数据
        // 参数为url?start=0&count=10
        // 结果封装： 1. 是否为空 2. 是否含有更多数据 3. 返回结果应该累加 {empty: boolean, items: [], moreData: boolean, accumulate: []}
        // 防止连续发送数据，应该上锁
        if (!this.moreData) {
            return;
        }
        if (!this._getLocker()) {
            return;
        }
        const data = await this._actualGetData();
        this._releaseLocker();
        return data;
    }

    _getCurrentReq() {
        let url = this.url;
        const params = `start=${this.start}&count=${this.count}`;
        if (url.includes('?')) {
            url += '&' + params;
        } else {
            url += '?' + params;
        }
        this.req.url = url;
        return this.req;
    }

    async _actualGetData() {
        // 拼接 url
        const req = this._getCurrentReq();
        let paging = await Http.request(req);
        if (!paging) {
            return null;
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulate: []
            }
        }

        // 确定是否有更多的数据
        this.moreData = Paging.hasMoreData(paging.page, paging.total_page);
        if (this.moreData) {
            this.start += this.count;
        }
        // 累加数据
        this._accumulate(paging.items);
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulate: this.accumulate
        }

    }

    static hasMoreData(currentPage, totalPage) {
        return currentPage < totalPage - 1;
    }

    _accumulate(items) {
        this.accumulate = this.accumulate.concat(items);
    }

    _getLocker() {
        if (this.lock) {
            return false;
        }
        this.lock = true;
        return true;
    }

    _releaseLocker() {
        this.lock = false;
    }

}

export {
    Paging
}