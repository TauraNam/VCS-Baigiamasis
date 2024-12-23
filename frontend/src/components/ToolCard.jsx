import { Link } from 'react-router-dom';

function ToolCard({ item }) {

  const detailsToShow = [
    'trademark',
    'model',
    'power',
    'max_power',
    'fuel_type',
    'fuel_consumption',
    'rotations_per_minute',
    'impacts_per_minute',
    'impact_energy',
    'idle_speed',
    'weight',
    'max_rotations_per_minute',
    'chainsaw_type',
    'container_size'
  ]

  const formatText = (input) => {
    return input
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const cardDetails = () => {
    let details = []
    let count = 1

    detailsToShow.map((detail) => {
      Object.entries(item.description.details).map(([key, value]) => {
        if (detail === key.trim() && count <= 5) {
          details.push([formatText(key), value])
          count++
        }
      })
    })

    return details
  }

  return (
    <div className='m-1'>
      <Link to={`/tools/${item._id}`}>
        <div className="flex flex-col justify-between border border-gray-300 bg-white rounded-[10px] hover:shadow-lg transition-shadow w-[300px] sm:w-[225px] md:w-[300px] h-[100%] pb-5">
          <div className='flex items-center justify-center rounded-[10px] w-[298px] sm:w-[223px] md:w-[298px] py-4 h-[298px] sm:h-[223px] md:h-[298px] bg-white'>
            <img src={item.images[0]} alt={item.name} className="rounded-t-[10px]" />
          </div>
          <p className="font-semibold text-[12px] sm:text-[14px] md:text-[17px] mt-[10px] tracking-[1px] text-center px-[6px]">{item.name}</p>
          <div className="text-[10px] sm:text-[12px] mb-[10px] text-center">
            <div className="flex flex-wrap justify-center my-2 text-gray-500 gap-3">
              {
                cardDetails().map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}</strong>: {value}
                  </p>
                ))
              }
            </div>
          </div>
          <div className='flex flex-col'>
            <p className="tool-grid-item-price text-red-500 text-center text-[13px] sm:text-[16px]">{item.price} € / day</p>
            <p className="tool-grid-item-price text-center text-[10px] sm:text-[12px] mt-2">
              Deposit: <span>{item.price * 4} € </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ToolCard;