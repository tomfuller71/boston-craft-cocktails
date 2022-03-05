class DateConverter {

  static displayDate(timeStamp) {

    if (this.isToday(timeStamp)) {
      const hour = timeStamp.getHours()
      const minute = timeStamp.getMinutes()

      return `Today ${hour}:${minute}`
    }
    else {
      const year = timeStamp.getFullYear()
      const month = this.months[timeStamp.getMonth()]
      const day = timeStamp.getDate()

      if (!this.isSameYear(timeStamp)) {
        return `${month}-${year.toString().slice(2, 4)}`
      }
      else {
        return `${day} ${month}`
      }
    }
  }

  static isToday(date) {
    const dateString = date.toISOString().slice(0, 10)
    const nowString = new Date().toISOString().slice(0, 10)

    return dateString === nowString
  }
  
  static isSameYear(date) {
    const dateYear = date.getUTCFullYear()
    const nowYear = new Date().getUTCFullYear()

    return dateYear === nowYear
  }

  static months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
}

export default DateConverter