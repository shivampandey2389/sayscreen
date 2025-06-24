import { ArrowUpFromLine, ListFilter, Search } from 'lucide-react'

import VideoCard from '../components/VideoCard.jsx'
import { videoCardData } from '../constant/video.js'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate();
  const handleUpload = () => {
    navigate('/upload')
  }
  return (
    <div className='min-h-full bg-base-200 w-full'>
      <div className="flex flex-col pt-30 mx-auto max-w-7xl px-5">
        <div className='flex items-center justify-between flex-wrap max-sm:gap-3'>
          <label className="input rounded-3xl">
            <Search className='h-6 w-6' />
            <input type="search" className="grow" placeholder="Search" />
          </label>
          <div className='flex items-center  gap-2 md:justify-end'>
            <button className="btn bg-base-100 btn-md rounded-3xl" onClick={handleUpload}>
              <ArrowUpFromLine className='h-5 w-5' />
              Upload
            </button>

            <button className="btn bg-base-100 btn-md rounded-3xl" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }}>
              <ListFilter className='h-5 w-5'/>
              Filter
            </button>

            <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
              popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }}>
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div>
        </div>

        <div className='flex flex-wrap  mt-5 gap-5 grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1'>
          {
            videoCardData.map((card) => (
              <VideoCard key={card.id} card={card} />
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default Homepage