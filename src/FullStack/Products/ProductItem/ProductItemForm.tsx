import React, { useMemo } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import { ProductItemInputs, ProductGroupCreateResponse } from "../constants/Types";

import { BOOLEAN_OPTIONS } from "../constants/options";

import {CurrencyInterface} from "../../Core/constants/Types"













const ProductItemForm: React.FC<any> = ({ onSubmit, onCancel, isSubmitting,
    currencies, accounts, agents, productGroups }) => {

        const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm<ProductItemInputs>({
            defaultValues: {
                active: true
            }
        });

        const { fields, append, remove } = useFieldArray({
            name: "additional_photos",
            control
        });



        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-white rounded-xl shadow-2xl border border-gray-200">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">

                            <div className="flex gap-3">
                                <span className="inline-flex text-black items-center rounded-full text-s ">Date created: 
                                <input 
                                    type="date"
                                    {...register("date_created")}
                                    className="ml-4 w-34 h-6 text-center bg-transparent cursor-pointer text-black rounded-lg focus:ring-2 focus:ring-green-300 bg-gray border border-gray-300"
                                    />
                                </span>
                                {errors.date_created && <p className="text-amber-600 text-sm">{errors.date_created?.message}</p>}
                            </div>

                            <div className="absolute left-1/2 transform -translate-x-1/2">
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <span className="inline-flex text-black items-center rounded-full text-s  ">Status:      
                                <select 
                                    {...register("active")}
                                    className="ml-4 w-25 h-6 text-center bg-transparent cursor-pointer text-black rounded-lg focus:ring-2 focus:ring-green-300 bg-gray border border-gray-300"
                                >
                                    <option value="">select...</option>
                                    {BOOLEAN_OPTIONS.map(option => (
                                        <option key={String(option.value)} value={String(option.value)}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Key Information */}
                        <fieldset className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">

                            <label className="text-sm text-gray-600 mb-1">Item Description:
                            <input 
                                {...register("item_description")} 
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            />
                            </label>

                            <label className="text-sm text-gray-600 mb-1">Product Serial Number:
                            <input 
                                {...register("product_serial_number")} 
                                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                            />
                            </label>

                            <label className="text-sm text-gray-600 font-medium mb-1">Product Group:
                                <select
                                    {...register("product_group")}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">select...</option>
                                    {useMemo(() => productGroups.map((productGroup: ProductGroupCreateResponse) => (
                                        <option key={productGroup.group_code} value={productGroup.group_code}>
                                            SKG-{productGroup.group_code} | Group name: {productGroup.group_name}
                                        </option>
                                    )), [productGroups])}
                                </select>
                            </label>

                        </fieldset>

                        {/* PRODUCT DETAILS */}
                        <fieldset>
                            
                            <div className="bg-green-50 rounded-lg p-6 border border-green-200 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                                <legend>Item Information</legend>
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-black mb-1">Base Unit of Measure:</div>
                                    <input 
                                        {...register("base_unit_of_measure")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-black mb-1">Reference Cost:</div>
                                    <input 
                                        {...register("reference_cost")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01" min="0" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                            }
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-black mb-1">Reference Price:</div>
                                    <input
                                        {...register("reference_price")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01" min="0" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                            }
                                        }}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-black mb-1">Quantity Available:</div>
                                    <input 
                                        {...register("quantity_available")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                        type="number"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-black mb-1">Supplier Details:</div>
                                    <textarea 
                                        {...register("supplier_name")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-black mb-1">Currency:</div>
                                    <select
                                        {...register("currency")}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">select...</option>
                                        {useMemo(() => currencies.map((currency: CurrencyInterface) => (
                                            <option key={currency.currency_code} value={currency.currency_code}>
                                                {currency.currency_code} - {currency.country}
                                            </option>
                                        )), [currencies])}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="text-sm text-black mb-1">Item Photo:</div>
                                    <input
                                        className="w-full text-black cursor-pointer rounded-lg border border-gray-300 px-3 py-2"
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files?.[0] || null;
                                            setValue('product_photo', file);
                                        }}
                                    />
                                </div>
                            </div>
                        </fieldset>

                        <div className="bg-violet-50 rounded-lg p-6 border border-violet-200 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Photos</h3>
                            {fields.map((field, index) => (
                                <div key={field.id} className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">

                                    <div className="text-sm text-gray-600 font-medium mb-1">Photo:</div>
                                    <input 
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files?.[0] || null;
                                            setValue(`additional_photos.${index}.additional_photo`, file);
                                        }}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />

                                    <div className="text-sm text-gray-600 font-medium mb-1">Photo Description:</div>
                                    <input 
                                        {...register(`additional_photos.${index}.description`)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                    >
                                        x Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => append({ 
                                    additional_photo: null, 
                                    description: "" 
                                })}
                            >
                                + Add More
                            </button>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Creating Product...
                                    </span>
                                ) : (
                                    'Create Product'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    };
    export default ProductItemForm;
