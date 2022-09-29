const WebSocket = require('ws')
const PubSub = require('pubsub-js')

module.exports = function ({ chargerTests, constants, v, func }) {
    const c = constants.get()

    connectAsUserSocket = function (userID, transactionID, callback) {
        try {
            console.log('\n========= USER CLIENT MOCK CONNECTING... ==========\n')
            const ws = new WebSocket("ws://localhost:1337/user/" + userID)  
    
            ws.on('open', function open() {
                v.addUserIDWIthTransactionID(userID, transactionID)
                callback(ws)
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    exports.testMeterValues = function () {
        console.log('\n========= TESTING METER VALUES REQUEST... ==========\n')
        connectAsUserSocket(c.USER_ID, c.TRANSACTION_ID, function(userSocket){
            userSocket.on('message', function(message) {
                const data = JSON.parse(message)
                if(data[2] == c.METER_VALUES)
                console.log("USER1 RECEIVED METER VALUES, WELL DONE!!!")
            })
            connectAsUserSocket(c.USER_ID+1, c.TRANSACTION_ID+1, function(userSocket1){
                userSocket1.on('message', function(message) {
                    const data = JSON.parse(message)
                    if(data[2] == c.METER_VALUES)
                    console.log("USER2 RECEIVED METER VALUES, WELL DONE!!!")
                })
                connectAsUserSocket(c.USER_ID+2, c.TRANSACTION_ID+2, function(userSocket2){
                    userSocket2.on('message', function(message) {
                        const data = JSON.parse(message)
                        if(data[2] == c.METER_VALUES)
                        console.log("USER3 RECEIVED METER VALUES, WELL DONE!!!")
                    })
                    chargerTests.connectAsChargerSocket(c.CHARGER_ID, function(chargerSocket){
                        meterValues = func.buildJSONMessage([ 
                            2, 
                            "100001RemoteStartTransaction1664455481548",
                            "MeterValues",
                            {
                                "connectorId": 1,
                                "transactionId": 1,
                                "timestamp": 1234512345124123,
                                "values": {
                                    "chargingPercent": {
                                        "value": 0,
                                        "unit": "%",
                                        "measurand": "SoC"
                                    },
                                    "chargingPower": {
                                        "value": 0,
                                        "unit": "W",
                                        "measurand": "Power.Active.Import"
                                    },
                                    "chargedSoFar": {
                                        "value": 0,
                                        "unit": "Wh",
                                        "measurand": "Energy.Active.Import.Interval"
                                    }
                                }
                            }
                        ])
                        chargerSocket.send(meterValues)
                    })
                })
            })
        })
    }

    exports.testSubscription = function () {
        const token = v.getLiveMetricsToken(USER_ID)
        console.log(PubSub.countSubscriptions(token))
        if(PubSub.countSubscriptions(token) == 0){
            throw "Something went wrong when subscribing"
        }
    }

    return exports
}