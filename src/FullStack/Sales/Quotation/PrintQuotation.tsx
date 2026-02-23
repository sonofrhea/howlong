import React, { forwardRef } from "react";
import { PrintQuotationProps } from "../Constants/Types";


const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `QT-${currentYear}-`;
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toISOString().split("T")[0];
};

const productItem = () => {
    return `SKU-`;
};






const PrintQuotation = forwardRef<HTMLDivElement, PrintQuotationProps>((props, ref) => {
    const { quotation } = props;


    return(
      <div>
        <div ref={ref} className="bg-white p-6 shadow-lg max-w-4xl mx-auto">
            
                <div className="max-w-200 mx-auto bg-white shadow-sm border border-gray-200 p-8 min-h-262.5 flex flex-col">
                    
                    {/* Header Section */}
                    <div className="flex justify-between items-start border-b-2 border-black pb-4">
                        <div className="w-2/3">
                            <h1 className="text-2xl font-bold text-red-600 mb-1">RED ZONE SOLUTION</h1>
                            <p className="text-[10px] text-gray-600 mb-2">co.reg.no.200503164279 (001582202-X)</p>
                            <div className="text-[11px] leading-tight space-y-0.5">
                                <p>No 11, JALAN 7/40, TAMAN PUSAT KEPONG, KEPONG 52100 KUALA LUMPUR</p>
                                <p>HP: +6012.3799.530 Tel: +603.6259.4410 | +603.6259.4450 | +603.6731.4440</p>
                                <p>Email: redzonesolution@gmail.com Website: redzone2u.com</p>
                                <p>TIN: D58918647070 CP No.: W10-2503-32000124</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <h2 className="text-3xl font-bold text-gray-300 tracking-[0.2em] mb-4">QUOTATION</h2>
                            <div className="text-xs text-left border border-gray-200 p-2 inline-block min-w-45">
                                <div className="flex justify-between">
                                  <strong>No.</strong><span>: {formatNumber()}{quotation.quotation_number} </span>
                                </div>
                                <div className="flex justify-between"><strong>Your Ref.</strong><span>: </span></div>
                                <div className="flex justify-between"><strong>Terms</strong><span>: CASH ON DELIVERY</span></div>
                                <div className="flex justify-between"><strong>Date</strong><span>: 17/11/2025</span></div>
                                <div className="flex justify-between"><strong>Page</strong><span>: 1 of 1</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Billing Section */}
                    <div className="mt-6 mb-6">
                        <div className="w-1/2">
                            <p className="text-xs font-bold mb-1">CHANTEQ BUILDER SDN BHD</p>
                            <div className="text-[11px] leading-normal">
                                <p>Lot 29-1, Wangsa Walk Mall,</p>
                                <p>9, Jalan Wangsa Perdana 1,</p>
                                <p>53300 Wangsa Maju, KL.</p>
                                <p className="mt-2">Attn:</p>
                                <p>TEL: +60 13-757 1558</p>
                            </div>
                        </div>
                    </div>

                    {/* Table Section */}
                    <div className="grow">
                        <table className="w-full text-[11px] border-collapse">
                            <thead>
                                <tr className="border-y border-black font-bold uppercase">
                                    <th className="py-2 text-left w-10">No</th>
                                    <th className="py-2 text-left">Description</th>
                                    <th className="py-2 text-center w-20">Qty</th>
                                    <th className="py-2 text-right w-22.5">Price/Unit</th>
                                    <th className="py-2 text-right w-20">Discount</th>
                                    <th className="py-2 text-right w-22.5">Amount</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                              {quotation.related_quotation?.map((line, index) => (
                                <tr className="align-top">
                                    <td className="py-3">{index + 1}</td>
                                    <td className="py-3 pr-4">
                                        <p className="font-bold uppercase">{productItem()}{line.item} | {line.item_name}</p>
                                        <p className="text-gray-500 italic">{line.description}</p>
                                    </td>
                                    <td className="py-3 text-center">3 MONTHS</td>
                                    <td className="py-3 text-right">300.00</td>
                                    <td className="py-3 text-right"></td>
                                    <td className="py-3 text-right">900.00</td>
                                </tr>
                              ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer Calculation */}
                    <div className="mt-6 border-t border-black pt-4">
                        <div className="flex justify-between items-start">
                            <div className="w-3/5">
                                <p className="text-[10px] font-bold italic mb-1 uppercase">RINGGIT MALAYSIA:</p>
                                <p className="text-xs font-bold uppercase underline">THREE THOUSAND NINE HUNDRED AND NINETY SIX ONLY</p>
                                
                                <div className="mt-6 text-[9px] space-y-1">
                                    <p className="font-bold underline">RED ZONE SOLUTION Bank Account Detail :-</p>
                                    <p>MAYBANK 5142 4412 1293 | PUBLIC BANK 313 313 4223 | OCBC BANK 1901001129 | DuitNow 001582202X</p>
                                    <p className="mt-2 text-blue-600 underline">Pay With eWallet (https://www.redzone2u.com/DuitNow)</p>
                                </div>
                            </div>

                            <div className="w-1/3 text-xs">
                                <div className="flex justify-between py-1">
                                    <span>Total Excl. Tax :</span>
                                    <span>3,700.00</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span>Service Tax 8%:</span>
                                    <span>296.00</span>
                                </div>
                                <div className="flex justify-between py-1 border-t border-black font-bold text-sm">
                                    <span>Total:</span>
                                    <span>3,996.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Terms & Conditions */}
                    <div className="mt-4 text-[9px] border-t border-gray-100 pt-2 text-gray-600 italic leading-tight">
                        <p>Notes: 1. All cheques should be crossed and made payable to RED ZONE SOLUTION</p>
                        <p>2. Goods sold are non-exchangeable, non-returnable, & non-refundable.</p>
                        <p>3. Fair usage policy applies to any of our Services & Product.</p>
                        <p>4. The service contract shall remain valid for the agreed duration unless terminated by mutual agreement.</p>
                    </div>

                    {/* Signature Section */}
                    <div className="mt-12 flex justify-between">
                        <div className="w-1/3 text-center border-t border-black pt-1">
                            <p className="text-[10px] font-bold">Authorised Signature</p>
                        </div>
                        <div className="w-1/3 text-center border-t border-black pt-1">
                            <p className="text-[10px] font-bold">Customer Chop & Sign</p>
                        </div>
                    </div>

                </div>

            </div>

      </div>
    );
}
);
export default PrintQuotation;