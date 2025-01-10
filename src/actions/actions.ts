import axios from "axios";
import { toast } from "sonner";

export async function updateDocumentTitle(id: string, title: string) {
  try {
    const res = await axios.put(`/api/docs/${id}`, { title });
    if (res.status === 200) {
      toast.success("Document title updated successfully");
    }
  } catch (error) {
    // console.log(error);
    toast.error("Failed to update document title");
    throw new Error("Failed to update document title");
  }
  //   // Update document title
  //   console.log(`Document ${id} title updated to ${title}`);
}

export async function deleteDocument(id: string, userId: string) {
  let sucess = false;
  try {
    await axios.delete(`/api/docs/${id}/${userId}`);
    // if (res.status === 200) {
    toast.success("Document deleted successfully");
    // }
    sucess = true;
    return sucess;
  } catch (error) {
    // console.log(error);
    toast.error("Failed to delete document");
    throw new Error("Failed to delete document");
  }
}

export async function inviteUserToDocument(id: string, email: string) {
  let success = false;
  try {
    const res = await axios.post(`/api/docs/${id}/invite`, { email });
    if (res.status === 200) {
      toast.success("User invited successfully");
    }
    success = true;
    return success;
  } catch (error) {
    // console.log(error);
    toast.error("Failed to invite user");
    throw new Error("Failed to invite user");
  }
}
