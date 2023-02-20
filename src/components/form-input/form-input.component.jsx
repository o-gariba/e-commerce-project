import './form-input.styles.scss'

export const FormInput = ({ label, ...otherProps }) => {
  return (
    <div
      className="group"
    >
      <input
        {...otherProps}
        className={'form-input'}
      />
      {
        label &&
        <label
          className={`${otherProps.value.length > 0 ? 'shrink' : ''} form-input-label`}
        >{label}</label>
      }
    </div>
  )
}