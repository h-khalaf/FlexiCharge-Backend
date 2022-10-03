const connectedChargerSockets = {}
const connectedUserSockets = {}
const chargerSerials = []

//Stored under transactionID index
const userIDs = []

const liveMetricsTokens = {}
const chargerIDs = {}
const callbacks = {}
const transactionIDs = {}

module.exports = function ({ }) {
    
    // CONNECTED CHARGER SOCKETS
    // Get charger socket with charger IDs
    exports.getConnectedChargerSocket = function (id) {
        return connectedChargerSockets[id]
    }
    exports.addConnectedChargerSockets = function (id, socket) {
        connectedChargerSockets[id] = socket
    }
    exports.removeConnectedChargerSockets = function (id) {
        delete connectedChargerSockets[id]
    }
    exports.getLengthConnectedChargerSockets = function () {
        return Object.keys(connectedChargerSockets).length
    }

    
    // CHARGER SERIALS
    // Array with all the serial numbers
    exports.getChargerSerials = function () {
        return chargerSerials
    }
    exports.addChargerSerials = function (serial) {
        chargerSerials.push(serial)
    }
    exports.removeChargerSerials = function (serial) {
        var chargerSerialsIndex = chargerSerials.indexOf(serial)
        chargerSerials.splice(chargerSerialsIndex)
    }
    exports.getLengthChargerSerials = function () {
        return chargerSerials.length
    }
    exports.isInChargerSerials = function (serial) {
        return chargerSerials.includes(serial)
    }


    // CHARGER IDS
    // get charger ID with serial number
    exports.getChargerID = function (serial) {
        return chargerIDs[serial]
    }
    exports.addChargerIDs = function (serial, id) {
        chargerIDs[serial] = id
    }
    exports.removeChargerIDs = function (serial) {
        delete chargerIDs[serial]
    }
    exports.getLengthChargerIDs = function () {
        return Object.keys(chargerIDs).length
    }

    // CONNECTED USER SOCKETS
    // Get user socket with userIDs 
    exports.getConnectedUserSocket = function (userID) {
        return connectedUserSockets[userID]
    }
    exports.addConnectedUserSocket = function (userID, socket) {
        connectedUserSockets[userID] = socket
    }
    exports.removeConnectedUserSocket = function (userID) {
        delete connectedUserSockets[userID]
    }
    exports.getLengthConnectedUserSockets = function () {
        return Object.keys(connectedUserSockets).length
    }

    //USER IDS 
    //Array with all the user ids under transactionIDs index
    exports.addUserIDWIthTransactionID = function(userID, transactionID){
        // for(const transactionIDIndex of transactionIDArray){
        //     userIDs[transactionIDIndex] = userID
        // }
        userIDs[transactionID] = userID
    }
    exports.getUserIDWithTransactionID = function(transactionID){
        return userIDs[transactionID]
    }
    exports.removeUserID = function(userID){
        for(i = 0; i < userIDs.length; i += 1){
            if(userIDs[i] == userID){
                delete userIDs[i]
            }
        }
    }
    exports.isInUserIDs = function (userID) {
        return userIDs.includes(userID)
    }
    exports.getUserIDsLength = function(){
        return Object.keys(userIDs).length
    }

    //LIVE METRICS TOKENS
    //Array with all the PubSub tokens for all subscribers, stored under userID
    exports.getLiveMetricsToken = function(userID){
        return liveMetricsTokens[userID]
    }
    exports.addLiveMetricsToken = function(userID, token) {
        liveMetricsTokens[userID] = token

        // liveMetricsToken = {
        //     "tjijgioerjgiore-gjruijgeruigh": token // only supports one token per userID
        // }
    }
    exports.removeLiveMetricsToken = function(userID){
        delete liveMetricsTokens[userID]
    }
    exports.getLiveMetricsTokensLength = function(){
        return Object.keys(liveMetricsTokens).length
    }


    //USER IDS 
    //Array with all the user ids
    // exports.getUserIDs = function () {
    //     return userIDs
    // }
    // exports.addUserID = function (userID) {
    //     userIDs.push(userID)
    // }
    // exports.removeUserID = function (userID) {
    //     const userIDIndex = userIDs.indexOf(userID)
    //     userIDs.splice(userIDIndex)
    // }

    //CALLBACKS
    //get callback with some type of id
    exports.getCallback = function (id) {
        return callbacks[id]
    }
    exports.addCallback = function (id, callback) {
        callbacks[id] = callback
    }
    exports.removeCallback = function (id) {
        delete callbacks[id]
    }
    

    //TRANSACTIONIDS
    //get transactionID with chargerID
    exports.getTransactionID = function (chargerID) {
        return transactionIDs[chargerID]
    }
    exports.addTransactionID = function (chargerID, transactionID) {
        transactionIDs[chargerID] = transactionID
    }
    exports.removeTransactionID = function (chargerID) {
        delete transactionIDs[chargerID]
    }

    return exports
}