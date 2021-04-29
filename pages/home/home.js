// pages/home/home.js

import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";
import {SpuPaging} from "../../model/spu-paging";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        themeF: null,
        themeH: null,
        bannerB: null,
        bannerG: null,
        grid: [],
        activity: null,
        themeESpu: [],
        spuPaging: null,
        loadingType: 'loading'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.initHomeAppData();
        await this.initBottomSpuList();
    },

    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging();
        this.data.spuPaging = paging;
        const data = await paging.getMoreData();
        wx.lin.renderWaterFlow(data.items);
    },

    async initHomeAppData() {
        // const themeA = await Theme.getHomeLocationA();
        const theme = new Theme();
        await theme.getThemes();

        const themeA = theme.getHomeLocationA();
        const themeE = theme.getHomeLocationE();
        const themeH = theme.getHomeLocationH();

        // 若themeE显示，则发送请求，获取themeE包含的spu信息
        let themeESpu = [];
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu();
            if (data) {
                themeESpu = data.spu_list.slice(0, 8);
            }
        }

        const themeF = theme.getHomeLocationF();

        const bannerB = await Banner.getHomeLocationB();
        const bannerG = await Banner.getHomeLocationG();

        const grid = await Category.getHomeLocationC();
        const activity = await Activity.getHomeLocationD();
        this.setData({
            themeA,
            themeE,
            themeF,
            themeH,
            bannerB,
            bannerG,
            grid,
            activity,
            themeESpu
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData();
        if (!data) {
            return;
        }
        wx.lin.renderWaterFlow(data.items);
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})