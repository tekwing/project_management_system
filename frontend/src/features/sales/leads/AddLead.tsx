import React from "react";
import { useState } from "react";
import InputComponent from "../../../components/common/InputComponent";
import DropdownComponent from "../../../components/common/DropdownComponent";
import { Save, X } from "lucide-react";



function AddLead(){
    const leadStatusDropdown = [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Qualified", value: "qualified" },
        { label: "Lost", value: "lost" },
        { label: "Won", value: "won" },
    ];

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
    const[formData, setFormData] = useState({
        name: "",
        email:"",
        phone:"",
        company_name:"",
        job_title:"",
        status:"",
        source:"",
        assignee:"",
    });
 
    return(
        <div className="max-w-6xl mx-auto mt-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add New Lead</h1>
                <p className="text-sm text-gray-500 mt-1">Enter the details below to add a new lead.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                    <div className="flex flex-col">
                        <InputComponent
                        label="Full Name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputComponent
                        label="Email Address"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputComponent
                        label="Phone Number"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputComponent
                        label="Company Name"
                        placeholder=""
                        value={formData.company_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, company_name: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <InputComponent
                        label="Job Title"
                        placeholder=""
                        value={formData.job_title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, job_title: e.target.value })}
                        />
                    </div>
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Lead Status"
                            required
                            placeholder="Select Status"
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value,
                                })
                            }
                            options={leadStatusDropdown}
                        />
                    </div>
                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Lead Source"
                            required
                            placeholder="Select source"
                            value={formData.source}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    source: e.target.value,
                                })
                            }
                            options={leadSourceDropdown}
                        />
                    </div>

                    <div className="flex flex-col">
                        <DropdownComponent
                            label="Assigne To"
                            required
                            placeholder="Select Assignee"
                            value={formData.assignee}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    assignee: e.target.value,
                                })
                            }
                            options={assignToDropdown}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end px-4 py-4 gap-3 border-t border-gray-200 bg-gray-50">
                    <button className="bg-white rounded-md border border-gray-300 text-gray-700 py-2 px-4 text-sm font-medium gap-2 inline-flex items-center hover:bg-gray-50 focus:ring-2 focus:bg-gray-200"><X size={16} />Cancel</button>
                    <button className="inline-flex items-center gap-2 font-medium text-white text-sm bg-indigo-600 border-transparent  rounded-lg px-4 py-2 hover:bg-indigo-700 focus:ring-2 focus:bg-indigo-500 shadow-sm "><Save size={16} />Save</button>
                </div>
            </div>
        </div>
    )
}

export default AddLead;