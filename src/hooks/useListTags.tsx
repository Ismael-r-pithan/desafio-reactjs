import { useEffect, useState } from "react";

import httpClient from "@/lib/http-client";
import { ListTagsDto } from "@/dtos/list-tags.dto";


const INITIAL_PAGE = 1;

export function useListTags() {
    const [listTags, setListTags] = useState<ListTagsDto>({} as ListTagsDto);
    const [page, setPage] = useState(INITIAL_PAGE);
    const [totalPages, setTotalPages] = useState(0);

    function handlePage(numPage: number) {
        setPage(numPage);
    }

    useEffect(() => {
        async function listTags() {
            try {
                const { data } = await httpClient.get(`/tags`);
                const response = data as ListTagsDto;
                setListTags(response);
                setTotalPages(response.totalPages);
            } catch (error) {
                throw error;
            }
        }
        listTags();
    }, [page]);

    return { listTags, handlePage, totalPages }
}