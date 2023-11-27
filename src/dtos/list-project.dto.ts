export class ProjectDto {
  id!: number;
  name!: string;
  description!: string;
}

export class ListProjectDto {
  projects!: ProjectDto[];
  page!: number;
  limit!: number;
  totalPages!: number;
  totalItems!: number;
}
