import { useState } from "react";
import { useRef } from 'react';
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Upload = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumnail: null,
    video: null
  })
  const thumnailRef = useRef();
  const videoRef = useRef();
  const [disabled, setDisabled] = useState(false);

  const resetVal =() =>{
    setFormData({
          title:'',
          description:'',
          thumnail:null,
          video:''
        })
    thumnailRef.current.value='';
    videoRef.current.value=''
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
    setDisabled(true)
    if (success) {
      const formDatas = new FormData();
      formDatas.append('title', formData.title);
      formDatas.append('description', formData.description);
      formDatas.append('thumnail', formData.thumnail); // or .video
      formDatas.append('video',formData.video)

      try {
        const res = await fetch("http://localhost:3000/api/upload", {
          method: "POST",
          body: formDatas
        });

        const data = await res.json();
        console.log("ImageKit upload result:", data);
        resetVal();
        setDisabled(false);
        
      } catch (err) {
        resetVal();
        setDisabled(false)
        console.error("Upload error:", err);
      }
      toast.success("Successfully uploaded");
      return;
    }
    resetVal();
    setDisabled(false)
    toast.error("Failed to upload")
  }

  return (
    <div className="bg-base-200 w-full min-h-screen pt-26">
      <div className="mx-auto max-w-4xl px-4">

        <h1 className="text-4xl font-semibold mb-8 mt-5">Upload Video</h1>
        <form action="" onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
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
            <input type="file" name="thumnail" accept="image/*" ref={thumnailRef} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))} className="file-input file-input-bordered w-full" />
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Video</legend>
            <input type="file" name="video" accept="video/*" ref={videoRef} onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.files[0] }))} className="file-input file-input-bordered w-full" />
          </fieldset>

          <button className="btn btn-primary w-full md:w-1/3 mx-auto mt-4 text-lg" disabled={disabled ? true : false}>
            {
              disabled ? (
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
