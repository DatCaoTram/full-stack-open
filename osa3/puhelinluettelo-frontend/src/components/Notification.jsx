const Notification = ({ msg }) => {
    const notificationBackground = {
        color: msg.state ? "green" : "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginTop: 0,
        marginBottom: 0
    }
    if (msg.state === null) {
      return null
    }
    return (
      <div style={notificationBackground}>
        {msg.text}
      </div>
    )
}

export default Notification