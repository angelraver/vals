export default {
  turnoDetails (turno) {
    return `<strong>${turno.firstName} ${turno.lastName}</strong>
    <br />${turno.titulo}
    <br /><strong>${turno.fecha} a las ${turno.hora}</strong>`
  }
}
