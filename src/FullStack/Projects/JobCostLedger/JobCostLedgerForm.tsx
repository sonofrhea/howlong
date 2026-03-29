import React, { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";


import { BillOfQuantitiesResponse, 
    JobCostLedgerInputs, 
    ProjectProfileResponse,
JobCostCodesInterface, 
JobCostLedgerFormProps,
BillOfQuantitiesLineResponse} from "../constants/Types";

import { boqLineHandler, jobCostBoqHandler, 
    jobcostcodesHandler, 
    jobCostProjectsHandler } from "../../handlers";

import { COST_TYPE_CHOICES_OPTIONS, JOB_COST_LEDGER_STATUS_OPTIONS, JOB_COST_LINES_STATUS_OPTIONS,

 } from "../constants/Options";
import { SupplierProfileResponse } from "../../Suppliers/constants/Types";
import { buttons, utils } from "../constants/Styles";


const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};

const formatBoqNumber = () => {
    const currentYear = new Date().getFullYear();
    return `BOQ-${currentYear}-`;
};

const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};










const JobCostLedgerForm: React.FC<JobCostLedgerFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel,
    suppliers, 
    jobCostCodes,
    billOfQuantities,
    agents,
    projects,
    boqLines,
    setSelectedBoqId
}) => {

        const costCode = useMemo(() => 
            jobCostCodes.map((code: JobCostCodesInterface) => (
            <option key={code.job_cost_code} value={code.job_cost_code}>
                {code.job_cost_code} - ({code.job_cost_description})
            </option>
        )), [jobCostCodes])

        const supplierSelect = useMemo(() => 
            suppliers.map((supplier: SupplierProfileResponse) => (
                <option key={supplier.supplier_name} value={supplier.supplier_name}>
                    {supplier.supplier_name}
                </option>
        )), [suppliers])
        
        const costTypeSelect = useMemo(() => 
            COST_TYPE_CHOICES_OPTIONS.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
        )), [COST_TYPE_CHOICES_OPTIONS])
        
        const statusLineSelect = useMemo(() => 
            JOB_COST_LINES_STATUS_OPTIONS.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
        )), [JOB_COST_LINES_STATUS_OPTIONS])
        
        
        const boqLinesOptions = useMemo(() =>
            boqLines.map((line: BillOfQuantitiesLineResponse) => (
                <option key={line.id} value={line.id}>
                    SKU-{line.product_item} - {line.additional_item}
                </option>
            )), [boqLines])







        const { register, handleSubmit, watch, control, setValue, 
            formState: { errors }} = useForm<JobCostLedgerInputs>({
                defaultValues: {
                    boq_estimated_amount: 0.00,
                    status: 'Active',
                    job_cost_ledger: [
                        {
                            cost_type: 'Direct Cost',
                            status: 'Committed',
                            cost: 0.00,
                            taxable: false,
                            sst_percent: 0.00
                        }
                    ]
                }
            });
        
        const { fields, append, remove } = useFieldArray({
            name: 'job_cost_ledger',
            control
        });


