export const getStatusAction = (status?: string) => {
  switch (status) {
    case "open":
      return {
        label: "Open",
        bgColor: "bg-emerald-100",
        textColor: "text-emerald-800",
        borderColor: "border-emerald-200",
        dotColor: "bg-emerald-500"
      };
    case "in_progress":
      return {
        label: "In Progress",
        bgColor: "bg-amber-100",
        textColor: "text-amber-800",
        borderColor: "border-amber-200",
        dotColor: "bg-amber-500"
      };
    case "resolved":
      return {
        label: "Resolved",
        bgColor: "bg-blue-100",
        textColor: "text-blue-800",
        borderColor: "border-blue-200",
        dotColor: "bg-blue-500"
      };
    case "closed":
      return {
        label: "Closed",
        bgColor: "bg-gray-100",
        textColor: "text-gray-600",
        borderColor: "border-gray-200",
        dotColor: "bg-gray-400"
      };
    default:
      return {
        label: "Unknown",
        bgColor: "bg-slate-100",
        textColor: "text-slate-600",
        borderColor: "border-slate-200",
        dotColor: "bg-slate-400"
      };
  }
};

export const getTicketType = (type: string) => {
  switch (type) {
    case "feature_request":
      return "Feature Request";
    case "bug_report":
      return "Bug Report";
    case "general_inquiry":
      return "General Inquiry";
    case "billing":
      return "Billing";
    default:
      return "Other";
  }
}