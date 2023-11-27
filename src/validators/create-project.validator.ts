import * as yup from "yup";

export const createProjectValidator = yup.object({
    name: yup.string().required('Informe o nome do projeto'),
    description: yup.string().required('Informe uma descrição'),
});
