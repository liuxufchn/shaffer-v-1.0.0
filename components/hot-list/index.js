Component({
    properties: {
        banner: Object
    },
    observers: {
        'banner': function (banner) {
            if (!banner) {
                return;
            }
            if (banner.items.length === 0) {
                return;
            }

            const left = banner.items.find(item => item.name === 'left');
            const rightTop = banner.items.find(item => item.name === 'right-top');
            const rightBottom = banner.items.find(item => item.name === 'right-bottom');

            this.setData({
                left,
                rightTop,
                rightBottom
            })

        }
    },
    data: {},
    methods: {}
});
