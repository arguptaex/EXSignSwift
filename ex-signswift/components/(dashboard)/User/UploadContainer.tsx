"use client";
import { DocumentDropzone } from "@/components/(dashboard)/User/Upload";
import { useToast } from "@/components/ui/use-toast";
import { useEdgeStore } from "../../../lib/edgestore";
import { useRouter } from "next/navigation";

export default function UploadContainer() {
  const router = useRouter();
  const { toast } = useToast();
  const { edgestore } = useEdgeStore();
  const onFileDropRejected = () => {
    toast({
      title: "Your document failed to upload.",
      description: `File cannot be larger than 50 MB`,
      duration: 5000,
      variant: "destructive",
    });
  };
  const onFileDrop = async (file: File) => {
    try {
      if (file) {
        console.log("file");
        const res = await edgestore.publicFiles.upload({
          file,
          onProgressChange: (progress) => {
            console.log(progress);
          },
        });

        console.log(res);
        router.push("/document/124");
      }
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <main className=" flex flex-col gap-4 bg-gray-800 ">
      {/* User Dashboard with ID here the user should be directed to after login
      here will be the upload and table function */}

      <DocumentDropzone
        className="h-[50vh]"
        onDrop={onFileDrop}
        onDropRejected={onFileDropRejected}
      />
    </main>
  );
}