import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// Sample departments data
const departmentsData = [
    {
        id: 1,
        name: "customer_service",
        level: 0,
        subDepartments: [
            { id: 2, name: "support", level: 1 },
            { id: 3, name: "customer_access", level: 1 },
        ],
    },
    {
        id: 4,
        name: "design",
        level: 0,
        subDepartments: [
            { id: 5, name: "graphic_design", level: 1 },
            { id: 6, name: "product_design", level: 1 },
            { id: 7, name: "web_design", level: 1 },
        ],
    },
];
const DepartmentList = () => {
    const [selected, setSelected] = useState([]);
    const [expanded, setExpanded] = useState([]);
    // Helper function to check if a department or sub-department is selected
    const isItemSelected = (id) => selected.includes(id);
    // Helper function to toggle expanded state for a department
    const toggleExpanded = (id) => {
        if (expanded.includes(id)) {
            setExpanded((prevExpanded) => prevExpanded.filter((item) => item !== id));
        }
        else {
            setExpanded((prevExpanded) => [...prevExpanded, id]);
        }
    };
    // Helper function to check if all sub-departments of a department are selected
    const areAllSubDepartmentsSelected = (department) => department.subDepartments?.every((subDepartment) => selected.includes(subDepartment.id));
    const handleCheckboxChange = (event, department) => {
        // If the department checkbox is checked, select the department and its sub-departments
        if (event.target.checked) {
            setSelected((prevSelected) => {
                const newSelected = [...prevSelected, department.id];
                department.subDepartments?.forEach((subDepartment) => {
                    if (!newSelected.includes(subDepartment.id)) {
                        newSelected.push(subDepartment.id);
                    }
                });
                // Check if all sub-departments are selected, then select the parent department as well
                const allSubDepartmentsSelected = department.subDepartments?.every((subDepartment) => newSelected.includes(subDepartment.id));
                // Check if the current department is not already in the selected array and all sub-departments are selected
                if (allSubDepartmentsSelected && !newSelected.includes(department.id)) {
                    newSelected.push(department.id);
                }
                return newSelected;
            });
        }
        else {
            // If the department checkbox is unchecked, deselect the department and its sub-departments
            setSelected((prevSelected) => prevSelected.filter((id) => id !== department.id &&
                !department.subDepartments?.some((subDep) => subDep.id === id)));
            // Check if all sub-departments are deselected, then deselect the parent department as well
            const allSubDepartmentsDeselected = department.subDepartments?.every((subDepartment) => selected.includes(subDepartment.id)) ?? true;
            if (allSubDepartmentsDeselected && selected.includes(department.id)) {
                setSelected((prevSelected) => prevSelected.filter((id) => id !== department.id));
            }
        }
    };
    // Helper function to toggle expanded state for a department
    const handleToggle = (department) => {
        // Toggle expanded state when clicking on the arrow
        toggleExpanded(department.id);
        // Check if all sub-departments are selected, then select the parent department as well
        if (areAllSubDepartmentsSelected(department)) {
            setSelected((prevSelected) => {
                if (!prevSelected.includes(department.id)) {
                    return [...prevSelected, department.id];
                }
                return prevSelected;
            });
        }
        else {
            // If all sub-departments are not selected, deselect the parent department if it was selected
            setSelected((prevSelected) => prevSelected.filter((id) => id !== department.id));
        }
    };
    const renderDepartments = (departments) => {
        return departments.map((department) => (_jsxs(Box, { ml: department.level * 2, children: [_jsx(Box, { onClick: () => handleToggle(department), style: { cursor: "pointer" }, children: department.subDepartments && (_jsx(_Fragment, { children: expanded.includes(department.id) ? (_jsx(ExpandMoreIcon, {})) : (_jsx(ChevronRightIcon, {})) })) }), _jsx(Checkbox, { checked: isItemSelected(department.id), onChange: (event) => handleCheckboxChange(event, department) }), _jsx("span", { children: department.name }), expanded.includes(department.id) &&
                    department.subDepartments &&
                    renderDepartments(department.subDepartments)] }, department.id)));
    };
    return (_jsxs(Box, { children: [_jsx(Typography, { variant: "h5", fontWeight: 'bolder', gutterBottom: true, children: "Department List" }), renderDepartments(departmentsData)] }));
};
export default DepartmentList;
