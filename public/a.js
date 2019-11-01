const goEasyUtils = {
    init: function() {
        var goEasy = new GoEasy({
            appkey: 'BC-2337a15456b8479ca911ae40fcc6970d',
        })

        return goEasy
    },

    getMessage: function() {
        let go = this.init()
        go.subscribe({
            channel: 'qqq',
            onMessage: function(message) {
                console.log('Channel:' + message.channel + ' content:' + message.content, 666)
            },
        })
    },
}
