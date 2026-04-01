import React, { useMemo } from "react";
import { useForm } from "react-hook-form";

import { SupplierCategoryEditProps, SupplierCategoryFormProps, SupplierCategoryInputs } from "../constants/Types";

import { AgentInterface } from "../../Core/constants/Types";
import { buttons } from "../constants/Styles";







const SuppliersCategoryEdit: React.FC<SupplierCategoryEditProps> = ({
    supplierCategory,
    onSubmit,
    isSubmitting,
    onCancel,
}) => {

    const { register, handleSubmit, formState: { errors },
        reset } = useForm<SupplierCategoryInputs>({
        defaultValues: supplierCategory
    });
    
    
    React.useEffect(() => {
        if (!supplierCategory) return;

        const updated = {
            ...supplierCategory,
            date_created: supplierCategory.date_created
                ? new Date(supplierCategory.date_created).toISOString().split("T")[0]
                : undefined,
            created_by: supplierCategory.created_by,
        };

        reset(updated);
    }, [supplierCategory, reset]);






    return (
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

                    </div>
                </div>

                    <div className="p-6 space-y-6">
                        {/* Key Information */}
                        <fieldset>
                            <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">

                                    <div className="text-sm text-gray-600 font-medium mb-1">Category Name:</div>
                                    <input 
                                        {...register("category", {required: "category must be unique"})} 
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />
                                    {errors.category && <p className="text-amber-600 text-sm">{errors.category?.message}</p>}

                                    <div className="text-sm text-gray-600 font-medium mb-1">Description:</div>
                                    <textarea 
                                        {...register("description")} 
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                    />

                                    <div className="text-sm text-gray-600 font-medium mb-1">Created By:</div>
                                    {supplierCategory.created_by}
                                </div> 
                             </div>
                        </fieldset>


                        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50">
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Updating Category...
                                    </span>
                                ) : (
                                    'Update Category'
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={onCancel}
                                className={buttons.secondary}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
            </div>
        </form>
    );
}
export default SuppliersCategoryEdit;
