"use client";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import type { FilePondFile } from "filepond";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
export const FileImage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [files, setFiles] = useState<FilePondFile[]>([]);
  return (
    <div className="w-full sm:h-fit h-auto">
      <FilePond
        onupdatefiles={setFiles}
        maxFiles={1}
        styleButtonRemoveItemPosition="center top"
        name="profile-image"
        labelIdle='<span>Arrastra la imagen o sube una imagen</span> <span class="filepond--label-action flex items-center justify-center pt-3"><svg width="64px" height="64px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#f2f2f2"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="upload"> <g> <path d="M3,12.3v7a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2v-7" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <g> <polyline data-name="Right" fill="none" id="Right-2" points="7.9 6.7 12 2.7 16.1 6.7" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="16.3" y2="4.8"></line> </g> </g> </g> </g> </g></svg></span>'
        stylePanelLayout="compact circle"
        credits={false}
      />
    </div>
  );
};
