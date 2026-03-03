import React, { useState } from "react";
// import { uploadDocument } from "../api/documentApi";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { UploadCloud, FileText } from "lucide-react";
import { useDispatch } from "react-redux";
import { uploadDocuments } from "../../../redux-store/hr-management/salaryManagemenetSlice";
import { toast } from "sonner";

const documentTypes = [
  "aadhar",
  "pan",
  "voter",
  "passport",
  "driving_license",
  "education_certificate",
  "experience_certificate",
  "offer_letter",
  "appointment_letter",
  "resignation_letter",
  "relieving_letter",
  "salary_slip",
  "bank_proof",
  "other",
];

export default function UploadDocument() {
  const [formData, setFormData] = useState({
    documentType: "",
    documentName: "",
    documentNumber: "",
    documentLink: "",
    isMandatory: false,
    expiryDate: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("formData");
    console.log(formData);
    // try {
    //   const res = await uploadDocument(formData, token);
    //   setMessage(res.message || "Document uploaded successfully");
    // } catch (error) {
    //   setMessage(
    //     error?.response?.data?.message || "Upload failed"
    //   );
    // } finally {
    //   setLoading(false);
    // }
    dispatch(uploadDocuments(formData))
      .unwrap()
      .then((res) => {
        console.log("upload document");
        console.log(res);
        if (res.status === 201) {
          toast.success(res.data.data.message);
        }
      })
      .catch((err) => {
        console.log("err");
        console.log(err);
        if (err) {
          toast.error(err.data.message);
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="text-blue-600" size={28} />
            <h2 className="text-2xl font-bold">Upload Employee Document</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Document Type */}
            <div>
              <label>Document Type *</label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, documentType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ").toUpperCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Document Name */}
            <div>
              <label>Document Name</label>
              <Input
                placeholder="Enter document name"
                value={formData.documentName}
                onChange={(e) =>
                  setFormData({ ...formData, documentName: e.target.value })
                }
              />
            </div>

            {/* Document Number */}
            <div>
              <label>Document Number</label>
              <Input
                placeholder="Enter document number"
                value={formData.documentNumber}
                onChange={(e) =>
                  setFormData({ ...formData, documentNumber: e.target.value })
                }
              />
            </div>

            {/* Document Link */}
            <div>
              <label>Document Link</label>
              <Input
                placeholder="Paste file URL"
                value={formData.documentLink}
                onChange={(e) =>
                  setFormData({ ...formData, documentLink: e.target.value })
                }
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label>Expiry Date</label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
              />
            </div>

            {/* Notes */}
            <div>
              <label>Notes</label>
              <Textarea
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </div>

            {/* Mandatory */}
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={formData.isMandatory}
                onCheckedChange={(value) =>
                  setFormData({ ...formData, isMandatory: value })
                }
              />
              <label>Is Mandatory Document</label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full flex items-center gap-2"
              // disabled={loading}
            >
              <UploadCloud size={18} />
              {loading ? "Uploading..." : "Upload Document"}
            </Button>

            {/* Message */}
            {message && (
              <p className="text-sm text-center text-red-500 mt-2">{message}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
