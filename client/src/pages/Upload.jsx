import { useState } from "react";
import { useRef } from 'react';
import { ArrowUpFromLine, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useUpload } from "../store/useUploadStore";

const Upload = () => {
  const {isDisabled,uploadup} = useUpload();
  const [imgUpload , setImgUpload] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumnail: null,
    video: null
  })
  const thumnailRef = useRef();
  const videoRef = useRef();
  const resetVal =() =>{
    setFormData({
          title:'',
          description:'',
          thumnail:null,
          video:null
        })
    thumnailRef.current.value='';
    videoRef.current.value='';
  }

  const validate = (formData) => {
    if (!formData.title || !formData.description || !formData.thumnail || !formData.video) {
      toast.error("Fill every credentials");
      return false;
    }
    const thumnailExt = formData.thumnail.name.split('.').pop().toLowerCase();
    const videoExt = formData.video.name.split('.').pop().toLowerCase();
    const validateImgExt = ['png', 'jpg', 'jpeg', 'webp'];
    const validateVidExt = ['mp4', 'mov', 'avi', 'webm'];

    if (!validateImgExt.includes(thumnailExt) || !validateVidExt.includes(videoExt)) {
      toast.error('provide proper file')
      return false;
    }

    return true;

  }
  
  const handleSubmit = async (e) => {
  e.preventDefault();
  const success = validate(formData);
  if(!success) return;
  if (success) {
      const formDatas = new FormData();
      formDatas.append('title', formData.title);
      formDatas.append('description', formData.description);
      formDatas.append('thumnail', formData.thumnail); // or .video
      formDatas.append('video',formData.video);
      try {
        await uploadup(formDatas);
        resetVal();
      } catch (error) {
        toast.error(error);
      }
  }
}

  return (
    <div className="bg-base-200 w-full min-h-screen pt-26">
      <div className="mx-auto max-w-4xl px-4">

        <h1 className="text-4xl font-semibold mb-8 mt-5">Upload Video</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Title</legend>
            <input
              type="text"
              name='title'
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              className="input input-bordered w-full py-3 px-4 text-base"
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Description</legend>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
              className="textarea textarea-bordered w-full py-3 px-4 text-base"
              placeholder="Description"
              rows={5}
            ></textarea>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Thumbnail</legend>
            <input type="file" name="thumnail" accept="image/*" ref={thumnailRef} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))} hidden className="file-input file-input-bordered w-full" />
            {imgUpload ?(
              <figure onClick={()=>thumnailRef.current?.click()} className="bg-[#1b1816] w-full h-60 rounded-2xl flex items-center justify-center flex-col border-[#3f3c3b] border-1">
                <ArrowUpFromLine className='h-5 w-5' />
                <p>Click to upload thumbnail</p>
              </figure>
            ) :(
              <div>
                <img src={imgUpload} alt="" width={24} height={24} />
              </div>
)            }
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Video</legend>
            <input type="file" name="video" accept="video/*" ref={videoRef} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))} className="file-input file-input-bordered w-full" />
          </fieldset>

          <button className="btn btn-primary w-full md:w-1/3 mx-auto mt-4 text-lg" disabled={isDisabled ? true : false}>
            {
              isDisabled ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Uploading....
                </>
              ) :
                (
                  "Upload"
                )
            }
          </button>

        </form>
      </div>
    </div>
  );
};

export default Upload;
