import React, { useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import '../constants/ProjectProfile.css'

import { CustomerCreateResponse } from "../../Customers/constants/Types";
import { ProjectProfileFormProps, ProjectProfileInputs } from "../constants/Types";
import { PROJECT_STATUS_OPTIONS, 
    PROJECT_TYPE_OPTIONS,
COUNTRY_OPTIONS, 
PROJECT_PHASE_OPTIONS} from "../constants/Options";
import { AgentInterface } from "../../Core/constants/Types";
import { buttons, forms, layout, tables, utils } from "../constants/Styles";
import { Trash2 } from "lucide-react";




const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};

const formatNumber = () => {
    const currentYear = new Date().getFullYear();
    return `CV-${currentYear}-`;
};



















const ProjectsProfileForm: React.FC<ProjectProfileFormProps> = ({
    onSubmit,
    isSubmitting,
    onCancel,
    customers,
    agents }) => {

    const phasesOptions = useMemo(() => 
        PROJECT_PHASE_OPTIONS.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        )), [PROJECT_PHASE_OPTIONS])

    const { register, handleSubmit, watch, control,
        setValue, formState: {errors } } = useForm<ProjectProfileInputs>({
        defaultValues: {
            project_type: 'Residential' as any,
            status: 'Planned' as any,
            project_budget: 0.00,
            actual_cost: 0.00,
            variance: 0.00,
            estimated_end_date: new Date().toISOString().split('T')[0],

            phases: [
                {
                    current_phase: 'Not Started' as any,
                    start_date: new Date().toISOString().split('T')[0],
                    end_date: new Date().toISOString().split('T')[0],
                }
            ]
        },
    });


    const { fields, append, remove } = useFieldArray({
        name: "phases",
        control
    });








    
        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full bg-gray-50 rounded-xl p-4 border shadow-2xl border-gray-400">
                    {/* Header */}
                    <div className="form-card">
                        <h2 className="section-header">1. Basic Information</h2>

                        <div className="form-group">
                            <label>Project Name <span className="required">*</span></label>
                            <input
                                type="text"
                                {...register("project_name")}
                                name="project_name"
                                placeholder="e.g., Sunway Plaza Development"
                                className={tables.text}
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>Project Type <span className="required">*</span></label>
                                <select
                                    {...register("project_type")}
                                    name="project_type"
                                    className={forms.select.full}
                                >
                                    <option value="">select type...</option>
                                    {useMemo(() => PROJECT_TYPE_OPTIONS.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    )), [PROJECT_TYPE_OPTIONS])}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Status <span className="required">*</span></label>
                                <select
                                    {...register("status")}
                                    name="status"
                                    className={forms.select.full}
                                >
                                    <option value="">Select status...</option>
                                    {useMemo(() => PROJECT_STATUS_OPTIONS.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    )), [PROJECT_STATUS_OPTIONS])}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Project Description</label>
                            <textarea 
                                {...register("project_description")}
                                name="project_description"
                                placeholder="Provide a detailed description of the project scope and objectives..."
                            />
                            <p className="helper-text">Maximum 400 characters</p>
                        </div>
                    </div>

                    {/* <!-- Section 2: Timeline & Scheduling -->*/}
                    <div className="form-card">
                        <h2 className="section-header">2. Timeline & Scheduling</h2>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Start Date <span className="required">*</span></label>
                                <input 
                                    {...register("start_date", {required: "Start date required."})}
                                    type="date"
                                    name="start_date"
                                    className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                required/>
                                {errors.start_date && <p className="text-amber-600 text-sm">{errors.start_date?.message}</p>}
                            </div>
                            

                            <div className="form-group">
                                <label>Estimated End Date</label>
                                <input 
                                    type="date"
                                    {...register("estimated_end_date")}
                                    className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                />
                            </div>

                            <div className="form-group">
                                <label>Actual End Date</label>
                                <input 
                                    type="date"
                                    {...register("actual_end_date")}
                                    className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Duration (days)</label>
                            <input 
                                {...register("duration")}
                                type="number"
                                name="duration"
                                placeholder="e.g., 365"
                                min="1"
                            />
                            <p className="helper-text">Will be auto-calculated from start to actual end dates</p>
                        </div>
                    </div>

                    {/*<!-- Section 3: Location Details -->*/}
                    <div className="form-card">
                        <h2 className="section-header">3. Location Details</h2>

                        <div className="form-group">
                            <label>Address <span className="required">*</span></label>
                            <input 
                                type="text"
                                {...register("address")}
                                name="address"
                                placeholder="Street address"
                                className={tables.text}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>City <span className="required">*</span></label>
                                <input 
                                    type="text"
                                    {...register("city")}
                                    name="city"
                                    placeholder="e.g., Bentong"
                                    className={tables.text}
                                />
                            </div>
                            <div className="form-group">
                                <label>State <span className="required">*</span></label>
                                <input 
                                    type="text"
                                    {...register("state")}
                                    name="state"
                                    placeholder="e.g., Pahang"
                                    className={tables.text}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Zip / Postal Code<span className="required">*</span></label>
                                <input 
                                    type="text"
                                    {...register("zip_code")}
                                    name="zip_code"
                                    placeholder="e.g., 54500"
                                    className={tables.text}
                                />
                            </div>
                            <div className="form-group">
                                <label>Country<span className="required">*</span></label>
                                <select
                                    {...register("country")}
                                    name="country"
                                    className={forms.select.full}
                                >
                                    <option value="">Select Country...</option>
                                    {useMemo(() => COUNTRY_OPTIONS.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    )), [COUNTRY_OPTIONS])}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/*<!-- Section 4: Financial Details -->*/}
                    <div className="form-card">
                        <h2 className="section-header">4. Financial Details</h2>

                        <div className="form-row-3">
                            <div className="form-group">
                                <label>Project Budget <span className="required">*</span></label>
                                <input 
                                    {...register("project_budget")}
                                    name="project_budget"
                                    type="number"
                                    title="enter budget..."
                                    placeholder="0.00"
                                    step="0.01" min="0.00" onBlur={(e) => {
                                        if (e.target.value) {
                                            e.target.value = decimalPlaces(Number(e.target.value));
                                        }
                                    }}
                                />
                                <p className="helper-text">Total allocated budget</p>
                            </div>

                            <div className="form-group">
                                <label>Actual Cost <span>*</span></label>
                                <input 
                                    {...register("actual_cost")}
                                    name="actual_cost"
                                    type="number"
                                    title="enter budget..."
                                    placeholder="0.00"
                                    step="0.01" min="0.00" onBlur={(e) => {
                                        if (e.target.value) {
                                            e.target.value = decimalPlaces(Number(e.target.value));
                                        }
                                    }}
                                />
                                <p className="helper-text">Cost to date</p>
                            </div>

                            <div className="form-group">
                                <label>Variance <span>*</span></label>
                                {decimalPlaces(
                                    (Number(watch('actual_cost') || 0.00)) - (Number(watch('project_budget') || 0.00))
                                )}
                                <p className="helper-text">Auto-calculated</p>
                            </div>
                        </div>
                    </div>

                    {/*<!-- Section 5: Team Assignment -->*/}
                    <div className='form-card'>
                        <h2 className="section-header">5. Team Assignment</h2>
                        
                        <div className="form-row-3">
                            <div className="form-group">
                                <label>Project Manager <span className="required">*</span></label>
                                <select
                                    {...register("project_manager")}
                                    className={forms.select.full}
                                >
                                    <option value="">Select Manager...</option>
                                    {useMemo(() => agents.map((agent: AgentInterface) => (
                                        <option key={agent.email} value={agent.email}>
                                            {agent.email} | {agent.name}
                                        </option>
                                    )), [agents])}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Superintendent <span className="required">*</span></label>
                                <select
                                    {...register("superintendent")}
                                    className={forms.select.full}
                                >
                                    <option value="">Select superintendent...</option>
                                    {useMemo(() => agents.map((agent: AgentInterface) => (
                                        <option key={agent.email} value={agent.email}>
                                            {agent.email} | {agent.name}
                                        </option>
                                    )), [agents])}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Client / Customer</label>
                                <select
                                    {...register("client_details")}
                                    className={forms.select.full}
                                >
                                    <option value="">Select client...</option>
                                    {useMemo(() => customers.map((customer: CustomerCreateResponse) => (
                                        <option key={customer.customer_number} value={customer.customer_number}>
                                            {formatNumber()}{customer.customer_number} | {customer.customer_name}
                                        </option>
                                    )), [agents])}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/*<!-- Section 6: Phase -->*/}
                    <div className='form-card'>
                        <h2 className="section-header">6. Job Phase (Periodic Update)</h2>

                        {fields.map((field, index) => (
                            <div key={field.id}>

                                <div className="form-group">
                                     <label>Current Phase</label>
                                     <select
                                        {...register(`phases.${index}.current_phase`)}
                                        className={forms.select.full}
                                     >
                                        <option value="">Select phase...</option>
                                        {phasesOptions}
                                     </select>
                                </div>

                                <div className="form-group">
                                    <div className="form-row-2">

                                        <div className="form-group">
                                            <label>Start Date <span className="required">*</span></label>
                                            <input
                                                type="date"
                                                {...register(`phases.${index}.start_date`)}
                                                className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>End Date <span className="required">*</span></label>
                                            <input
                                                type="date"
                                                {...register(`phases.${index}.end_date` || null)}
                                                className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-2"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Phase Description</label>
                                    <textarea 
                                        {...register(`phases.${index}.phase_description`)}
                                        placeholder="Provide a detailed description of the project phase..."
                                    />
                                </div>

                                <div className="form-group">
                                    <button 
                                        type="button"
                                        title="Remove Phase"
                                        onClick={() => remove(index)}
                                    >
                                        <Trash2 size={24}/>
                                    </button> 
                                    
                                </div>
                            </div>
                        ))}
                        
                        <button
                            type="button"
                            onClick={() => append({
                                phase_description: "",
                                start_date: "",
                                current_phase: 'Not Started' as any,
                                end_date: "",
                            })}
                            className={buttons.secondary}
                        >
                            ++ Add New Phase
                        </button>
                    </div>
                    

                    
                    <div className={layout.submitSection}>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={buttons.primary}
                        >
                            {isSubmitting ? (
                                <span className="flex  items-center gap-2">
                                    <div className={utils.spinner}></div>
                                    Creating project...
                                </span>
                            ) : (
                                'Create Project'
                            )}
                        </button>
                    </div>

                </div>
            </form>
        );
};
export default ProjectsProfileForm;
