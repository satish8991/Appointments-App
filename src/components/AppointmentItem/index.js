import './index.css'

const AppointmentItem = props => {
  const {details, updateIsFavouirte} = props
  const {id, title, upDate, isFavoutite} = details
  const imageUrl = isFavoutite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const favoutiteButton = () => {
    updateIsFavouirte(id)
  }
  return (
    <li className="item-conotainer">
      <div className="designation">
        <p className="design">{title}</p>
        <button
          className="favourite-button"
          type="button"
          data-testid="star"
          onClick={favoutiteButton}
        >
          <img src={imageUrl} className="star" alt="star" />
        </button>
      </div>
      <p className="date">Date: {upDate}</p>
    </li>
  )
}

export default AppointmentItem
