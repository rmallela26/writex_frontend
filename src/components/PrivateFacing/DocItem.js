const DocItem = ({name, id, extension}) => {

    const openDoc = () => {
        window.open(`https://docs.google.com/document/d/${id}/edit`, "_blank")
    }  

  return (
    
    <div className="doc" onClick={() => openDoc()}>
    <div className="pic" />
    <h4 className="docTitle">{name} {extension}</h4>
    </div>

  )
}

export default DocItem