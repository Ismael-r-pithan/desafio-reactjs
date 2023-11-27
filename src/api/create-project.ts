import { CreateProjectProps } from "@/ui/sidebar.component";
import httpClient from "@/lib/http-client";

export async function handleCreateProject({ name, description }: CreateProjectProps) {
    try {
        await httpClient.post("/projects", { name, description });
    } catch (error) {
       throw error;
    } 
}