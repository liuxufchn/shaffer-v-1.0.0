Component({
    properties: {
        data: Object
    },

    data: {
        tags: Array
    },
    observers: {
        data: function (data) {
            if (!data) {
                return;
            }
            if (!data.tags) {
                return;
            }
            const tags = data.tags.split('$');
            this.setData({
                tags
            });
        }
    },
    methods: {
        onImgTap(event) {
            const pid = event.currentTarget.dataset.pid;
            wx.navigateTo({
                url: '/pages/detail/detail?pid=' + pid
            })
        }
    }
});
