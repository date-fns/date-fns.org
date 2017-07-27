import Either from 'data.either'

// TODO: rewrite
function EitherPropType (leftPropType, rightPropType) {
  function validate (props, propName, componentName, ...rest) {
    const prop = props[propName]

    if (!(prop && prop instanceof Either)) {
      throw new Error(props, propName, componentName, rest)
    }

    prop.fold(
      left => leftPropType({ left }, 'left', componentName, ...rest),
      right => rightPropType({ right }, 'right', componentName, ...rest)
    )
  }

  validate.isRequired = validate

  return validate
}

export { Either, EitherPropType }
export default Either
