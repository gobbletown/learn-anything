// Card that can also be a link.
export const Card = (props) => {
  return (
    <a
      href={props.link}
      className={"m-4 p-6"}
      style={{
        border: "1px solid #eaeaea",
        borderRadius: "1px solid #eaeaea",
      }}
    >
      {/* TODO: font-black gets overriden */}
      <h2 className={"text-center font-black"}>{props.title}</h2>
      <p className={"font-thin"}>{props.description}</p>
    </a>
  )
}
