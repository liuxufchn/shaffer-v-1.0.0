/**
 * @author Shaffer
 * @date 2021-04-27 23:30
 */
import {Http} from "../utils/http";

class Activity {
    static locationD = 'a-2'

    static async getHomeLocationD() {
        return await Http.request({
            url: `activity/name/${Activity.locationD}`
        })
    }
}

export {
    Activity
}