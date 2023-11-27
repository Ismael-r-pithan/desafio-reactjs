import * as yup from "yup";

export const createTaskValidator = yup.object({
    title: yup.string().required('Informe o título da tarefa'),
    description: yup.string().required('Informe uma descrição'),
    status: yup.string().required('Informe o status da tarefa'),
    tagIds: yup.array().of(yup.number()).min(1, 'Selecione pelo menos uma tag').required(),
  });
