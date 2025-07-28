'use client';
import React, { useState, useEffect } from "react";
import { useCreateWorkPlan, useGetWorkPlansByStrDate, WorkPlan } from "@/hook/managers/use-work-plan-manager";
import {useLines} from "@/hook/managers/use-line-manager";
import {useGetPlatformInService} from "@/hook/managers/use-platform-manager";

interface WorkPlanItem {
  id?: string;
  platform_id?: string;
  line_id?: string;
  planned_hours?: number;
  target_oee?: number;
  uph_i?: number;
  start_hour?: number;
  end_hour?: number;
  str_date?: string;
  week?: number;
  head_count?: number;
  ft?: number;
  ict?: number;
}

const emptyWorkPlan: WorkPlanItem = {
  platform_id: "",
  line_id: "",
  planned_hours: 0,
  target_oee: 0,
  uph_i: 0,
  start_hour: 0,
  end_hour: 0,
  str_date: "",
  week: 0,
  head_count: 0,
  ft: 0,
  ict: 0,
};

const fields: { name: keyof WorkPlanItem; label: string; type?: string }[] = [
  { name: "platform_id", label: "Platform" },
  { name: "line_id", label: "Line" },
  { name: "planned_hours", label: "Planned Hours" },
  { name: "target_oee", label: "Target OEE" },
  { name: "uph_i", label: "UPH" },
  { name: "start_hour", label: "Start Hour" },
  { name: "end_hour", label: "End Hour" },
  { name: "week", label: "Week" },
  { name: "head_count", label: "Head Count" },
  { name: "ft", label: "FT" },
  { name: "ict", label: "ICT" },
];

// Updated display fields to show nested data
const displayFields = [
  { key: "platform", label: "Platform", render: (plan: WorkPlan) => `${plan.platform.platform} (${plan.platform.sku})` },
  { key: "line", label: "Line", render: (plan: WorkPlan) => `${plan.line.name} - ${plan.line.factory.name}` },
  { key: "planned_hours", label: "Planned Hours", render: (plan: WorkPlan) => plan.planned_hours },
  { key: "target_oee", label: "Target OEE", render: (plan: WorkPlan) => plan.target_oee },
  { key: "uph_i", label: "UPH Input", render: (plan: WorkPlan) => plan.uph_i },
  { key: "platform_uph", label: "Platform UPH", render: (plan: WorkPlan) => plan.platform.uph },
  { key: "start_hour", label: "Start Hour", render: (plan: WorkPlan) => plan.start_hour },
  { key: "end_hour", label: "End Hour", render: (plan: WorkPlan) => plan.end_hour },
  { key: "week", label: "Week", render: (plan: WorkPlan) => plan.week },
  { key: "head_count", label: "Head Count", render: (plan: WorkPlan) => plan.head_count },
  { key: "ft", label: "FT", render: (plan: WorkPlan) => plan.ft },
  { key: "ict", label: "ICT", render: (plan: WorkPlan) => plan.ict },
  { key: "cost", label: "Platform Cost", render: (plan: WorkPlan) => `$${plan.platform.cost}` },
  { key: "in_service", label: "In Service", render: (plan: WorkPlan) => plan.platform.in_service ? "Yes" : "No" },
  { key: "created_at", label: "Created", render: (plan: WorkPlan) => new Date(plan.created_at).toLocaleDateString() },
];

