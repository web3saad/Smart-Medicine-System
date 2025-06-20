import React from "react";
import { useGetAllProductRequestsQuery } from "../../redux/features/productRequestApi";

const ProductRequests = () => {
  const { data: productRequests, error, isLoading } = useGetAllProductRequestsQuery(undefined, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return <div className="p-4">Loading product requests...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading product requests.</div>;
  }

  // Use productRequests?.data for the array
  const requestsArray = productRequests?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Requests</h1>
      {requestsArray.length > 0 ? (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Product Description</th>
              <th className="border px-4 py-2 text-left">Requester ID</th>
              <th className="border px-4 py-2 text-left">Requested Time</th>
            </tr>
          </thead>
          <tbody>
            {requestsArray.map((request: any) => (
              <tr key={request._id}>
                <td className="border px-4 py-2">{request.productDescription || "N/A"}</td>
                <td className="border px-4 py-2">{request.requestedId || "N/A"}</td>
                <td className="border px-4 py-2">{request.requestedTime || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No product requests found.</p>
      )}
    </div>
  );
};

export default ProductRequests;
