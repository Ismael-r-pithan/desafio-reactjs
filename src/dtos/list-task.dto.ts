export class TaskDto {
    id!: number;
    title!: string;
    description!: string;
    status!: string;
    tags!: string[];
  }
  
  export class ListTasksDto {
    tasks!: TaskDto[];
    page!: number;
    limit!: number;
    totalPages!: number;
    totalItems!: number;
  }
  