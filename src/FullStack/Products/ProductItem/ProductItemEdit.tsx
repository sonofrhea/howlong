import React, { useMemo, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ProductItemInputs,
    ProductGroupCreateResponse, ProductItemProps } from "../constants/Types";

import { BOOLEAN_OPTIONS } from "../constants/options";

import {CurrencyInterface} from "../../Core/constants/Types"
import { buttons } from "../constants/Styles";






        //const photo = watch("product_photo");
        //if (photo instanceof File) {
        //    const url = URL.createObjectURL(photo);
        //    return () => URL.revokeObjectURL(url);
        //}




const ProductItemEdit: React.FC<ProductItemProps> = ({
    productItem,
    onSubmit,
    onCancel,
    isSubmitting,
    currencies, accounts, agents, productGroups 
}) => {
    const productItemId = productItem.item_code;

    const { register, handleSubmit, watch, setValue, control, 
        reset, formState: { errors } } = useForm<ProductItemInputs>({
            defaultValues: productItem
        });



    React.useEffect(() => {
        if (!productItem) return;

        const updated = {
            ...productItem,
            date_created: productItem.date_created
                ? new Date(productItem.date_created).toISOString().split("T")[0]
                : ""
            };

        reset(updated);
    }, [productItem, reset]);


    


    

    


        







    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl shadow-green-100 overflow-hidden font-sans">

                {/* ── TOP HEADER BAR ── */}
                <div className="bg-gray-50 border-b border-gray-100 px-8 py-4 flex items-center justify-between gap-6">
                
                {/* Date Created */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-widest text-gray-600 uppercase">Date Created</span>
                    <input
                    type="date"
                    {...register("date_created")}
                    className="h-8 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition cursor-pointer"
                    />
                    {errors.date_created && (
                    <p className="text-amber-500 text-xs">{errors.date_created?.message}</p>
                    )}
                </div>

                {/* Status */}
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold tracking-widest text-gray-600 uppercase">Status</span>
                    <select
                        {...register("active")}
                        className="h-8 px-3 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition cursor-pointer"
                    >
                    <option value="">Select…</option>
                    {BOOLEAN_OPTIONS.map(option => (
                        <option key={String(option.value)} value={String(option.value)}>
                        {option.label}
                        </option>
                    ))}
                    </select>
                </div>
                </div>

                <div className="px-8 py-8 space-y-8">

                <section className="space-y-4">
                    <h2 className="text-xs font-semibold tracking-widest text-black uppercase border-b border-gray-100 pb-2">
                        Product Identity
                    </h2>

                    <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Item Description</label>
                    <input
                        {...register("item_description")}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
                    />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Serial Number</label>
                            <input
                            {...register("product_serial_number")}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Product Group</label>
                            <select
                                {...register("product_group")}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white transition cursor-pointer"
                            >
                            <option value="">Select…</option>
                            {useMemo(() => productGroups.map((productGroup: ProductGroupCreateResponse) => (
                                <option key={productGroup.group_code} value={productGroup.group_code}>
                                {productGroup.formatted_number} | {productGroup.group_name}
                                </option>
                            )), [productGroups])}
                            </select>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-xs font-semibold tracking-widest text-black uppercase border-b border-gray-100 pb-2 mb-5">
                        Item Information
                    </h2>

                    <fieldset className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-6 space-y-5">
                    
                    {/* Row: UOM + Quantity */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Base Unit of Measure</label>
                        <input
                            {...register("base_unit_of_measure")}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />
                        </div>
                        <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Quantity Available</label>
                        <input
                            {...register("quantity_available")}
                            type="number"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />
                        </div>
                    </div>

                    {/* Row: Costs + Currency */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                        <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Reference Cost</label>
                        <input
                            {...register("reference_cost")}
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            onBlur={(e) => {
                            if (e.target.value) e.target.value = parseFloat(e.target.value).toFixed(2);
                            }}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />
                        </div>
                        <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Reference Price</label>
                        <input
                            {...register("reference_price")}
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            onBlur={(e) => {
                            if (e.target.value) e.target.value = parseFloat(e.target.value).toFixed(2);
                            }}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        />
                        </div>
                        <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Currency</label>
                        <select
                            {...register("currency")}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition cursor-pointer"
                        >
                            <option value="">Select…</option>
                            {useMemo(() => currencies.map((currency: CurrencyInterface) => (
                            <option key={currency.currency_code} value={currency.currency_code}>
                                {currency.currency_code} — {currency.country}
                            </option>
                            )), [currencies])}
                        </select>
                        </div>
                    </div>

                    {/* Supplier */}
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Supplier Details</label>
                        <textarea
                        {...register("supplier_name")}
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
                        />
                    </div>

                    {/* Main Photo */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Item Photo</label>
                        <div className="flex items-start gap-5 flex-wrap">
                        {typeof productItem.product_photo === "string" && (
                            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                            <img
                                src={productItem.product_photo}
                                className="w-28 h-28 object-contain rounded-lg"
                                alt="Existing"
                            />
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            <p className="text-xs text-gray-600">Replace existing photo</p>
                            <input
                            type="file"
                            placeholder="upload product photo"
                            onChange={e => {
                                const file = e.target.files?.[0] || undefined;
                                setValue('product_photo', file);
                            }}
                            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 transition"
                            />
                        </div>
                        </div>
                    </div>

                    </fieldset>
                </section>

                <section>
                    <h2 className="text-xs font-semibold tracking-widest text-black uppercase border-b border-gray-100 pb-2 mb-5">
                        Additional Photos
                    </h2>

                    <div className="rounded-2xl border border-violet-100 bg-violet-50/40 p-6 space-y-6">

                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Additional Photo 1</label>
                        <div className="flex items-start gap-5 flex-wrap">
                        {typeof productItem.additional_photo1 === "string" && (
                            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                            <img
                                src={productItem.additional_photo1}
                                className="w-28 h-28 object-contain rounded-lg"
                                alt="Existing"
                            />
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            <p className="text-xs text-gray-600">Replace existing photo</p>
                            <input
                            type="file"
                            placeholder="upload product photo"
                            onChange={e => {
                                const file = e.target.files?.[0] || undefined;
                                setValue('additional_photo1', file);
                            }}
                            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 transition"
                            />
                        </div>
                        </div>

                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Additional Photo 2</label>
                        <div className="flex items-start gap-5 flex-wrap">
                        {typeof productItem.additional_photo2 === "string" && (
                            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                            <img
                                src={productItem.additional_photo2}
                                className="w-28 h-28 object-contain rounded-lg"
                                alt="Existing"
                            />
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            <p className="text-xs text-gray-600">Replace existing photo</p>
                            <input
                            type="file"
                            placeholder="upload product photo"
                            onChange={e => {
                                const file = e.target.files?.[0] || undefined;
                                setValue('additional_photo2', file);
                            }}
                            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 transition"
                            />
                        </div>
                        </div>

                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Additional Photo 3</label>
                        <div className="flex items-start gap-5 flex-wrap">
                        {typeof productItem.additional_photo3 === "string" && (
                            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                            <img
                                src={productItem.additional_photo3}
                                className="w-28 h-28 object-contain rounded-lg"
                                alt="Existing"
                            />
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            <p className="text-xs text-gray-600">Replace existing photo</p>
                            <input
                            type="file"
                            placeholder="upload product photo"
                            onChange={e => {
                                const file = e.target.files?.[0] || undefined;
                                setValue('additional_photo3', file);
                            }}
                            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 transition"
                            />
                        </div>
                        </div>

                        <label className="text-xs font-medium text-gray-600 tracking-wide uppercase">Additional Photo 4</label>
                        <div className="flex items-start gap-5 flex-wrap">
                        {typeof productItem.additional_photo4 === "string" && (
                            <div className="rounded-xl border border-gray-200 bg-white p-2 shadow-sm">
                            <img
                                src={productItem.additional_photo4}
                                className="w-28 h-28 object-contain rounded-lg"
                                alt="Existing"
                            />
                            </div>
                        )}
                        <div className="flex-1 space-y-1">
                            <p className="text-xs text-gray-600">Replace existing photo</p>
                            <input
                            type="file"
                            placeholder="upload product photo"
                            onChange={e => {
                                const file = e.target.files?.[0] || undefined;
                                setValue('additional_photo4', file);
                            }}
                            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-100 file:text-emerald-700 hover:file:bg-emerald-200 cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-2 transition"
                            />
                        </div>
                        </div>

                    </div>
                </section>

                {/* ── FOOTER: Actions ── */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
                    <button
                    type="button"
                    onClick={() => onCancel(productItemId)}
                    className={buttons.secondary}
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                    {isSubmitting ? (
                        <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Updating…
                        </>
                    ) : (
                        'Update Product'
                    )}
                    </button>
                </div>

                </div>
            </div>
        </form>
    );
};
export default ProductItemEdit;