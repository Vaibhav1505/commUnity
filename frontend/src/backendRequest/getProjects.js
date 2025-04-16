import axiosInstance from "../helpers/axiosInstance";

export default async function getProjects(baseURL) {
    try {
        const response = await axiosInstance.get(baseURL);

        if (response.data.success) {
            if (response.data.projects && response.data.projects.length === 0) {
                console.log("No projects found.");
                return [];
            }
            const adjustedData = response.data.projects.map((project) => ({
                id: project.projectId,
                title: project.title,
                company: project.company,
                assignedTo:project.assignedTo,
                completion: parseInt(project.completion) || 0,
                status: project.status === "Ongoing" ? "In Progress" : project.status,
                budget: project.budget || 0,
                startDate: new Date(project.startDate),
                endDate: new Date(project.endDate),
            }));
            return adjustedData;
        } else {
            console.error("Error fetching projects:", response.data.message);
            return [];
        }
    } catch (error) {
        console.error("Error in getProjects:", error.message);
        return [];
    }
}
