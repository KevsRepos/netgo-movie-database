import React from 'react';

const Overlay = props => {
  return(
    <form className="movieCont" onSubmit={e => props.onSave(e)}>
      <span>Filmtitel:</span>
      <input placeholder="z.B. Fight Club..." className="title datas" value={props.values.name} onChange={e => props.setValues({...props.values, name: e.target.value})} required />
      <MetaDataInputs data={props} setMetaData={e => props.setValues({...props.values, metaData: e})} />
      <DescriptionInput description={props.values.description} setDescription={e => props.setValues({...props.values, description: e.target.value})} />
      <div className="editBtns">
        <button className="btn" type="submit">Speichern</button>
      </div>
    </form>
  )
}

export default Overlay;

const MetaDataInputs = props => {
  return(
    <>
    <div className="headline">Filmdaten:</div>
    <div className="flexedMetaCont">
      <label>
        <span>Release:</span>
        <input required className="dataInputs" type="date" onChange={e => props.data.setValues({... props.data.values, releaseDate: e.target.value})} value={props.data.values.releaseDate} min="01-01-1900" max={new Date().toISOString().slice(0, 10)} />    
      </label>
      <label>
        <span>Genre:</span>
        <input required className="dataInputs" placeholder="z.B. Liebe <3" type="text" value={props.data.values.category} onChange={e => props.data.setValues({...props.data.values, category: e.target.value})} />
      </label>
      <label>
        <span>Länge (Minuten):</span>
        <input required className="dataInputs" placeholder="Maximal 12 Stunden..." type="number" min="10" max="720" value={props.data.values.movieLength} onChange={e => props.data.setValues({...props.data.values, movieLength: e.target.value})}  />
      </label>
    </div>
    </>
  )
}

const DescriptionInput = props => {
  const placeholder = "z.B. Interstellar ist ein US-amerikanisch-britischer Science-Fiction-Film unter der Regie von Christopher Nolan aus dem Jahr 2014. Der Film spielt in einer dystopischen Zukunft, in der die Menschheit die Erde verlassen muss und ein neues Zuhause auf einem anderen Planeten sucht.";
  return(
    <label>
      <div className="description">Beschreibung: (Max. 1000 Zeichen)</div>
      <textarea required className="descriptionCont" placeholder={placeholder} onChange={e => props.setDescription(e)} value={props.description} maxLength="1000" />
    </label>
  )
}