import { useState } from "react";
import InputComponent from "../../../components/common/InputComponent";
import { Camera, Shield, User, Briefcase, MapPin, Save, X } from "lucide-react"; // Assuming you use lucide-react
import DropdownComponent from "../../../components/common/DropdownComponent";

type MemberFormData = {
  name: string;
  role: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  department: string;
  employeeId: string;
  profileImage: File | null;
  joiningDate: string;
  status: string;
  permissions: string;
};

function AddMember() {
  const [formData, setFormData] = useState<MemberFormData>({
    name: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    department: "",
    employeeId: "",
    profileImage: null,
    permissions: "",
    joiningDate: "",
    status: "",
  });

  const [permissions, setPermissions] = useState([
    { page: "Projects", view: false, create: false, update: false, delete: false },
    { page: "Task", view: false, create: false, update: false, delete: false }
  ]);

  const [preview, setPreview] = useState<string | null>(null);

  const handlePermissionChange = (index: number, field: string) => {
    setPermissions((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [field]: !item[field as keyof typeof item] } : item
      )
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profileImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const memberData = { ...formData, permissions };
    console.log(memberData);
  };

  // Dropdown data omitted for brevity in reading, keeping your original arrays
  const roleDropdown = [
    {label: "Project Manager", value: "project_manager" },
    {label: "Project Lead", value: "project_lead" },
    {label: "Team Lead", value: "team_lead" },
    {label: "Developer", value: "developer" },
    {label: "UI/UX Designer", value: "designer" },
  ];

  const departmentDropdown = [
    { label: "Design", value: "design" },
    { label: "Quality Assurance", value: "quality_assurance" },
    { label: "Project Management", value: "project_management" },
    { label: "Sales", value: "sales" },
    { label: "Engineering", value: "engineering" },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-6">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Member</h1>
        <p className="text-sm text-gray-500 mt-1">Create a new team member profile and assign their access permissions.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Profile Image Section */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center relative">
              {preview ? (
                <img src={preview} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <User size={40} className="text-gray-300" />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" size={24} />
              </div>
            </div>
            <input 
              type="file" 
              accept="image/*" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
            <p className="text-sm text-gray-500 mb-2">Upload a high-res image. JPG or PNG under 2MB.</p>
            <label className="inline-flex cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors">
              Browse Files
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Section: Basic Info */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              <User size={20} className="text-indigo-500" /> Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  label="Password"
                  placeholder="Set initial password"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section: Work Info */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              <Briefcase size={20} className="text-indigo-500" /> Work Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <InputComponent
                  label="Employee ID"
                  placeholder="EMP-001"
                  value={formData.employeeId}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, employeeId: e.target.value })}
                />
              </div>
              
              <div className="flex flex-col">
                <DropdownComponent
                    label="Department"
                    required
                    placeholder="Select Department"
                    value={formData.department}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            department: e.target.value,
                        })
                    }
                    options={departmentDropdown}
                />
              </div>

              <div className="flex flex-col">
                <DropdownComponent
                    label="Role"
                    required
                    placeholder="Select Role"
                    value={formData.role}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            role: e.target.value,
                        })
                    }
                    options={roleDropdown}
                />
              </div>
            </div>
          </div>

          {/* Section: Location */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              <MapPin size={20} className="text-indigo-500" /> Location Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <InputComponent
                  label="Street Address"
                  placeholder="123 Main St, Suite 100"
                  value={formData.address}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <InputComponent
                  label="City"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, city: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <InputComponent
                  label="State"
                  placeholder="Enter state"
                  value={formData.state}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, state: e.target.value })}
                />
              </div>
              <div className="flex flex-col">
                <InputComponent
                  label="Pincode/ZIP"
                  placeholder="Enter postal code"
                  value={formData.pincode}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, pincode: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section: Permissions */}
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-100">
              <Shield size={20} className="text-indigo-500" /> Access Permissions
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
                  <tr>
                    <th className="px-6 py-4">Module Name</th>
                    <th className="px-4 py-4 text-center">View</th>
                    <th className="px-4 py-4 text-center">Create</th>
                    <th className="px-4 py-4 text-center">Update</th>
                    <th className="px-4 py-4 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {permissions.map((item, index) => (
                    <tr key={item.page} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{item.page}</td>
                      {["view", "create", "update", "delete"].map((permission) => (
                        <td key={permission} className="px-4 py-4 text-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item[permission as keyof typeof item] as boolean}
                              onChange={() => handlePermissionChange(index, permission)}
                              className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                            />
                          </label>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-200">
            <X size={16} /> Cancel
          </button>
          <button 
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 shadow-sm"
          >
            <Save size={16} /> Save Member
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddMember;