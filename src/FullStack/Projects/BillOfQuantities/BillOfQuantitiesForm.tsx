import React, { useMemo } from 'react';
import '../constants/BOQ.css';
import { useFieldArray, useForm } from "react-hook-form";
import { BillOfQuantitiesInputs, ProjectProfileResponse } from '../constants/Types';
import { billofQuantitiesProjectName } from '../../handlers';
import { ProductItemCreateResponse } from '../../Products/constants/Types';
import { buttons, forms, layout, tables, utils } from '../constants/Styles';




const formatProjectNumber = () => {
    const currentYear = new Date().getFullYear();
    return `PZN-${currentYear}-0`;
};


const decimalPlaces = (amount: number) => {
    return `${amount.toFixed(2)}`;
};

















const BillOfQuantitiesForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, 
    agents, projects, products }) => {

        const productItem = useMemo(() => 
        products.map((product: ProductItemCreateResponse) => (
            <option key={product.item_code} value={product.item_code}>
                SKU-{product.item_code} | {product.item_description}
            </option>
        )), [products])

        const { register, handleSubmit, watch, control, setValue, 
            formState: { errors } } = useForm<BillOfQuantitiesInputs>({
                defaultValues: {
                    boq: [
                        {
                            quantity: 0.00,
                            rate_per_unit: 0.00,
                        },
                    ],
                    contingency_rate: 0.00,
                    gross_estimation: 0.00
                }
            });

            const { fields, append, remove } = useFieldArray({
                name: "boq",
                control
            });
        


const onProjectChange = billofQuantitiesProjectName(projects, setValue);














        return(
            <form onSubmit={handleSubmit(onSubmit)}>

                {/*<!-- Project Details Section -->*/}

                <div className="totals-section border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <h1 className="text-2xl mb-6">Project Details</h1>
                    <div className={layout.formSectionCol2}>
                        <div className="form-group">
                            <label>Date</label>
                            <input
                                {...register("date", {required: "Date is required."})}
                                type='date'
                                className="w-full text-black rounded-lg cursor-pointer border border-gray-300 px-3 py-3"
                            required/>
                            {errors.date && <p className="text-amber-600 text-sm">{errors.date?.message}</p>}
                        </div>

                        <div className="form-group">
                            <label>Project Code</label>
                            <select
                                {...register("project")}
                                onChange={onProjectChange}
                                className={forms.select.fullLarge}
                            >
                                <option value="">Select project...</option>
                                {useMemo(() => projects.map((project: ProjectProfileResponse) => (
                                    <option key={project.project_code} value={project.project_code}>
                                        {formatProjectNumber()}{project.project_code} | {project.project_name}
                                    </option>
                                )), [projects])}
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label>Project Name</label>
                            <input 
                                {...register("project_name")}
                                className={tables.text}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>BOQ Description</label>
                            <textarea 
                                {...register("boq_description")}
                                className='w-[80%] border border-[#75563a71] rounded-xl mb-2 p-3'
                                placeholder="Provide a comprehensive description of the scope of work, materials, and project objectives..."
                            />
                        </div>
                    </div>
                </div>
                
                
                {/*<!-- BOQ Items Section -->*/}
                <div className="totals-section border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <h1 className="text-2xl mb-6">Bill of Quantities Items</h1>

                    {fields.map((field, index) => (
                        <div key={field.id}>

                            <div className="item-header">
                                <div className="item-number">Item {index + 1}</div>
                                <button
                                    type='button'
                                    title='Remove Item'
                                    className="remove-item border rounded-2xl shadow-sm"
                                    onClick={() => remove(index)}
                                    >
                                        Remove
                                    </button>
                            </div>

                            <div className={layout.formSectionCol3}>
                                <div className="form-group">
                                    <label>Product Item</label>
                                    <select
                                        {...register(`boq.${index}.product_item`)}
                                        className={forms.select.fullLarge}
                                    >
                                        <option value="">Select item...</option>
                                        {productItem}
                                        
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Additional Item</label>
                                    <input 
                                        type='text'
                                        className={tables.text}
                                        {...register(`boq.${index}.additional_item`)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Unit Of Measurement</label>
                                    <input 
                                        type='text'
                                        className={tables.text}
                                        {...register(`boq.${index}.unit_of_measurement`)}
                                        placeholder=" e.g., m², pcs, lot..."
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input 
                                        {...register(`boq.${index}.quantity`)}
                                        className={forms.select.partial}
                                        type="number"
                                        title="enter budget..."
                                        placeholder="0.00"
                                        step="0.01" min="0.00" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                            }
                                        }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Rate Per Unit</label>
                                    <input 
                                        {...register(`boq.${index}.rate_per_unit`)}
                                        className={forms.select.partial}
                                        type="number"
                                        title="enter budget..."
                                        placeholder="0.00"
                                        step="0.01" min="0.00" onBlur={(e) => {
                                            if (e.target.value) {
                                                e.target.value = parseFloat(e.target.value).toFixed(2);
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="form-grid mt-[20px]">
                                <div className="form-group">
                                    <label>Estimated Amount</label>
                                    <p className="helper-text">Auto-calculated</p><br/>
                                    {decimalPlaces(
                                        (Number(watch(`boq.${index}.quantity`) || 0.00)) *
                                        (Number(watch(`boq.${index}.rate_per_unit`) || 0.00))
                                    )}
                                </div>
                            </div>

                            <button 
                                className="add-item-btn"
                                type='button'
                                onClick={() => append({
                                    product_item: '',
                                    additional_item: '',
                                    unit_of_measurement: '',
                                    quantity: 0.00,
                                    rate_per_unit: 0.00
                                })}
                            >
                                ++ Add New Item
                            </button>
                        </div>
                    ))}
                </div>

                {/*<!-- Totals Section -->*/}
                
                <div className="totals-section border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <div>
                        <h1 className="text-2xl mb-6">Contingency</h1>
                    <div className="form-grid mb-[30px]">
                        <div className="form-group">
                            <label>Contingency Rate (%)</label>
                            <input 
                                {...register('contingency_rate')}
                                className={forms.select.partialLarge}
                                type='number'
                                name="contingency_rate"
                                title="enter rate..."
                                placeholder="0.00"
                                step="0.01" min="0.00" onBlur={(e) => {
                                    if (e.target.value) {
                                        e.target.value = parseFloat(e.target.value).toFixed(2);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        className={buttons.primary}
                        type='submit'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span className="flex  items-center gap-2">
                                <div className={utils.spinner}></div>
                                Generating BOQ 
                            </span>
                        ) : (
                            'Generate BOQ'
                        )}
                    </button>
                </div>
            </form>
        );

    };
    export default BillOfQuantitiesForm;
