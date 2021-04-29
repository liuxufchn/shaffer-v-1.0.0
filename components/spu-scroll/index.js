Component({
    properties: {
        theme: Object,
        spuList: Array
    },
    data: {},
    methods: {
        onImgTap(event) {
            const pid = event.currentTarget.dataset.pid;
            wx.navigateTo({
                url: '/pages/detail/detail?pid=' + pid
            })
        }
    }
});
