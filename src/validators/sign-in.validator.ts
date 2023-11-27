import * as yup from "yup";

export const signInValidator = yup.object({
    email: yup.string().required('Informe o e-mail').email('E-mail inválido'),
    password: yup.string().required('Informe a senha'),
});
