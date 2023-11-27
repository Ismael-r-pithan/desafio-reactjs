
import { CreateTaskProps } from "@/app/projects/[id]/page";
import httpClient from "@/lib/http-client";

export async function handleCreateTask(projectId: number, { title, description, status, tagIds }: CreateTaskProps) {
    try {
        await httpClient.post(`/projects/${projectId}/tasks`, { title, description, status, tagIds });
    } catch (error) {
       throw error;
    } 
}