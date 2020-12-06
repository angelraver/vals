const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
]
const weekday = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const dateP = (fecha) => {
  const fechap = fecha.split('/')
  return {
    day: fechap[0],
    month: fechap[1],
    year: fechap[2]
  }
}

export default {
  getDayNombre (date) {
    var d = dateP(date)
    var dateFormated = new Date(d.year + '-' + d.month + '-' + d.day + 'T10:00:00Z')
    return weekday[dateFormated.getDay()]
  },
  getMesNombre (date) {
    return months[Math.abs(dateP(date).month)]
  },
  getDay (date) {
    return Math.abs(dateP(date).day)
  },
  getYear (date) {
    return dateP(date).year
  }
}
