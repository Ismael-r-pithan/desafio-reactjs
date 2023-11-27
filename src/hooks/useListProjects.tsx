import { useEffect, useState } from "react";

import { ListProjectDto } from "@/dtos/list-project.dto";
import httpClient from "@/lib/http-client";


const INITIAL_PAGE = 1;

export function useListProjects() {
    const [listProjects, setProjects] = useState<ListProjectDto>({} as ListProjectDto);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [totalPages, setTotalPages] = useState(0);

    function handlePage(numPage: number) {
        setPage(numPage);
    }

    useEffect(() => {
        async function listProjects() {
            try {
                const { data } = await httpClient.get('/projects');
                const response = data as ListProjectDto;
                setProjects(response);
                setTotalPages(response.totalPages);
            } catch (error) {
                throw error;
            }
        }
        listProjects();
    }, [page]);

    return { listProjects, handlePage, totalPages }
}