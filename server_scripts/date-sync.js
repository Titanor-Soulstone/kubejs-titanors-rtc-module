var rtc = null
var rttc = null

function realTimeToMcTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Calculate total minutes since 6:00 AM
    const totalMinutes = ((hours * 60 + minutes) - 360 + 1440) % 1440;

    // Convert real-time minutes to MC time
    const mcTime = Math.round((totalMinutes / 1440) * 23999);

    return mcTime;
}

console.log(`The current MC time is: ${realTimeToMcTime()}`);

ServerEvents.loaded(event => {
    console.log(`The current MC time is: ${realTimeToMcTime()}`);
    Utils.server.runCommand("gamerule doDaylightCycle false")
    rtc = realTimeToMcTime()
    Utils.server.runCommand("time set " + rtc)
})

ServerEvents.tick(event => {
    rttc = realTimeToMcTime()
    if (rttc != rtc) {
        rtc = rttc
        Utils.server.runCommand("time set " + rtc)
    }
})