export const EndpointTitle = ({ title }) => {
  if (!title) {
    return <i>Untitled</i>
  }

  return <span>{title}</span>
}
