/**
 * @author Shaffer
 * @date 2021-04-27 21:46
 */
import {Http} from "../utils/http";

class Category {
    static async getHomeLocationC() {
        return await Http.request({
            url: 'category/grid/all'
        })
    }
}

export {
    Category
}