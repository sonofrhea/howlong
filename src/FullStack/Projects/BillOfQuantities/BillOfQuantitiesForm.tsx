import React, { useMemo } from 'react';
import '../constants/BOQ.css';
import { useFieldArray, useForm } from "react-hook-form";
import { BillOfQuantitiesInputs } from '../constants/Types';








const BillOfQuantitiesForm: React.FC<any> = ({ onSubmit, isSubmitting, onCancel, 
    agents, projects, products }) => {

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
        









        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="wrap">
                    <header>
                        <div>
                            <h1>Bill of Quantities — {}</h1>
                        </div>
                    </header>
                </div>
            </form>
        );

    };
    export default BillOfQuantitiesForm;