const onProjectChange = jobCostProjectsHandler(projects, setValue);
const onBoqChange = jobCostBoqHandler(billOfQuantities, setValue, setSelectedBoqId);


















        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="min-w-full bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-6">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-200">
                        Job Cost Ledger Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Related Project <span className="text-red-500">*</span>
                            </label>
                            <select
                                className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                {...register("project")}
                                onChange={onProjectChange}
                            >
                                <option value="">Select project...</option>
                                {useMemo(() => projects.map((project: ProjectProfileResponse) => (
                                    <option key={project.project_code} value={project.project_code}>
                                        {formatProjectNumber()}{project.project_code} | {project.project_name}
                                    </option>
                                )), [projects])}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                BOQ Reference <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("boq")}
                                onChange={onBoqChange}
                                className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                            >
                                <option value="">Select BOQ...</option>
                                {useMemo(() => billOfQuantities.map((billOfQuantity: BillOfQuantitiesResponse) => (
                                    <option key={billOfQuantity.boq_number} value={billOfQuantity.boq_number}>
                                        {formatBoqNumber()}{billOfQuantity.boq_number} - {billOfQuantity.project_name} ({billOfQuantity.gross_estimation} + {billOfQuantity.contingency_rate}% contingency)
                                    </option>
                                )), [billOfQuantities])}
                            </select>
                        </div>
    
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                BOQ Estimated Amount excl. contingency
                            </label>
                            <input 
                                className="w-full text-sm px-3 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-blue-900 placeholder-blue-900"
                                {...register("boq_estimated_amount")}
                                readOnly
                                type="number"
                                placeholder="0.00"
                                step="0.01" min="0.00" onBlur={(e) => {
                                    if (e.target.value) {
                                        e.target.value = decimalPlaces(Number(e.target.value));
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input 
                                className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                type="date"
                                {...register("date", {required: "Date is required"})}
                            />
                            {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Status
                            </label>
                            <select
                                className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                {...register("status")}
                            >
                                <option value="">Select status...</option>
                                {useMemo(() => JOB_COST_LEDGER_STATUS_OPTIONS.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                )), [JOB_COST_LEDGER_STATUS_OPTIONS])}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Description
                            </label>
                            <textarea 
                                className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                {...register("description")}
                                placeholder="Enter job cost ledger description..."
                            />
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 md:p-8 mb-6">
                    <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Cost Line Items</h2>
                            <p className="text-sm text-slate-600 mt-1">Add cost entries...</p>
                        </div>

                        <button
                            className="inline-flex items-center px-4 py-2 bg-violet-900 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm"
                            type="button"
                            onClick={() => append({
                                boq_line: undefined,
                                boq_additional: undefined,
                                cost_code: undefined,
                                description: undefined,
                                supplier: undefined,
                                cost_type: 'Direct Cost',
                                status: 'Committed',
                                cost: 0.00,
                                taxable: false,
                                sst_percent: 0.00,
                            })}
                        >
                        ++ Add Cost Line
                        </button>
                    </div>
                    {fields.length > 0 ? fields.map((field, index) => {

                        const onJobCostCodeChange = jobcostcodesHandler(jobCostCodes, setValue, index);
                        const onBoqLineChange = boqLineHandler(boqLines, setValue, index);
                        
                        return(
                            <div key={field.id}>

                                    <div className="space-y-4 mb-5">
                                        <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-6 relative">
                                            <button
                                                className="absolute top-4 right-4 text-black hover:text-red-600 transition-colors duration-200"
                                                type="button"
                                                onClick={() => remove(index)}
                                            >
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                                                </svg>
                                            </button>

                                            <div className="mb-4 pb-4 border-b border-slate-300">
                                                <span className="text-lg font-bold text-slate-700">
                                                    Line Item #{index + 1}
                                                </span>
                                            </div>
                                                
                                                {/* FULL LINES */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                                                {/* BOQ SELECTION */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Related BOQ Line
                                                    </label>
                                                    <select
                                                        className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                        {...register(`job_cost_ledger.${index}.boq_line`)}
                                                        onChange={onBoqLineChange}
                                                    >
                                                        <option value="">Select BOQ Line...</option>
                                                        {boqLinesOptions}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Product extra description(BOQ LINE)
                                                    </label>
                                                    <input
                                                        className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                        {...register(`job_cost_ledger.${index}.boq_additional`)}
                                                        readOnly
                                                    />
                                                </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                    Estimated amount(BOQ LINE)
                                                </label>
                                                <input 
                                                    className="w-full text-sm px-3 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-blue-900"
                                                    {...register(`job_cost_ledger.${index}.estimated`)}
                                                    type="number"
                                                    readOnly
                                                    placeholder="0.00"
                                                    step="0.01" min="0.00" onBlur={(e) => {
                                                        if (e.target.value) {
                                                            e.target.value = decimalPlaces(Number(e.target.value));
                                                        }
                                                    }}
                                                />
                                            </div>

                                                
                                                {/*COST CODE*/}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Cost Code
                                                    </label>
                                                    <select
                                                        className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                        {...register(`job_cost_ledger.${index}.cost_code.job_cost_code`)}
                                                        onChange={onJobCostCodeChange}
                                                    >
                                                        <option value="">Select cost code...</option>
                                                        {costCode}
                                                    </select>
                                                    <input type="hidden" {...register(`job_cost_ledger.${index}.cost_code.job_cost_description`)} />
                                                </div>

                                                {/* SUPPLIER */}
                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Supplier
                                                    </label>
                                                    <select
                                                        {...register(`job_cost_ledger.${index}.supplier`)}
                                                        className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                    >
                                                        <option value="">Select supplier...</option>
                                                        {supplierSelect}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Cost Type
                                                    </label>
                                                    <select
                                                        {...register(`job_cost_ledger.${index}.cost_type`)}
                                                        className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                    >
                                                        <option value="">Select cost type...</option>
                                                        {costTypeSelect}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Status
                                                    </label>
                                                    <select
                                                        {...register(`job_cost_ledger.${index}.status`)}
                                                        className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                    >
                                                        <option value="">Select status...</option>
                                                        {statusLineSelect}
                                                    </select>
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Description
                                                    </label>
                                                    <input 
                                                        className="w-full text-sm px-3 py-2 bg-violet-50 border-2 border-violet-200 rounded-lg font-bold text-violet-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:text-green-900 focus:border-transparent transition-all duration-200"
                                                        {...register(`job_cost_ledger.${index}.description`)}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Cost
                                                    </label>
                                                    <input 
                                                        className="w-full text-sm px-3 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-blue-900 placeholder-blue-900"
                                                        {...register(`job_cost_ledger.${index}.cost`)}
                                                        type="number"
                                                        placeholder="0.00"
                                                        step="0.01" min="0.00" onBlur={(e) => {
                                                            if (e.target.value) {
                                                                e.target.value = decimalPlaces(Number(e.target.value));
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Taxable?
                                                    </label>
                                                    <input 
                                                        className="w-full! text-sm! px-5! py-4! bg-blue-50! border-2 border-blue-200! rounded-lg! font-bold! text-blue-900! placeholder-blue-900"
                                                        {...register(`job_cost_ledger.${index}.cost`)}
                                                        type="checkbox"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        SST %
                                                    </label>
                                                    <input 
                                                        className="w-full text-sm px-3 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-blue-900 placeholder-blue-900"
                                                        {...register(`job_cost_ledger.${index}.sst_percent`)}
                                                        type="number"
                                                        placeholder="0.00"
                                                        step="0.01" min="0.00" onBlur={(e) => {
                                                            if (e.target.value) {
                                                                e.target.value = decimalPlaces(Number(e.target.value));
                                                            }
                                                        }}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                                        Total Cost
                                                    </label>
                                                    <div className="w-full text-sm px-3 py-2 bg-blue-50 border-2 border-blue-200 rounded-lg font-bold text-blue-900 placeholder-blue-900">
                                                        <span className="text-sm font-bold text-blue-900">
                                                            {decimalPlaces(
                                                                (Number(watch(`job_cost_ledger.${index}.cost`) || 0.00)) * 
                                                                (1 + (Number(watch(`job_cost_ledger.${index}.sst_percent`) || 0.00) / 100))
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        );
                    }) : (
                        <div
                            className="text-center py-12 border-2 border-dashed border-slate-300 rounded-lg">
                            <svg className="w-16 h-16 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                            </svg>
                            <p className="text-slate-600 font-medium">No job cost lines added yet</p>
                            <p className="text-sm text-slate-500 mt-1">Click "Add Cost Line" to start tracking costs</p>
                        </div>
                    )}
                </div>
                

                {/* SUBMIT BUTTON */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <button
                        className={buttons.primary}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <div className={utils.spinner}></div>
                                'Creating Job Cost Ledger'
                            </span>
                        ) : (
                            'Create Job Cost Ledger'
                        )}
                    </button>
                </div>
            </form>
        );
    }; 
    export default JobCostLedgerForm;
