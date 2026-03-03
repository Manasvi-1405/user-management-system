import React, { useEffect } from "react";
import { getDocument, verifyDocument } from "../../../../redux-store/hr-management/salaryManagemenetSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  User,
  Mail,
  FileText,
  Calendar,
  ShieldCheck,
  Clock,
  BadgeCheck,
} from "lucide-react";

const SingleUserDocuemt = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { singleUserDoc } = useSelector(
    (state) => state.salaryManagementSlice
  );

  useEffect(() => {
    dispatch(getDocument(userId));
  }, [dispatch, userId]);

  if (!singleUserDoc) return null;

  const { employeeName, employeeEmail, employeeId, documents, stats } =
    singleUserDoc;


  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });


    function handleVerify(docId){
      console.log("docId")
      console.log(docId)
      const status="verified"

      dispatch(verifyDocument({documentId:docId,status:status})).unwrap().then((res)=>{
        console.log("res verification")
        console.log(res)
      }).catch((er)=>{
        console.log("verfi errr")
        console.log(er)
      })    }
  return (
    <div className="min-h-screen bg-gray-50  flex justify-center">
      <Card className="w-full  shadow-xl rounded-2xl">
        <CardContent className="p-8 space-y-6">

          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                {employeeName}
              </h2>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                {employeeEmail}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Employee ID: {employeeId}
              </p>
            </div>

            <Badge variant="secondary">
              {stats?.pending} Pending
            </Badge>
          </div>

          <Separator />

          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-semibold">{stats?.total}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-sm text-green-600">Verified</p>
              <p className="text-lg font-semibold text-green-700">
                {stats?.verified}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl">
              <p className="text-sm text-yellow-600">Pending</p>
              <p className="text-lg font-semibold text-yellow-700">
                {stats?.pending}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-xl">
              <p className="text-sm text-red-600">Rejected</p>
              <p className="text-lg font-semibold text-red-700">
                {stats?.rejected}
              </p>
            </div>
          </div>

          <Separator />

    {/* Documents List */}
{documents?.length > 0 ? (
  <div className="space-y-6">
    {documents.map((doc) => (
      <div
        key={doc.id}
        className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            {doc.documentName}
          </h3>

          <Badge
            className={
              doc.status === "verified"
                ? "bg-green-100 text-green-700"
                : doc.status === "rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }
          >
            {doc.status}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <p className="text-gray-400">Document Type</p>
            <p className="font-medium capitalize">
              {doc.documentType.replace("_", " ")}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Uploaded At</p>
            <p className="font-medium flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(doc.uploadedAt)}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Expiry Date</p>
            <p className="font-medium">
              {doc.expiryDate
                ? formatDate(doc.expiryDate)
                : "No Expiry"}
            </p>
          </div>

          <div>
            <p className="text-gray-400">Mandatory</p>
            <p className="font-medium">
              {doc.isMandatory ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Notes */}
        {doc.notes && (
          <div>
            <p className="text-gray-400 text-sm">Notes</p>
            <p className="text-sm">{doc.notes}</p>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t">
          <a
            href={doc.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm underline"
          >
            View Document
          </a>

          <Button
            size="sm"
            className="flex items-center gap-2"
            disabled={doc.status === "verified"}
            onClick={() => handleVerify(doc.id)}
          >
            <ShieldCheck className="w-4 h-4" />
            {doc.status === "verified"
              ? "Verified"
              : "Verify Document"}
          </Button>
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-10 text-gray-500">
    No documents found.
  </div>
)}

          {/* Verify Button */}
          {/* <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Verify Document
            </Button>
          </div> */}

        </CardContent>
      </Card>
    </div>
  );
};

export default SingleUserDocuemt;