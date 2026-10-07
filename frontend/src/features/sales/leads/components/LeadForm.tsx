import InputComponent from "../../../../components/common/InputComponent";
import DropdownComponent from "../../../../components/common/DropdownComponent";
import { toast } from 'sonner';
import { Save, X } from "lucide-react";

import { useForm, Controller  } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useCreateLead } from '../hooks/useCreateLead';
import type { CreateLeadPayload } from '../types/lead.types';
import { useLeadStatus } from '../hooks/useLeadStatus';

const leadSchema = zod.object({
    name: zod.string().min(1, 'Lead name is required.'),
    email: zod.email('Invalid email address.').optional().or(zod.string().max(0)),
    company_name: zod.string().optional(),
    job_title: zod.string().optional(),
    phone: zod.string().optional(),
    status_id: zod.string().optional(),
    source: zod.string().optional(),
    assignee: zod.string().optional(),
});

function LeadForm(){
    const { data: leadStatuses = [], isLoading: isLoadingStatuses } = useLeadStatus();

    const leadStatusDropdown = leadStatuses.map((status) => ({
        label: status.name,
        value: String(status.id),
    }));

    const leadSourceDropdown = [
        { label: "Website", value: "website" },
        { label: "Referral", value: "referral" },
        { label: "Campaign", value: "campaign" },
        { label: "Social Media", value: "social_media" },
        { label: "Cold Call", value: "cold_call" },
    ];

    const assignToDropdown = [
        { label: "Sales Rep 1", value: "sales_rep_1" },
        { label: "Sales Rep 2", value: "sales_rep_2" },
        { label: "Sales Rep 3", value: "sales_rep_3" },
        { label: "Sales Manager", value: "sales_manager" },
    ];

    const { mutate, isPending } = useCreateLead();
    
    const { control, handleSubmit, formState: { errors }, reset } = useForm<CreateLeadPayload>({
        resolver: zodResolver(leadSchema),
        defaultValues: { // 👈 2. Set default values directly inside useForm
            name: "",
            email: "",
            phone: "",
            company: "",
            job_title: "",
            status_id: "",
            source: "",
            assignee: "",
        }
    });

    const onSubmit = (data: CreateLeadPayload) => {
        // console.log("FORM DATA:", data);

        const toastId = toast.loading('Creating lead...');
        mutate(data, {
            onSuccess: () => {
                // 💡 3. Update the existing toast instantly to a beautiful green Success message!
                toast.success('Lead created successfully.', {
                    id: toastId,
                    description: `${data.name} has been added successfully.`
                });
                reset();
            },
            onError: (error: any) => {
                // 💡 4. Update the toast to a beautiful red Error notice if validation fails
                toast.error('Failed to create lead.', {
                    id: toastId,
                    description: error.response?.data?.message || 'Please try again.'
                });
            }
        });
    };
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                
                {/* 📝 FULL NAME INPUT */}
                <div className="flex flex-col">
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <InputComponent
                                label="Full Name"
                                placeholder="John Doe"
                                value={field.value || ''}
                                onChange={field.onChange} // 👈 Passes typing values to validation automatically
                            />
                        )}
                    />
                    {errors.name && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.name.message as string}</p>}
                </div>

                {/* 📝 EMAIL ADDRESS INPUT */}
                <div className="flex flex-col">
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <InputComponent
                                label="Email Address"
                                placeholder="john@example.com"
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    {errors.email && <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.email.message as string}</p>}
                </div>

                {/* 📝 PHONE NUMBER INPUT */}
                <div className="flex flex-col">
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <InputComponent
                                label="Phone Number"
                                placeholder="+1 (555) 000-0000"
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>

                {/* 📝 COMPANY NAME INPUT */}
                <div className="flex flex-col">
                    <Controller
                        name="company"
                        control={control}
                        render={({ field }) => (
                            <InputComponent
                                label="Company Name"
                                placeholder=""
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>

                {/* 📝 JOB TITLE INPUT */}
                <div className="flex flex-col">
                    <Controller
                        name="job_title"
                        control={control}
                        render={({ field }) => (
                            <InputComponent
                                label="Job Title"
                                placeholder=""
                                value={field.value || ''}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </div>

                {/* 📝 LEAD STATUS DROPDOWN */}
                <div className="flex flex-col">
                    <Controller
                        name="status_id"
                        control={control}
                        render={({ field }) => (
                            <DropdownComponent
                                label="Lead Status"
                                placeholder={
                                    isLoadingStatuses
                                        ? "Loading statuses..."
                                        : "Select Status"
                                }
                                value={field.value || ''}
                                onChange={field.onChange}
                                options={leadStatusDropdown}
                            />
                        )}
                    />
                </div>

                {/* 📝 LEAD SOURCE DROPDOWN */}
                <div className="flex flex-col">
                    <Controller
                        name="source"
                        control={control}
                        render={({ field }) => (
                            <DropdownComponent
                                label="Lead Source"
                                placeholder="Select source"
                                value={field.value || ''}
                                onChange={field.onChange}
                                options={leadSourceDropdown}
                            />
                        )}
                    />
                </div>

                {/* 📝 ASSIGNEE DROPDOWN */}
                <div className="flex flex-col">
                    <Controller
                        name="assignee"
                        control={control}
                        render={({ field }) => (
                            <DropdownComponent
                                label="Assign To"
                                placeholder="Select Assignee"
                                value={field.value || ''}
                                onChange={field.onChange}
                                options={assignToDropdown}
                            />
                        )}
                    />
                </div>

            </div>
            
            <div className="flex items-center justify-end px-4 py-4 gap-3 border-t border-gray-200 bg-gray-50">
                <button type="button" onClick={() => reset()} className="bg-white rounded-md border border-gray-300 text-gray-700 py-2 px-4 text-sm font-medium gap-2 inline-flex items-center hover:bg-gray-50"><X size={16} />Cancel</button>
                <button type="submit" disabled={isPending} className="inline-flex items-center gap-2 font-medium text-white text-sm bg-indigo-600 border-transparent rounded-lg px-4 py-2 hover:bg-indigo-700 shadow-sm"><Save size={16} />{isPending ? 'Saving Data...' : 'Save Lead'}</button>
            </div>
        </form>
    )
}

export default LeadForm;