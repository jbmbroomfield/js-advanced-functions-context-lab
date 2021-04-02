function createEmployeeRecord(input) {
    return {
        firstName: input[0],
        familyName: input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(inputs) {
    return inputs.map(input => createEmployeeRecord(input))
}

function createEvent(type,dateStamp) {
    const dateStampArray = dateStamp.split(' ')
    this.push({
        type: type,
        hour: parseInt(dateStampArray[1]),
        date: dateStampArray[0],
    })
    return this
}

function createTimeInEvent(dateStamp) {
    this.timeInEvents = createEvent.call(this.timeInEvents,'TimeIn',dateStamp)
    return this
}

function createTimeOutEvent(dateStamp) {
    this.timeOutEvents = createEvent.call(this.timeOutEvents,'TimeOut',dateStamp)
    return this
}

function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date).hour
    const timeOut = this.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this,date) * this.payPerHour
}

function findEmployeeByFirstName(srcArray,firstName) {
    return srcArray.find(record => record.firstName === firstName)
}

function calculatePayroll(srcArray) {
    return srcArray.reduce((a,b) => a + allWagesFor.call(b),0)
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}