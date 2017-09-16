import RatingItem from
const range = (min, max) =>
  Array(max - min + 1).fill().map((_, i) => min + i)

const Rating = ({ min, max, onChange, value }) => {
  return (
    <div className='rating'>
      {
        range(min, max).map(item => (
          <RatingItem
            colored={value >= item}
            checked={value === item}
            value={item}
            onChange={onChange}
          />
        ))
      }
    </div>
  )
}

export default Rating;