const WorkPlanManager = () => {
  const [strDate, setStrDate] = useState("");
  const [newPlan, setNewPlan] = useState<WorkPlanItem>(emptyWorkPlan);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<WorkPlanItem | null>(null);
  const [validationError, setValidationError] = useState<string>("");

  const { loading: lineLoading, error: lineError, factories } = useLines();
  const { loading, error, data, getWorkPlans } = useGetWorkPlansByStrDate();
  const { loading: createLoading, error: createError, createWorkPlan } = useCreateWorkPlan();

  // Platform dropdown data
  const { items: platforms, loading: platformLoading, error: platformError } = useGetPlatformInService();

  useEffect(() => {
    if (strDate) {
      getWorkPlans(strDate);
    }
  }, [strDate]);

  const workPlans: WorkPlan[] = Array.isArray(data) ? data : [];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStrDate(e.target.value);
  };

  const handleNewPlanChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({
      ...prev,
      [name]: value === "" ? "" : fields.find(f => f.name === name)?.type === "number" ? Number(value) : value,
    }));
  };

  // Validate all fields required
  const validate = () => {
    for (const field of fields) {
      if (
        // Allow 0 values, but not empty string, undefined or null
        newPlan[field.name] === "" ||
        newPlan[field.name] === undefined ||
        newPlan[field.name] === null
      ) {
        setValidationError(`Field "${field.label}" is required.`);
        return false;
      }
    }
    if (!strDate) {
      setValidationError("Date is required.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    
    const success = await createWorkPlan({ ...newPlan, str_date: strDate });
    
    if (success) {
      setNewPlan(emptyWorkPlan); // Only clear on successful API response
      getWorkPlans(strDate); // Refresh the work plans
    }
  };

  return (
    <div className="max-w-full mx-auto py-10 px-4">
      <h2 className="text-xl font-bold mb-4">Work Plans - Manager</h2>
      
      {/* Date Selection */}
      <div className="mb-4 flex gap-2 items-center">
        <label className="font-semibold">Select Date: </label>
        <input
          type="date"
          value={strDate}
          onChange={handleDateChange}
          className="border px-2 py-1 rounded"
        />
        <button onClick={() => getWorkPlans(strDate)} className="bg-blue-500 text-white px-3 py-1 rounded">
          Show Work Plans
        </button>
      </div>

      {/* Add Work Plan Form */}
      <div className="border rounded p-3 mb-6 flex flex-col gap-2 bg-gray-50">
        <span className="font-semibold mb-2">Add Work Plan for {strDate || "..."}</span>
        <div className="flex flex-wrap gap-2">
          {fields.map(f => (
            <div key={f.name} className="flex flex-col text-xs w-32">
              <label className="mb-1">{f.label}</label>
              {/* Platform select */}
              {f.name === "platform_id" ? (
                <select
                  name="platform_id"
                  value={newPlan.platform_id ?? ""}
                  className="border rounded px-1"
                  disabled={platformLoading || !platforms?.length}
                  onChange={handleNewPlanChange}
                >
                  <option value="">Select platform...</option>
                  {platforms && platforms.map(platform => (
                    <option key={platform.id} value={platform.id}>
                      {platform.platform} ({platform.sku})
                    </option>
                  ))}
                </select>
              ) :
              f.name === "line_id" ? (
                <select
                  name="line_id"
                  value={newPlan.line_id ?? ""}
                  className="border rounded px-1"
                  disabled={lineLoading || !factories?.length}
                  onChange={handleNewPlanChange}
                >
                  <option value="">Select line...</option>
                  {factories && factories.map(factory => (
                    <optgroup key={factory.id} label={factory.name}>
                      {factory.lines.map(line => (
                        <option key={line.id} value={line.id}>
                          {line.name} {line.is_active ? "" : "(inactive)"}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              ) : (
                <input
                  name={f.name}
                  value={newPlan[f.name] ?? ""}
                  type={f.type ?? "text"}
                  className="border px-1 rounded"
                  onChange={handleNewPlanChange}
                  min={f.type === "number" ? 0 : undefined}
                />
              )}
            </div>
          ))}
          <button
            onClick={handleAdd}
            className="px-3 py-1 rounded text-white bg-green-600 self-end"
            disabled={createLoading}
          >
            {createLoading ? "Saving..." : "Add"}
          </button>
        </div>
        {validationError && <div className="text-red-500">{validationError}</div>}
        {createError && <div className="text-red-500">{createError}</div>}
        {lineError && <div className="text-red-500">{lineError}</div>}
        {platformError && <div className="text-red-500">{platformError}</div>}
      </div>

      {/* Loading State */}
      {loading && <div className="text-center py-4">Loading work plans...</div>}
      
      {/* Error State */}
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      {/* Work Plans Summary */}
      {workPlans.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
          <h3 className="font-semibold text-blue-800">Summary for {strDate}</h3>
          <p className="text-blue-700">Total Work Plans: {workPlans.length}</p>
          <p className="text-blue-700">
            Total Planned Hours: {workPlans.reduce((sum, plan) => sum + plan.planned_hours, 0)}
          </p>
        </div>
      )}

      {/* Work Plans Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs border">
          <thead>
            <tr>
              {displayFields.map(field => (
                <th key={field.key} className="border px-2 py-1 bg-gray-100 text-left whitespace-nowrap">
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workPlans.map((plan, index) => (
              <tr key={plan.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                {displayFields.map(field => (
                  <td key={field.key} className="border px-2 py-1 whitespace-nowrap">
                    {field.render(plan)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No Data State */}
      {!loading && workPlans.length === 0 && strDate && (
        <div className="text-center py-8 text-gray-500">
          No work plans found for {strDate}
        </div>
      )}
    </div>
  );
};

export default WorkPlanManager;