import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";
import { useState } from "react";
import { useRef } from 'react';
import { Loader2 } from "lucide-react";

const Upload = () => {
  const fileInputRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [disabled,setDisabled] = useState(false);

  const authenticator = async () => {
    try {
      const response = await fetch("http://localhost:3000/upload-video");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            setDisabled(false);
            return;
        }

        const file = fileInput.files[0];
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;
        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, 
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                abortSignal: AbortController.signal,
            });
            console.log("Upload response:", uploadResponse);
        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }
        setDisabled(false);
    };

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
              className="input input-bordered w-full py-3 px-4 text-base"
              placeholder="Type here"
            />
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Description</legend>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full py-3 px-4 text-base"
              placeholder="Description"
              rows={5}
            ></textarea>
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Thumbnail</legend>
            <input type="file" ref={fileInputRef} className="file-input file-input-bordered w-full" />
          </fieldset>

          <fieldset className="flex flex-col gap-2">
            <legend className="text-xl font-medium">Video</legend>
            <input type="file" className="file-input file-input-bordered w-full" />
          </fieldset>

          <button className="btn btn-primary w-full md:w-1/3 mx-auto mt-4 text-lg" disabled={disabled ? true :false}>
            {
              disabled ? (
                <>
                <Loader2 className="size-5 animate-spin" />
                Uploading....
                </>
              ):
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
