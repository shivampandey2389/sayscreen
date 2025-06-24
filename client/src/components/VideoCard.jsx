import { Dot, Eye, Link } from "lucide-react";

const VideoCard = ({card}) => {
  return (
    <div className='bg-base-100 rounded-2xl'>
      <div className='relative'>
        <img src={card.thumbnail} alt="thumnail" className='rounded-2xl' />
        <span className='bg-base-100 rounded-2xl absolute bottom-2 right-2 p-2 py-1'>{card.duration}<span className='text-xs'>min</span> </span>
        <button className='absolute top-3 right-3 bg-base-100 p-2 rounded-2xl'>
          <Link className='size-4' />
        </button>
      </div>

      <div className='p-2'>
        <div className=' flex items-center justify-between'>
          <div className='flex gap-2 items-center'>
            <div>
              <img src={card.accImg} alt="alex" width="40px" className='rounded-3xl' />
            </div>
            <div className='flex flex-col '>
              <span>{card.accName}</span>
              <span className='mt-[-5px] text-xs flex items-center'>
                <Dot className="size-4" />
                {card.time}mon
              </span>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <Eye className='size-4' />
            <span className='text-xs'>12</span>
          </div>
        </div>
        <div className='flex items-end gap-1 mt-2'>
          <h1 className='text-xl'>{card.title} - </h1>
          <span className='text-xl'>{card.date}</span>
        </div>
      </div>
    </div>
  )
}

export default VideoCard;