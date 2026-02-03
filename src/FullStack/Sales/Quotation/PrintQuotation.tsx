import React, { forwardRef } from "react";
import { PrintQuotationProps } from "../Constants/Types";


const PrintQuotation = forwardRef<HTMLDivElement, PrintQuotationProps>((props, ref) => {
    const { quotation } = props;


    return(
        <div>
      <div ref={ref} className="bg-white p-6 shadow-lg max-w-4xl mx-auto">
        {/* Copy your backend-ready HTML structure here */}
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          RED ZONE SOLUTION
        </h1>
        <p>Quotation No: {quotation.quotation_number}</p>
        <p>Date: {quotation.quotation_date}</p>

        {/* Loop through related_quotation */}
        <table className="w-full border-collapse border border-gray-400 mt-4">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-2 border">No</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {quotation.related_quotation?.map((line, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="p-2">{idx + 1}</td>
                <td className="p-2">{line.item}</td>
                <td className="p-2">{line.quantity}</td>
                <td className="p-2">{line.price_per_unit}</td>
                <td className="p-2">{line.sub_total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 flex justify-end">
          <p className="font-bold">Net Total: {quotation.net_total}</p>
        </div>
      </div>

    </div>
    );
}
);
export default PrintQuotation;