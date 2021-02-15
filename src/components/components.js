export const ConfirmCont = props => {
  const handleCancel = () => {
    props.setShowConfirm(false);
  }

  const handleSubmit = () => {
    props.setShowConfirm(false);
    props.doSubmit();
  }

  if(!props.showConfirm) {
    return null;
  }else {
    return(
      <div className="outerWrapper">
        <div className="confirmCont">
          <span>{props.msg}</span>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
}

export const ErrMsg = props => {
  return(
  <span className="inputMsgText">{props.message}</span>
  )
}