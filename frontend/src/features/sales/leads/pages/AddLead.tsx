
import LeadForm from "../components/LeadForm";

function AddLead(){
    return(
        <div className="max-w-6xl mx-auto mt-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Add New Lead</h1>
                <p className="text-sm text-gray-500 mt-1">Enter the details below to add a new lead.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                <LeadForm/>

                
            </div>
        </div>
    )
}

export default AddLead;