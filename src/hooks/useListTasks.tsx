import { useEffect, useState } from "react";

import httpClient from "@/lib/http-client";
import { ListTasksDto } from "@/dtos/list-task.dto";


const INITIAL_PAGE = 1;

export function useListTasks(projectId: number) {
    const [listTasks, setTasks] = useState<ListTasksDto>({} as ListTasksDto);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [totalPages, setTotalPages] = useState(0);

    function handlePage(numPage: number) {
        setPage(numPage);
    }

    useEffect(() => {
        async function listTasks() {
            try {
                const { data } = await httpClient.get(`/projects/${projectId}/tasks`);
                const response = data as ListTasksDto;
                setTasks(response);
                setTotalPages(response.totalPages);
            } catch (error) {
                throw error;
            }
        }
        listTasks();
    }, [page, projectId]);

    return { listTasks, handlePage, totalPages }
}