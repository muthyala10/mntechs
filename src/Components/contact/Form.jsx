import React from "react";
import { Paperclip } from "lucide-react";
import useForm from "../../Hooks/useForm" // adjust the path as needed

const Form = () => {
  const {
    formData,
    handleChange,
  } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
    ProductDesign: "",
    file: null,
    ProjectBudget: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
  };

  const inputClass =
    "w-full px-4 py-3 border-b border-gray-300 rounded-lg focus:outline-none text-black placeholder-gray-400";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto">
      {/* Name Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {["firstName", "lastName"].map((field) => (
          <div key={field}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              {field === "firstName" ? "First Name" : "Last Name"}
            </label>
            <input
              type="text"
              name={field}
              placeholder={field === "firstName" ? "Joe" : "Smith"}
              value={formData[field]}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Email and Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john@domain.com"
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Company & Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {["company", "role"].map((field) => (
          <div key={field}>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              {field === "company" ? "Company" : "Role"}
            </label>
            <input
              type="text"
              name={field}
              placeholder={`Your ${field === "company" ? "Company Name" : "Role"}`}
              value={formData[field]}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Product Design */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Product Design
        </label>
        <input
          type="text"
          name="ProductDesign"
          placeholder="e.g., Web Design"
          value={formData.ProductDesign}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Project Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Project Description
        </label>
        <textarea
          name="message"
          placeholder="Your message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className={`${inputClass} resize-none bg-transparent`}
        />
      </div>

      {/* File Upload */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <label
          htmlFor="file"
          className="flex items-center cursor-pointer text-sm text-gray-600 hover:text-black"
        >
          <Paperclip className="w-5 h-5 mr-2" />
          Attach your file
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={handleChange}
          className="hidden"
        />
        {formData.file && (
          <span className="text-xs text-gray-500">{formData.file.name}</span>
        )}
      </div>

      {/* Project Budget */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          Project Budget
        </label>
        <input
          type="number"
          name="ProjectBudget"
          placeholder="Enter your budget"
          value={formData.ProjectBudget}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-white text-black font-semibold py-3 px-6 rounded-full mt-6 border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition-all duration-300"
      >
        Submit Now
      </button>
    </form>
  );
};

export default Form;
