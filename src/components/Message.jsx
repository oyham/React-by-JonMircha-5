const Message = ({msg, bgColor}) => {
    let styles = {
        padding: "1rem",
        marginBottom: "1rem",
        textalign: "center",
        color: "#fff",
        fontWeight: "bold",
        backgroundColor: bgColor
    }
    return (
        <div style={styles}>
            {/* <p>{msg}</p> */}
            <p dangerouslySetInnerHTML={{__html:msg}}/>
        </div>
    )
}

export default Message