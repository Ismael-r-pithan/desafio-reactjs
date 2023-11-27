export class TagsDto {
    id!: number;
    title!: string;
  }
  
  export class ListTagsDto {
    tags!: TagsDto[];
    page!: number;
    limit!: number;
    totalPages!: number;
    totalItems!: number;
  }
  