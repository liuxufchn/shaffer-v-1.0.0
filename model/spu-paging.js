/**
 * @author Shaffer
 * @date 2021-04-29 03:19
 */
import {Http} from "../utils/http";
import {Paging} from "../utils/paging";

class SpuPaging {
    static getLatestPaging() {
        return new Paging({
            url: `spu/latest`
        }, 5)
    }
}

export {
    SpuPaging
}